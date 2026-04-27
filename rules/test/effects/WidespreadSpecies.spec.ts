import { describe, expect, test } from 'vitest'
import { setupGameAndGetColonizationRule } from './utils/setupGameAndGetColonizationRule.util'
import { KnownSpeciesCardId, SpeciesCard, SpeciesDietType } from '../../src/material/SpeciesCard'
import { BiotopeType } from '../../src/material/BiotopeType'
import { BiotopesRules } from '../../src'
import { playAction } from '@gamepark/rules-api'
import { MaterialType } from '../../src/material/MaterialType'
import { PlayerColor } from '../../src/PlayerColor'
import { LocationType } from '../../src/material/LocationType'
import { BiotopesPendingEffect } from '../../src/material/effects/PendingEffect'
import { Memory } from '../../src/Memory'
import { PendingEffectType } from '../../src/material/effects/PendingEffectType'
import { EcosystemActionType } from '../../src/material/EcosystemActionType'
import { ChooseActionRule } from '../../src/rules/ChooseActionRule'
import { DiscardCardToDrawCubeRule } from '../../src/rules/actions/common/DiscardCardToDrawCubeRule'
import { speciesCardCharacteristics } from '../../src/material/SpeciesCardCharacteristics'

describe('Widespread species tests', () => {
  test("After an expansion action with a widespread species present in the player's tableau, game should proceed to the DrawCube rule for the current player", () => {
    // Given
    const { setup, game } = setupGameAndGetColonizationRule(
      [PlayerColor.Ibex, PlayerColor.Woodpecker],
      [{ cardId: SpeciesCard.CommonWaterFrog, cubeBiotopeType: BiotopeType.Meadow }],
      EcosystemActionType.Expansion
    )
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Wetland,
      location: {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: PlayerColor.Ibex,
        id: BiotopeType.Wetland,
        parent: setup.material(MaterialType.BiotopeBoard).player(PlayerColor.Ibex).getIndex()
      }
    })
    const rules = new BiotopesRules(game)

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(1).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        id: EcosystemActionType.Expansion,
        x: 0
      }),
      PlayerColor.Ibex
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Ibex).location(LocationType.TerritoryTokenSpotOnEcosystemBoard).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: 1,
        y: 1
      }),
      PlayerColor.Ibex
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DiscardCardToDrawCubeRule).and.have.property('player').eql(PlayerColor.Ibex)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCubes, numberOfCubesToDraw: 1 }])
  })

  test("After an expansion action with a widespread species present in the player's tableau and player drew a cube, game should proceed to the ChooseAction rule for the next player", () => {
    const { setup, game, cardsWithIndexes } = setupGameAndGetColonizationRule(
      [PlayerColor.Ibex, PlayerColor.Woodpecker],
      [{ cardId: SpeciesCard.CommonWaterFrog, cubeBiotopeType: BiotopeType.Meadow }],
      EcosystemActionType.Expansion
    )
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Wetland,
      location: {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: PlayerColor.Ibex,
        parent: setup.material(MaterialType.BiotopeBoard).player(PlayerColor.Ibex).getIndex()
      }
    })
    setup
      .material(MaterialType.SpeciesCard)
      .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Insectivore)
      .deck()
      .id<KnownSpeciesCardId>((id) => speciesCardCharacteristics[id.front].biotope === BiotopeType.Wetland)
      .moveItem({
        type: LocationType.SpeciesDecksSpot,
        y: SpeciesDietType.Insectivore
      })
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(1).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        id: EcosystemActionType.Expansion,
        x: 0
      }),
      PlayerColor.Ibex
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Ibex).location(LocationType.TerritoryTokenSpotOnEcosystemBoard).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: 1,
        y: 1
      }),
      PlayerColor.Ibex
    )

    // When
    playAction(
      rules,
      rules
        .material(MaterialType.SpeciesCard)
        .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Insectivore)
        .deck()
        .dealOne({
          type: LocationType.SpeciesDiscardsSpot,
          y: SpeciesDietType.Insectivore
        }),
      PlayerColor.Ibex
    )
    const action = playAction(
      rules,
      rules.material(MaterialType.Cube).createItem({
        id: BiotopeType.Wetland,
        location: {
          type: LocationType.CubeSpotOnPlayerSpeciesCard,
          player: PlayerColor.Ibex,
          parent: cardsWithIndexes[0].cardIndex
        }
      }),
      PlayerColor.Ibex
    )

    // Then
    expect(action.consequences).to.be.an('array').of.length(3)
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').eql(PlayerColor.Woodpecker)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })

  test('Widespread species should not trigger on a migration action', () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Ibex, PlayerColor.Woodpecker],
      [
        { cardId: SpeciesCard.CommonWaterFrog, cubeBiotopeType: BiotopeType.Wetland },
        { cardId: SpeciesCard.BeardedReedling, cubeBiotopeType: BiotopeType.Wetland }
      ],
      EcosystemActionType.Migration
    )
    const rules = new BiotopesRules(game)

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(1).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        id: EcosystemActionType.Migration,
        x: 0
      }),
      PlayerColor.Ibex
    )
    playAction(
      rules,
      rules
        .material(MaterialType.TerritoryToken)
        .location((l) => l.type === LocationType.CentralLandscapeSpot && l.x === 0 && l.y === 1)
        .moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: 2,
          y: 0
        }),
      PlayerColor.Ibex
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').eql(PlayerColor.Woodpecker)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })
})
