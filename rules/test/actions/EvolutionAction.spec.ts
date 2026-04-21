import { describe, expect, test } from 'vitest'
import { BiotopesRules, BiotopesSetup } from '../../src'
import { PlayerColor } from '../../src/PlayerColor'
import { RuleId } from '../../src/rules/RuleId'
import { MaterialType } from '../../src/material/MaterialType'
import { BiotopeType } from '../../src/material/BiotopeType'
import { LocationType } from '../../src/material/LocationType'
import { BiotopeCard, getBiotopeCardType } from '../../src/material/BiotopeCard'
import { applyAutomaticMoves, MaterialMoveBuilder, MoveKind, playAction, RuleMoveType } from '@gamepark/rules-api'
import { EcosystemActionType } from '../../src/material/EcosystemActionType'
import { CubeType } from '../../src/material/CubeType'
import { CustomMoveType } from '../../src/material/CustomMoveType'
import { Memory } from '../../src/Memory'
import { PendingEffectType } from '../../src/material/effects/PendingEffectType'
import { DrawCardsRule } from '../../src/rules/actions/common/DrawCardsRule'
import { KnownSpeciesCardId, SpeciesCard, SpeciesDietType } from '../../src/material/SpeciesCard'
import { BiotopesPendingEffect } from '../../src/material/effects/PendingEffect'
import { GameSetupRiverRule } from '../../src/rules/GameSetupRiverRule'
import { ChooseActionRule } from '../../src/rules/ChooseActionRule'
import { BiotopesMove, isBiotopesMoveItemTypeAtOnce } from '../../src/BiotopeTypes'
import { DiscardCardsFromHandRule } from '../../src/rules/actions/common/DiscardCardsFromHandRule'
import customMove = MaterialMoveBuilder.customMove

describe('Evolution tests', () => {
  test('When placing one cube and validating action, game should proceed to DrawCards rule with 1 card to draw', () => {
    // Given
    const setup = new BiotopesSetup()
    const game = setup.setup({ advancedBiotopes: false, players: [{ id: PlayerColor.Woodpecker }, { id: PlayerColor.Owl }] })
    setup.material(MaterialType.Cube).createItemsAtOnce([
      {
        id: BiotopeType.Forest,
        location: {
          type: LocationType.CubeSpotOnPlayerBiotopesCard,
          player: PlayerColor.Woodpecker,
          parent: setup
            .material(MaterialType.BiotopesCard)
            .player(PlayerColor.Woodpecker)
            .id<BiotopeCard>((id) => getBiotopeCardType(id) === BiotopeType.Forest)
            .getIndex()
        }
      }
    ])
    game.rule = {
      id: RuleId.EvolutionActionPlaceCubesAndDiscardCards,
      player: PlayerColor.Woodpecker
    }
    const rules = new BiotopesRules(game)

    // When
    playAction(
      rules,
      rules
        .material(MaterialType.Cube)
        .index(0)
        .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, player: PlayerColor.Woodpecker, id: EcosystemActionType.Evolution, x: CubeType.Plant }),
      PlayerColor.Woodpecker
    )
    playAction(rules, customMove<CustomMoveType, undefined>(CustomMoveType.EndEvolutionAction), PlayerColor.Woodpecker)

    // Then
    const pendingActions = rules.remind(Memory.PendingEffects)
    expect(pendingActions)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 }])
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule)
  })

  test('When placing one cube, discarding one card and validating action, game should proceed to DrawCards rule with 2 cards to draw', () => {
    // Given
    const setup = new BiotopesSetup()
    const game = setup.setup({ advancedBiotopes: false, players: [{ id: PlayerColor.Woodpecker }, { id: PlayerColor.Owl }] })
    setup.material(MaterialType.Cube).createItemsAtOnce([
      {
        id: BiotopeType.Forest,
        location: {
          type: LocationType.CubeSpotOnPlayerBiotopesCard,
          player: PlayerColor.Woodpecker,
          parent: setup
            .material(MaterialType.BiotopesCard)
            .player(PlayerColor.Woodpecker)
            .id<BiotopeCard>((id) => getBiotopeCardType(id) === BiotopeType.Forest)
            .getIndex()
        }
      }
    ])
    game.rule = {
      id: RuleId.EvolutionActionPlaceCubesAndDiscardCards,
      player: PlayerColor.Woodpecker
    }
    const rules = new BiotopesRules(game)

    // When
    playAction(
      rules,
      rules
        .material(MaterialType.Cube)
        .index(0)
        .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, player: PlayerColor.Woodpecker, id: EcosystemActionType.Evolution, x: CubeType.Plant }),
      PlayerColor.Woodpecker
    )
    playAction(
      rules,
      rules.material(MaterialType.SpeciesCard).location(LocationType.PlayerSpeciesCardHandSpot).player(PlayerColor.Woodpecker).moveItem<KnownSpeciesCardId>({
        type: LocationType.SpeciesDiscardsSpot,
        y: SpeciesDietType.Herbivore
      }),
      PlayerColor.Woodpecker
    )
    playAction(rules, customMove<CustomMoveType, undefined>(CustomMoveType.EndEvolutionAction), PlayerColor.Woodpecker)

    // Then
    const pendingActions = rules.remind(Memory.PendingEffects)
    expect(pendingActions)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 2 }])
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule)
  })

  test('After placing cube and discarding cards, when player draws the first card, game should reduce the number of cards to draw', () => {
    const setup = new BiotopesSetup()
    const game = setup.setup({ advancedBiotopes: false, players: [{ id: PlayerColor.Woodpecker }, { id: PlayerColor.Owl }] })
    const riverSetupRule = new GameSetupRiverRule(game)
    const rules = new BiotopesRules(game)
    applyAutomaticMoves(rules, riverSetupRule.onRuleStart().slice(0, -1)) // Don't apply primary production
    setup.material(MaterialType.Cube).createItemsAtOnce([
      {
        id: BiotopeType.Forest,
        location: {
          type: LocationType.CubeSpotOnPlayerBiotopesCard,
          player: PlayerColor.Woodpecker,
          parent: setup
            .material(MaterialType.BiotopesCard)
            .player(PlayerColor.Woodpecker)
            .id<BiotopeCard>((id) => getBiotopeCardType(id) === BiotopeType.Forest)
            .getIndex()
        }
      }
    ])
    game.rule = {
      id: RuleId.EvolutionActionPlaceCubesAndDiscardCards,
      player: PlayerColor.Woodpecker
    }
    playAction(
      rules,
      rules
        .material(MaterialType.Cube)
        .index(0)
        .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, player: PlayerColor.Woodpecker, id: EcosystemActionType.Evolution, x: CubeType.Plant }),
      PlayerColor.Woodpecker
    )
    playAction(
      rules,
      rules.material(MaterialType.SpeciesCard).location(LocationType.PlayerSpeciesCardHandSpot).player(PlayerColor.Woodpecker).moveItem<KnownSpeciesCardId>({
        type: LocationType.SpeciesDiscardsSpot,
        y: SpeciesDietType.Herbivore
      }),
      PlayerColor.Woodpecker
    )
    playAction(rules, customMove<CustomMoveType, undefined>(CustomMoveType.EndEvolutionAction), PlayerColor.Woodpecker)

    // When
    playAction(
      rules,
      rules
        .material(MaterialType.SpeciesCard)
        .location((l) => l.type === LocationType.SpeciesRiversGrid && l.x === 1 && l.y === SpeciesDietType.Herbivore)
        .moveItem({ type: LocationType.PlayerSpeciesCardHandSpot, player: PlayerColor.Woodpecker }),
      PlayerColor.Woodpecker
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 }])
  })

  test('After placing cube and discarding one card, when player draws 2 cards, game should proceed to the ChooseAction rule for the next player', () => {
    const setup = new BiotopesSetup()
    const game = setup.setup({ advancedBiotopes: false, players: [{ id: PlayerColor.Woodpecker }, { id: PlayerColor.Owl }] })
    const riverSetupRule = new GameSetupRiverRule(game)
    const rules = new BiotopesRules(game)
    applyAutomaticMoves(rules, riverSetupRule.onRuleStart().slice(0, -1)) // Don't apply primary production, only rivers setup
    setup.material(MaterialType.Cube).createItemsAtOnce([
      {
        id: BiotopeType.Forest,
        location: {
          type: LocationType.CubeSpotOnPlayerBiotopesCard,
          player: PlayerColor.Woodpecker,
          parent: setup
            .material(MaterialType.BiotopesCard)
            .player(PlayerColor.Woodpecker)
            .id<BiotopeCard>((id) => getBiotopeCardType(id) === BiotopeType.Forest)
            .getIndex()
        }
      }
    ])
    game.rule = {
      id: RuleId.EvolutionActionPlaceCubesAndDiscardCards,
      player: PlayerColor.Woodpecker
    }
    playAction(
      rules,
      rules
        .material(MaterialType.Cube)
        .index(0)
        .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, player: PlayerColor.Woodpecker, id: EcosystemActionType.Evolution, x: CubeType.Plant }),
      PlayerColor.Woodpecker
    )
    playAction(
      rules,
      rules.material(MaterialType.SpeciesCard).location(LocationType.PlayerSpeciesCardHandSpot).player(PlayerColor.Woodpecker).moveItem<KnownSpeciesCardId>({
        type: LocationType.SpeciesDiscardsSpot,
        y: SpeciesDietType.Herbivore
      }),
      PlayerColor.Woodpecker
    )
    playAction(rules, customMove<CustomMoveType, undefined>(CustomMoveType.EndEvolutionAction), PlayerColor.Woodpecker)
    playAction(
      rules,
      rules
        .material(MaterialType.SpeciesCard)
        .location((l) => l.type === LocationType.SpeciesRiversGrid && l.x === 1 && l.y === SpeciesDietType.Herbivore)
        .moveItem({ type: LocationType.PlayerSpeciesCardHandSpot, player: PlayerColor.Woodpecker }),
      PlayerColor.Woodpecker
    )

    // When
    const lastCardDrawnAction = playAction(
      rules,
      rules
        .material(MaterialType.SpeciesCard)
        .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore)
        .deck()
        .dealOne({ type: LocationType.PlayerSpeciesCardHandSpot, player: PlayerColor.Woodpecker }),
      PlayerColor.Woodpecker
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').that.eqls(PlayerColor.Owl)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
    expect(lastCardDrawnAction.consequences)
      .to.be.an('array')
      .that.has.length(3)
      .and.includes.deep.members([{ kind: MoveKind.RulesMove, type: RuleMoveType.StartRule, id: RuleId.DiscardCardsFromHand }])
    expect(lastCardDrawnAction.consequences[0]).to.satisfy(
      (move: BiotopesMove) =>
        isBiotopesMoveItemTypeAtOnce(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.SpeciesRiversGrid && move.indexes.length === 1
    )
  })

  test(
    'After placing 2 cubes and discarding one card (while having 4 cards in hand), when player draws 3 cards, game ' +
      'should proceed to the DiscardCardsFromHand rule for the current player',
    () => {
      const setup = new BiotopesSetup()
      const game = setup.setup({ advancedBiotopes: false, players: [{ id: PlayerColor.Woodpecker }, { id: PlayerColor.Owl }] })
      const [insectCardIndex, insectCard] = setup.material(MaterialType.SpeciesCard).id<KnownSpeciesCardId>((id) => id.front === SpeciesCard.MammothWasp)
        .entries[0]
      if (insectCard.location.type === LocationType.PlayerSpeciesCardHandSpot && insectCard.location.player === PlayerColor.Woodpecker) {
        setup
          .material(MaterialType.SpeciesCard)
          .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore)
          .deck()
          .dealOne({
            type: LocationType.PlayerSpeciesCardHandSpot,
            player: PlayerColor.Woodpecker
          })
      }
      setup.material(MaterialType.SpeciesCard).index(insectCardIndex).moveItem({
        type: LocationType.PlayerSpeciesCardTableauSpot,
        player: PlayerColor.Woodpecker
      })
      const riverSetupRule = new GameSetupRiverRule(game)
      const rules = new BiotopesRules(game)
      applyAutomaticMoves(rules, riverSetupRule.onRuleStart().slice(0, -1)) // Don't apply primary production, only rivers setup
      setup.material(MaterialType.Cube).createItemsAtOnce([
        {
          id: BiotopeType.Forest,
          location: {
            type: LocationType.CubeSpotOnPlayerBiotopesCard,
            player: PlayerColor.Woodpecker,
            parent: setup
              .material(MaterialType.BiotopesCard)
              .player(PlayerColor.Woodpecker)
              .id<BiotopeCard>((id) => getBiotopeCardType(id) === BiotopeType.Forest)
              .getIndex()
          }
        },
        {
          id: BiotopeType.Forest,
          location: {
            type: LocationType.CubeSpotOnPlayerSpeciesCard,
            player: PlayerColor.Woodpecker,
            parent: insectCardIndex
          }
        }
      ])
      game.rule = {
        id: RuleId.EvolutionActionPlaceCubesAndDiscardCards,
        player: PlayerColor.Woodpecker
      }
      playAction(
        rules,
        rules
          .material(MaterialType.Cube)
          .index(0)
          .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, player: PlayerColor.Woodpecker, id: EcosystemActionType.Evolution, x: CubeType.Plant }),
        PlayerColor.Woodpecker
      )
      playAction(
        rules,
        rules
          .material(MaterialType.Cube)
          .index(1)
          .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, player: PlayerColor.Woodpecker, id: EcosystemActionType.Evolution, x: CubeType.Insect }),
        PlayerColor.Woodpecker
      )
      playAction(
        rules,
        rules.material(MaterialType.SpeciesCard).location(LocationType.PlayerSpeciesCardHandSpot).player(PlayerColor.Woodpecker).moveItem<KnownSpeciesCardId>({
          type: LocationType.SpeciesDiscardsSpot,
          y: SpeciesDietType.Herbivore
        }),
        PlayerColor.Woodpecker
      )
      playAction(rules, customMove<CustomMoveType, undefined>(CustomMoveType.EndEvolutionAction), PlayerColor.Woodpecker)
      playAction(
        rules,
        rules
          .material(MaterialType.SpeciesCard)
          .location((l) => l.type === LocationType.SpeciesRiversGrid && l.x === 1 && l.y === SpeciesDietType.Herbivore)
          .moveItem({ type: LocationType.PlayerSpeciesCardHandSpot, player: PlayerColor.Woodpecker }),
        PlayerColor.Woodpecker
      )
      playAction(
        rules,
        rules
          .material(MaterialType.SpeciesCard)
          .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore)
          .deck()
          .dealOne({ type: LocationType.PlayerSpeciesCardHandSpot, player: PlayerColor.Woodpecker }),
        PlayerColor.Woodpecker
      )

      // When
      const lastCardDrawnAction = playAction(
        rules,
        rules
          .material(MaterialType.SpeciesCard)
          .location((l) => l.type === LocationType.SpeciesRiversGrid && l.y === SpeciesDietType.Insectivore && l.x === 2)
          .deck()
          .dealOne({ type: LocationType.PlayerSpeciesCardHandSpot, player: PlayerColor.Woodpecker }),
        PlayerColor.Woodpecker
      )

      // Then
      expect(rules.rulesStep).to.be.instanceof(DiscardCardsFromHandRule).and.have.property('player').that.eqls(PlayerColor.Woodpecker)
      const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
      expect(pendingEffects)
        .to.have.length(1)
        .and.to.have.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 0 }])
      expect(lastCardDrawnAction.consequences)
        .to.be.an('array')
        .that.has.length(2)
        .and.includes.deep.members([{ kind: MoveKind.RulesMove, type: RuleMoveType.StartRule, id: RuleId.DiscardCardsFromHand }])
      expect(lastCardDrawnAction.consequences[0]).to.satisfy(
        (move: BiotopesMove) =>
          isBiotopesMoveItemTypeAtOnce(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.SpeciesRiversGrid && move.indexes.length === 2
      )
    }
  )

  test(
    'After placing 2 cubes and discarding one card (while having 4 cards in hand), when player draws 3 cards then discards 1, game ' +
      'should proceed to the ChooseActon rule for the next player',
    () => {
      const setup = new BiotopesSetup()
      const game = setup.setup({ advancedBiotopes: false, players: [{ id: PlayerColor.Woodpecker }, { id: PlayerColor.Owl }] })
      const [insectCardIndex, insectCard] = setup.material(MaterialType.SpeciesCard).id<KnownSpeciesCardId>((id) => id.front === SpeciesCard.MammothWasp)
        .entries[0]
      if (insectCard.location.type === LocationType.PlayerSpeciesCardHandSpot && insectCard.location.player === PlayerColor.Woodpecker) {
        setup
          .material(MaterialType.SpeciesCard)
          .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore)
          .deck()
          .dealOne({
            type: LocationType.PlayerSpeciesCardHandSpot,
            player: PlayerColor.Woodpecker
          })
      }
      setup.material(MaterialType.SpeciesCard).index(insectCardIndex).moveItem({
        type: LocationType.PlayerSpeciesCardTableauSpot,
        player: PlayerColor.Woodpecker
      })
      const riverSetupRule = new GameSetupRiverRule(game)
      const rules = new BiotopesRules(game)
      applyAutomaticMoves(rules, riverSetupRule.onRuleStart().slice(0, -1)) // Don't apply primary production, only rivers setup
      setup.material(MaterialType.Cube).createItemsAtOnce([
        {
          id: BiotopeType.Forest,
          location: {
            type: LocationType.CubeSpotOnPlayerBiotopesCard,
            player: PlayerColor.Woodpecker,
            parent: setup
              .material(MaterialType.BiotopesCard)
              .player(PlayerColor.Woodpecker)
              .id<BiotopeCard>((id) => getBiotopeCardType(id) === BiotopeType.Forest)
              .getIndex()
          }
        },
        {
          id: BiotopeType.Forest,
          location: {
            type: LocationType.CubeSpotOnPlayerSpeciesCard,
            player: PlayerColor.Woodpecker,
            parent: insectCardIndex
          }
        }
      ])
      game.rule = {
        id: RuleId.EvolutionActionPlaceCubesAndDiscardCards,
        player: PlayerColor.Woodpecker
      }
      playAction(
        rules,
        rules
          .material(MaterialType.Cube)
          .index(0)
          .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, player: PlayerColor.Woodpecker, id: EcosystemActionType.Evolution, x: CubeType.Plant }),
        PlayerColor.Woodpecker
      )
      playAction(
        rules,
        rules
          .material(MaterialType.Cube)
          .index(1)
          .moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, player: PlayerColor.Woodpecker, id: EcosystemActionType.Evolution, x: CubeType.Insect }),
        PlayerColor.Woodpecker
      )
      playAction(
        rules,
        rules.material(MaterialType.SpeciesCard).location(LocationType.PlayerSpeciesCardHandSpot).player(PlayerColor.Woodpecker).moveItem<KnownSpeciesCardId>({
          type: LocationType.SpeciesDiscardsSpot,
          y: SpeciesDietType.Herbivore
        }),
        PlayerColor.Woodpecker
      )
      playAction(rules, customMove<CustomMoveType, undefined>(CustomMoveType.EndEvolutionAction), PlayerColor.Woodpecker)
      playAction(
        rules,
        rules
          .material(MaterialType.SpeciesCard)
          .location((l) => l.type === LocationType.SpeciesRiversGrid && l.x === 1 && l.y === SpeciesDietType.Herbivore)
          .moveItem({ type: LocationType.PlayerSpeciesCardHandSpot, player: PlayerColor.Woodpecker }),
        PlayerColor.Woodpecker
      )
      playAction(
        rules,
        rules
          .material(MaterialType.SpeciesCard)
          .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore)
          .deck()
          .dealOne({ type: LocationType.PlayerSpeciesCardHandSpot, player: PlayerColor.Woodpecker }),
        PlayerColor.Woodpecker
      )
      playAction(
        rules,
        rules
          .material(MaterialType.SpeciesCard)
          .location((l) => l.type === LocationType.SpeciesRiversGrid && l.y === SpeciesDietType.Insectivore && l.x === 2)
          .deck()
          .dealOne({ type: LocationType.PlayerSpeciesCardHandSpot, player: PlayerColor.Woodpecker }),
        PlayerColor.Woodpecker
      )

      // When
      playAction(
        rules,
        rules
          .material(MaterialType.SpeciesCard)
          .player(PlayerColor.Woodpecker)
          .location((l) => l.type === LocationType.PlayerSpeciesCardHandSpot && l.x === 0)
          .moveItem({
            type: LocationType.SpeciesDiscardsSpot,
            y: SpeciesDietType.Herbivore
          }),
        PlayerColor.Woodpecker
      )

      // Then
      expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').that.eqls(PlayerColor.Owl)
      const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(pendingEffects).to.be.undefined
    }
  )
})
