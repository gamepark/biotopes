import { describe, expect, test } from 'vitest'
import { setupGameAndGetColonizationRule } from './utils/setupGameAndGetColonizationRule.util'
import { PlayerColor } from '../../src/PlayerColor'
import { KnownSpeciesCardId, SpeciesCard, SpeciesDietType } from '../../src/material/SpeciesCard'
import { BiotopeType } from '../../src/material/BiotopeType'
import { EcosystemActionType } from '../../src/material/EcosystemActionType'
import { MaterialType } from '../../src/material/MaterialType'
import { LocationType } from '../../src/material/LocationType'
import { BiotopesRules } from '../../src'
import { playAction } from '@gamepark/rules-api'
import { BiotopesPendingEffect } from '../../src/material/effects/PendingEffect'
import { Memory } from '../../src/Memory'
import { PendingEffectType } from '../../src/material/effects/PendingEffectType'
import { ChooseActionRule } from '../../src/rules/ChooseActionRule'
import { DiscardCardToDrawCubeRule } from '../../src/rules/actions/common/DiscardCardToDrawCubeRule'
import { speciesCardCharacteristics } from '../../src/material/SpeciesCardCharacteristics'

describe('Migrating species species tests', () => {
  test("After a migration with a Migrating species species present in the player's tableau, game should proceed to the DrawCube rule for the current player", () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Owl, PlayerColor.Ibex],
      [
        { cardId: SpeciesCard.GrassFrog, cubeBiotopeType: BiotopeType.Wetland },
        { cardId: SpeciesCard.BeardedReedling, cubeBiotopeType: BiotopeType.Wetland }
      ],
      EcosystemActionType.Migration
    )
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(1).moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Migration, x: 0 }),
      PlayerColor.Owl
    )

    // When
    playAction(
      rules,
      rules
        .material(MaterialType.TerritoryToken)
        .id(PlayerColor.Owl)
        .location((l) => l.type === LocationType.CentralLandscapeSpot && l.x === 0 && l.y === 1)
        .moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: 2,
          y: 0
        }),
      PlayerColor.Owl
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DiscardCardToDrawCubeRule).and.have.property('player').which.eqls(PlayerColor.Owl)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCubes, numberOfCubesToDraw: 1 }])
  })

  test("After a migration with a Migrating species species present in the player's tableau, and after player drew a cube, game should proceed to the ChooseAction rule for the next player", () => {
    // Given
    const { setup, game, cardsWithIndexes } = setupGameAndGetColonizationRule(
      [PlayerColor.Owl, PlayerColor.Ibex],
      [
        { cardId: SpeciesCard.GrassFrog, cubeBiotopeType: BiotopeType.Wetland },
        { cardId: SpeciesCard.BeardedReedling, cubeBiotopeType: BiotopeType.Wetland }
      ],
      EcosystemActionType.Migration
    )
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
      rules.material(MaterialType.Cube).index(1).moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Migration, x: 0 }),
      PlayerColor.Owl
    )
    playAction(
      rules,
      rules
        .material(MaterialType.TerritoryToken)
        .id(PlayerColor.Owl)
        .location((l) => l.type === LocationType.CentralLandscapeSpot && l.x === 0 && l.y === 1)
        .moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: 2,
          y: 0
        }),
      PlayerColor.Owl
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
      PlayerColor.Owl
    )
    const action = playAction(
      rules,
      rules.material(MaterialType.Cube).createItem({
        id: BiotopeType.Wetland,
        location: {
          type: LocationType.CubeSpotOnPlayerSpeciesCard,
          player: PlayerColor.Owl,
          parent: cardsWithIndexes[0].cardIndex
        }
      }),
      PlayerColor.Owl
    )

    // Then
    expect(action.consequences).to.be.an('array').of.length(3)
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').which.eqls(PlayerColor.Ibex)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })
})
