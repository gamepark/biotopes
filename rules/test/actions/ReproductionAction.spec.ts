import { describe, expect, test } from 'vitest'
import { BiotopesRules, BiotopesSetup } from '../../src'
import { PlayerColor } from '../../src/PlayerColor'
import { MaterialType } from '../../src/material/MaterialType'
import { KnownSpeciesCardId, SpeciesCard, SpeciesDietType } from '../../src/material/SpeciesCard'
import { LocationType } from '../../src/material/LocationType'
import { BiotopeType } from '../../src/material/BiotopeType'
import { CreateItemsAtOnce, playAction } from '@gamepark/rules-api'
import { RuleId } from '../../src/rules/RuleId'
import { EcosystemActionType } from '../../src/material/EcosystemActionType'
import { BiotopesMove, isBiotopesCreateItemTypeAtOnce, isBiotopesStartPlayerTurn, isBiotopesStartRule } from '../../src/BiotopeTypes'
import { ChooseActionRule } from '../../src/rules/ChooseActionRule'
import { speciesCardCharacteristics } from '../../src/material/SpeciesCardCharacteristics'
import { DiscardCardToDrawCubeRule } from '../../src/rules/actions/common/DiscardCardToDrawCubeRule'
import { DrawForestCubeRule } from '../../src/rules/actions/common/DrawForestCubeRule'
import { BiotopesPendingEffect } from '../../src/material/effects/PendingEffect'
import { Memory } from '../../src/Memory'
import { SpeciesCardEffect } from '../../src/material/SpeciesCardEffect'

const setupGame = (cardWithCubes: { card: SpeciesCard; cubes: BiotopeType[] }[]) => {
  const setup = new BiotopesSetup()
  const game = setup.setup({ advancedBiotopes: false, players: [{ id: PlayerColor.Fox }, { id: PlayerColor.Owl }] })
  const cardsWithCubesAndIndex = cardWithCubes.map((cardWithCubes) => ({
    ...cardWithCubes,
    index: setup
      .material(MaterialType.SpeciesCard)
      .id<KnownSpeciesCardId>((id) => id.front === cardWithCubes.card)
      .getIndex()
  }))
  setup
    .material(MaterialType.SpeciesCard)
    .index(cardsWithCubesAndIndex.map(({ index }) => index))
    .moveItemsAtOnce({
      type: LocationType.PlayerSpeciesCardTableauSpot,
      player: PlayerColor.Fox
    })
  setup.material(MaterialType.Cube).createItemsAtOnce(
    cardsWithCubesAndIndex.flatMap(({ cubes, index }) =>
      cubes.map((cubeType) => ({
        id: cubeType,
        location: {
          type: LocationType.CubeSpotOnPlayerSpeciesCard,
          player: PlayerColor.Fox,
          parent: index
        }
      }))
    )
  )
  game.rule = {
    id: RuleId.ReproductionActionPlaceCube,
    player: PlayerColor.Fox
  }
  return { cardsWithCubesAndIndex, game, setup }
}

const setupGaeWithDeckCardOnTopOfType = (cardsWithCubes: { card: SpeciesCard; cubes: BiotopeType[] }[], deck: SpeciesDietType, biotopeType: BiotopeType) => {
  return setupGameWithDeckCardsOnTopOfType(cardsWithCubes, [{ deck: deck, biotopeTypes: [biotopeType] }])
}

const setupGameWithDeckCardsOnTopOfType = (
  cardsWithCubes: { card: SpeciesCard; cubes: BiotopeType[] }[],
  deckWithCardsOnTop: { deck: SpeciesDietType; biotopeTypes: BiotopeType[] }[]
) => {
  const { game, cardsWithCubesAndIndex, setup } = setupGame(cardsWithCubes)
  deckWithCardsOnTop.forEach(({ deck, biotopeTypes }) => {
    const lastDeckX = setup
      .material(MaterialType.SpeciesCard)
      .location(LocationType.SpeciesDecksSpot)
      .location((l) => l.y === deck)
      .maxBy((item) => item.location.x ?? 0)
      .getItem()!.location.x
    biotopeTypes.reverse().forEach((type) =>
      setup
        .material(MaterialType.SpeciesCard)
        .location(LocationType.SpeciesDecksSpot)
        .location((l) => l.y === deck)
        .id<KnownSpeciesCardId>((id) => speciesCardCharacteristics[id.front].biotope === type)
        .moveItem({
          type: LocationType.SpeciesDecksSpot,
          x: lastDeckX,
          y: deck
        })
    )
  })
  return { game, cardsWithCubesAndIndex }
}
describe('Reproduction tests', () => {
  test('Given a cube move to the correct spot, the game should create cubes and proceed to the ChooseAction rule for the next player', () => {
    // Given
    const cardWithCubes = [
      { card: SpeciesCard.TwotailedPasha, cubes: [BiotopeType.Forest, BiotopeType.Forest] },
      { card: SpeciesCard.EuropeanGoldfinch, cubes: [BiotopeType.Meadow, BiotopeType.Meadow] },
      { card: SpeciesCard.CitrilFinch, cubes: [BiotopeType.Mountain, BiotopeType.Mountain, BiotopeType.Forest] },
      { card: SpeciesCard.RosaliaLongicorn, cubes: [BiotopeType.Mountain] },
      { card: SpeciesCard.EurasianBeaver, cubes: [BiotopeType.Wetland, BiotopeType.Wetland, BiotopeType.Wetland, BiotopeType.Wetland] }
    ]
    const { game, cardsWithCubesAndIndex } = setupGame(cardWithCubes)
    const rules = new BiotopesRules(game)

    // When
    const action = playAction(
      rules,
      rules
        .material(MaterialType.Cube)
        .location(LocationType.CubeSpotOnPlayerSpeciesCard)
        .parent(cardsWithCubesAndIndex[0].index)
        .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, player: PlayerColor.Fox, id: EcosystemActionType.Reproduction }),
      PlayerColor.Fox
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).that.has.property('player').which.equals(PlayerColor.Owl)
    expect(action.consequences).to.have.length(3)
    expect(action.consequences[0]).to.satisfy((move: BiotopesMove) => isBiotopesStartRule(move) && move.id === RuleId.ReproductionActionCreateCubes)
    expect(action.consequences[2]).to.satisfy(
      (move: BiotopesMove) => isBiotopesStartPlayerTurn(move) && move.id === RuleId.ChooseAction && move.player === PlayerColor.Owl
    )
    expect(action.consequences[1]).to.satisfy((move: BiotopesMove) => isBiotopesCreateItemTypeAtOnce(MaterialType.Cube)(move))
    const createCubesMove = action.consequences[1] as CreateItemsAtOnce<PlayerColor, MaterialType, LocationType>
    expect(createCubesMove.items)
      .to.be.an('array')
      .that.have.deep.members([
        {
          id: BiotopeType.Meadow,
          location: { type: LocationType.CubeSpotOnPlayerSpeciesCard, parent: cardsWithCubesAndIndex[1].index, player: PlayerColor.Fox }
        },
        {
          id: BiotopeType.Mountain,
          location: { type: LocationType.CubeSpotOnPlayerSpeciesCard, parent: cardsWithCubesAndIndex[2].index, player: PlayerColor.Fox }
        }
      ])
    expect(rules.material(MaterialType.Cube).parent(cardsWithCubesAndIndex[0].index).getQuantity()).to.equal(1)
    expect(rules.material(MaterialType.Cube).parent(cardsWithCubesAndIndex[1].index).getQuantity()).to.equal(3)
    expect(rules.material(MaterialType.Cube).parent(cardsWithCubesAndIndex[2].index).getQuantity()).to.equal(4)
    expect(rules.material(MaterialType.Cube).parent(cardsWithCubesAndIndex[3].index).getQuantity()).to.equal(1)
    expect(rules.material(MaterialType.Cube).parent(cardsWithCubesAndIndex[4].index).getQuantity()).to.equal(4)
  })

  describe('One fecund species card tests', () => {
    test('Given a fecund species is present, the game should proceed to the DiscardCardToDrawCube rule', () => {
      //  Given
      const cardsWithCubes = [
        { card: SpeciesCard.WildBoar, cubes: [BiotopeType.Forest, BiotopeType.Forest] },
        { card: SpeciesCard.MuteSwan, cubes: [BiotopeType.Wetland, BiotopeType.Wetland, BiotopeType.Wetland] },
        { card: SpeciesCard.EuropeanHedgehog, cubes: [BiotopeType.Meadow] },
        { card: SpeciesCard.AlpineMarmot, cubes: [BiotopeType.Mountain, BiotopeType.Mountain] },
        { card: SpeciesCard.EuropeanCrestedTit, cubes: [BiotopeType.Forest, BiotopeType.Forest, BiotopeType.Forest, BiotopeType.Forest] }
      ]
      const { game, cardsWithCubesAndIndex } = setupGaeWithDeckCardOnTopOfType(cardsWithCubes, SpeciesDietType.Herbivore, BiotopeType.Forest)
      const rules = new BiotopesRules(game)

      // When
      const placeCubeAction = playAction(
        rules,
        rules
          .material(MaterialType.Cube)
          .parent(cardsWithCubesAndIndex[0].index)
          .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Reproduction, player: PlayerColor.Fox }),
        PlayerColor.Fox
      )

      // Then
      expect(placeCubeAction.consequences).to.be.an('array').that.has.length(1)
      expect(rules.rulesStep).to.be.instanceof(DiscardCardToDrawCubeRule).that.has.property('player').which.equals(PlayerColor.Fox)
    })

    test('Given one fecund species is present, and a forest card is discarded, the game should proceed to the DrawForestCube rule', () => {
      //  Given
      const cardsWithCubes = [
        { card: SpeciesCard.WildBoar, cubes: [BiotopeType.Forest, BiotopeType.Forest] },
        { card: SpeciesCard.MuteSwan, cubes: [BiotopeType.Wetland, BiotopeType.Wetland, BiotopeType.Wetland] },
        { card: SpeciesCard.EuropeanHedgehog, cubes: [BiotopeType.Meadow] },
        { card: SpeciesCard.AlpineMarmot, cubes: [BiotopeType.Mountain, BiotopeType.Mountain] },
        { card: SpeciesCard.EuropeanCrestedTit, cubes: [BiotopeType.Forest, BiotopeType.Forest, BiotopeType.Forest, BiotopeType.Forest] }
      ]
      const { game, cardsWithCubesAndIndex } = setupGaeWithDeckCardOnTopOfType(cardsWithCubes, SpeciesDietType.Herbivore, BiotopeType.Forest)
      const rules = new BiotopesRules(game)
      const placeCubeAction = playAction(
        rules,
        rules
          .material(MaterialType.Cube)
          .parent(cardsWithCubesAndIndex[0].index)
          .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Reproduction, player: PlayerColor.Fox }),
        PlayerColor.Fox
      )

      // When
      const discardCardAction = playAction(
        rules,
        rules
          .material(MaterialType.SpeciesCard)
          .location(LocationType.SpeciesDecksSpot)
          .location((l) => l.y === SpeciesDietType.Herbivore)
          .deck()
          .dealOne({ type: LocationType.SpeciesDiscardsSpot, y: SpeciesDietType.Herbivore }),
        PlayerColor.Fox
      )

      // Then
      expect(placeCubeAction.consequences).to.be.an('array').that.has.length(1)
      expect(discardCardAction.consequences).to.be.an('array').that.has.length(1)
      expect(rules.rulesStep).to.be.instanceof(DrawForestCubeRule).that.has.property('player').which.equals(PlayerColor.Fox)
    })

    test('Given one fecund species is present, and a forest card is discarded and a cube is placed on Wild board, the game should create relevant cubes and proceed to the ChooseActionRule for next player', () => {
      //  Given
      const cardsWithCubes = [
        { card: SpeciesCard.WildBoar, cubes: [BiotopeType.Forest, BiotopeType.Forest] },
        { card: SpeciesCard.MuteSwan, cubes: [BiotopeType.Wetland, BiotopeType.Wetland, BiotopeType.Wetland] },
        { card: SpeciesCard.EuropeanHedgehog, cubes: [BiotopeType.Meadow] },
        { card: SpeciesCard.AlpineMarmot, cubes: [BiotopeType.Mountain, BiotopeType.Mountain] },
        { card: SpeciesCard.EuropeanCrestedTit, cubes: [BiotopeType.Forest, BiotopeType.Forest, BiotopeType.Forest, BiotopeType.Forest] }
      ]
      const { game, cardsWithCubesAndIndex } = setupGaeWithDeckCardOnTopOfType(cardsWithCubes, SpeciesDietType.Herbivore, BiotopeType.Forest)
      const rules = new BiotopesRules(game)
      const placeCubeAction = playAction(
        rules,
        rules
          .material(MaterialType.Cube)
          .parent(cardsWithCubesAndIndex[0].index)
          .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Reproduction, player: PlayerColor.Fox }),
        PlayerColor.Fox
      )
      const discardCardAction = playAction(
        rules,
        rules
          .material(MaterialType.SpeciesCard)
          .location(LocationType.SpeciesDecksSpot)
          .location((l) => l.y === SpeciesDietType.Herbivore)
          .deck()
          .dealOne({ type: LocationType.SpeciesDiscardsSpot, y: SpeciesDietType.Herbivore }),
        PlayerColor.Fox
      )

      // When
      const drawCubeAction = playAction(
        rules,
        rules.material(MaterialType.Cube).createItem({
          id: BiotopeType.Forest,
          location: {
            type: LocationType.CubeSpotOnPlayerSpeciesCard,
            player: PlayerColor.Fox,
            parent: cardsWithCubesAndIndex[0].index
          }
        }),
        PlayerColor.Fox
      )

      // Then
      expect(placeCubeAction.consequences).to.be.an('array').that.has.length(1)
      expect(discardCardAction.consequences).to.be.an('array').that.has.length(1)
      expect(drawCubeAction.consequences).to.be.an('array').that.has.length(3)
      expect(drawCubeAction.consequences[0]).to.satisfy((move: BiotopesMove) => isBiotopesStartRule(move) && move.id === RuleId.ReproductionActionCreateCubes)
      expect(drawCubeAction.consequences[1]).to.satisfy((move: BiotopesMove) => isBiotopesCreateItemTypeAtOnce(MaterialType.Cube)(move))
      const createCubeMove = drawCubeAction.consequences[1] as CreateItemsAtOnce<PlayerColor, MaterialType, LocationType>
      expect(createCubeMove.items)
        .to.be.an('array')
        .that.has.length(3)
        .and.has.deep.members([
          {
            id: BiotopeType.Forest,
            location: {
              type: LocationType.CubeSpotOnPlayerSpeciesCard,
              player: PlayerColor.Fox,
              parent: cardsWithCubesAndIndex[0].index
            }
          },
          {
            id: BiotopeType.Wetland,
            location: {
              type: LocationType.CubeSpotOnPlayerSpeciesCard,
              player: PlayerColor.Fox,
              parent: cardsWithCubesAndIndex[1].index
            }
          },
          {
            id: BiotopeType.Mountain,
            location: {
              type: LocationType.CubeSpotOnPlayerSpeciesCard,
              player: PlayerColor.Fox,
              parent: cardsWithCubesAndIndex[3].index
            }
          }
        ])
      expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).that.has.property('player').which.equals(PlayerColor.Owl)
    })
  })

  describe('Multiple fecund species cards tests', () => {
    test('Given two fecund species are present, the game should proceed to the DiscardCardToDrawCube rule and pending effect should have 2 cubes to draw', () => {
      //  Given
      const cardsWithCubes = [
        { card: SpeciesCard.WildBoar, cubes: [BiotopeType.Forest, BiotopeType.Forest] },
        { card: SpeciesCard.MuteSwan, cubes: [BiotopeType.Wetland, BiotopeType.Wetland, BiotopeType.Wetland] },
        { card: SpeciesCard.EuropeanHedgehog, cubes: [BiotopeType.Meadow] },
        { card: SpeciesCard.AlpineMarmot, cubes: [BiotopeType.Mountain, BiotopeType.Mountain] },
        { card: SpeciesCard.EuropeanCrestedTit, cubes: [BiotopeType.Forest, BiotopeType.Forest, BiotopeType.Forest, BiotopeType.Forest] },
        { card: SpeciesCard.CommonHouseMosquito, cubes: [BiotopeType.Wetland, BiotopeType.Wetland, BiotopeType.Wetland] }
      ]
      const { game, cardsWithCubesAndIndex } = setupGameWithDeckCardsOnTopOfType(cardsWithCubes, [
        { deck: SpeciesDietType.Herbivore, biotopeTypes: [BiotopeType.Forest, BiotopeType.Meadow] }
      ])
      const rules = new BiotopesRules(game)

      // When
      const placeCubeAction = playAction(
        rules,
        rules
          .material(MaterialType.Cube)
          .parent(cardsWithCubesAndIndex[0].index)
          .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Reproduction, player: PlayerColor.Fox }),
        PlayerColor.Fox
      )

      // Then
      expect(placeCubeAction.consequences).to.be.an('array').that.has.length(1)
      expect(rules.rulesStep).to.be.instanceof(DiscardCardToDrawCubeRule).that.has.property('player').which.equals(PlayerColor.Fox)
      const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
      expect(pendingEffects)
        .to.be.an('array')
        .that.has.length(1)
        .and.deep.members([{ type: SpeciesCardEffect.FecundSpecies, numberOfCubesToDraw: 2 }])
    })

    test('Given two fecund species are present, and one cube was placed, the game should proceed to DiscardCardToDrawCube rule and pending effect should have 1 cube to draw', () => {
      //  Given
      const cardsWithCubes = [
        { card: SpeciesCard.WildBoar, cubes: [BiotopeType.Forest, BiotopeType.Forest] },
        { card: SpeciesCard.MuteSwan, cubes: [BiotopeType.Wetland, BiotopeType.Wetland, BiotopeType.Wetland] },
        { card: SpeciesCard.EuropeanHedgehog, cubes: [BiotopeType.Meadow] },
        { card: SpeciesCard.AlpineMarmot, cubes: [BiotopeType.Mountain, BiotopeType.Mountain] },
        { card: SpeciesCard.EuropeanCrestedTit, cubes: [BiotopeType.Forest, BiotopeType.Forest, BiotopeType.Forest, BiotopeType.Forest] },
        { card: SpeciesCard.CommonHouseMosquito, cubes: [BiotopeType.Wetland, BiotopeType.Wetland, BiotopeType.Wetland] }
      ]
      const { game, cardsWithCubesAndIndex } = setupGameWithDeckCardsOnTopOfType(cardsWithCubes, [
        { deck: SpeciesDietType.Herbivore, biotopeTypes: [BiotopeType.Forest, BiotopeType.Meadow] }
      ])
      const rules = new BiotopesRules(game)
      playAction(
        rules,
        rules
          .material(MaterialType.Cube)
          .parent(cardsWithCubesAndIndex[0].index)
          .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Reproduction, player: PlayerColor.Fox }),
        PlayerColor.Fox
      )
      playAction(
        rules,
        rules
          .material(MaterialType.SpeciesCard)
          .location(LocationType.SpeciesDecksSpot)
          .location((l) => l.y === SpeciesDietType.Herbivore)
          .deck()
          .dealOne({ type: LocationType.SpeciesDiscardsSpot, y: SpeciesDietType.Herbivore }),
        PlayerColor.Fox
      )

      // When
      const firstCreateCubeAction = playAction(
        rules,
        rules.material(MaterialType.Cube).createItem({
          id: BiotopeType.Forest,
          location: {
            type: LocationType.CubeSpotOnPlayerSpeciesCard,
            player: PlayerColor.Fox,
            parent: cardsWithCubesAndIndex[0].index
          }
        }),
        PlayerColor.Fox
      )

      // Then
      expect(firstCreateCubeAction.consequences).to.be.an('array').that.has.length(1)
      expect(rules.rulesStep).to.be.instanceof(DiscardCardToDrawCubeRule).that.has.property('player').which.equals(PlayerColor.Fox)
      const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
      expect(pendingEffects)
        .to.be.an('array')
        .that.has.length(1)
        .and.deep.members([{ type: SpeciesCardEffect.FecundSpecies, numberOfCubesToDraw: 1 }])
    })

    test('Given two fecund species are present, and two cubes being placed, the game should create relevant cubes, proceed to the ChooseAction rule with next player active', () => {
      //  Given
      const cardsWithCubes = [
        { card: SpeciesCard.WildBoar, cubes: [BiotopeType.Forest, BiotopeType.Forest] },
        { card: SpeciesCard.MuteSwan, cubes: [BiotopeType.Wetland, BiotopeType.Wetland, BiotopeType.Wetland] },
        { card: SpeciesCard.EuropeanHedgehog, cubes: [BiotopeType.Meadow] },
        { card: SpeciesCard.AlpineMarmot, cubes: [BiotopeType.Mountain, BiotopeType.Mountain] },
        { card: SpeciesCard.EuropeanCrestedTit, cubes: [BiotopeType.Forest, BiotopeType.Forest, BiotopeType.Forest, BiotopeType.Forest] },
        { card: SpeciesCard.CommonHouseMosquito, cubes: [BiotopeType.Wetland, BiotopeType.Wetland, BiotopeType.Wetland] }
      ]
      const { game, cardsWithCubesAndIndex } = setupGameWithDeckCardsOnTopOfType(cardsWithCubes, [
        { deck: SpeciesDietType.Herbivore, biotopeTypes: [BiotopeType.Forest, BiotopeType.Meadow] }
      ])
      const rules = new BiotopesRules(game)
      // Place cube on ecosystem board
      playAction(
        rules,
        rules
          .material(MaterialType.Cube)
          .parent(cardsWithCubesAndIndex[0].index)
          .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Reproduction, player: PlayerColor.Fox }),
        PlayerColor.Fox
      )
      // Discard first herbivore card (forest back)
      playAction(
        rules,
        rules
          .material(MaterialType.SpeciesCard)
          .location(LocationType.SpeciesDecksSpot)
          .location((l) => l.y === SpeciesDietType.Herbivore)
          .deck()
          .dealOne({ type: LocationType.SpeciesDiscardsSpot, y: SpeciesDietType.Herbivore }),
        PlayerColor.Fox
      )
      // Place cube on Wild Boar
      playAction(
        rules,
        rules.material(MaterialType.Cube).createItem({
          id: BiotopeType.Forest,
          location: {
            type: LocationType.CubeSpotOnPlayerSpeciesCard,
            player: PlayerColor.Fox,
            parent: cardsWithCubesAndIndex[0].index
          }
        }),
        PlayerColor.Fox
      )
      // Discard second Herbivore card (meadow back)
      playAction(
        rules,
        rules
          .material(MaterialType.SpeciesCard)
          .location(LocationType.SpeciesDecksSpot)
          .location((l) => l.y === SpeciesDietType.Herbivore)
          .deck()
          .dealOne({
            type: LocationType.SpeciesDiscardsSpot,
            y: SpeciesDietType.Herbivore
          }),
        PlayerColor.Fox
      )

      // When
      const lastCreateCubeAction = playAction(
        rules,
        rules.material(MaterialType.Cube).createItem({
          id: BiotopeType.Meadow,
          location: {
            type: LocationType.CubeSpotOnPlayerSpeciesCard,
            player: PlayerColor.Fox,
            parent: cardsWithCubesAndIndex[2].index
          }
        }),
        PlayerColor.Fox
      )

      // Then
      expect(lastCreateCubeAction.consequences).to.be.an('array').that.has.length(3)
      expect(lastCreateCubeAction.consequences[0]).to.satisfy(
        (move: BiotopesMove) => isBiotopesStartRule(move) && move.id === RuleId.ReproductionActionCreateCubes
      )
      expect(lastCreateCubeAction.consequences[1]).to.satisfy((move: BiotopesMove) => isBiotopesCreateItemTypeAtOnce(MaterialType.Cube)(move))
      const createCubesMove = lastCreateCubeAction.consequences[1] as CreateItemsAtOnce<PlayerColor, MaterialType, LocationType>
      expect(createCubesMove.items)
        .to.be.an('array')
        .that.has.length(5)
        .and.has.deep.members([
          {
            id: BiotopeType.Forest,
            location: {
              type: LocationType.CubeSpotOnPlayerSpeciesCard,
              player: PlayerColor.Fox,
              parent: cardsWithCubesAndIndex[0].index
            }
          },
          {
            id: BiotopeType.Wetland,
            location: {
              type: LocationType.CubeSpotOnPlayerSpeciesCard,
              player: PlayerColor.Fox,
              parent: cardsWithCubesAndIndex[1].index
            }
          },
          {
            id: BiotopeType.Meadow,
            location: {
              type: LocationType.CubeSpotOnPlayerSpeciesCard,
              player: PlayerColor.Fox,
              parent: cardsWithCubesAndIndex[2].index
            }
          },
          {
            id: BiotopeType.Mountain,
            location: {
              type: LocationType.CubeSpotOnPlayerSpeciesCard,
              player: PlayerColor.Fox,
              parent: cardsWithCubesAndIndex[3].index
            }
          },
          {
            id: BiotopeType.Wetland,
            location: {
              type: LocationType.CubeSpotOnPlayerSpeciesCard,
              player: PlayerColor.Fox,
              parent: cardsWithCubesAndIndex[5].index
            }
          }
        ])
      expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).that.has.property('player').which.equals(PlayerColor.Owl)
      const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(pendingEffects).to.be.undefined
    })
  })
})
