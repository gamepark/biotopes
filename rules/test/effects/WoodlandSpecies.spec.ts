import { describe, expect, test } from 'vitest'
import { setupGameAndGetColonizationRule } from './utils/setupGameAndGetColonizationRule.util'
import { PlayerColor } from '../../src/PlayerColor'
import { KnownSpeciesCardId, SpeciesCard, SpeciesDietType } from '../../src/material/SpeciesCard'
import { BiotopeType } from '../../src/material/BiotopeType'
import { MaterialType } from '../../src/material/MaterialType'
import { EcosystemActionType } from '../../src/material/EcosystemActionType'
import { LocationType } from '../../src/material/LocationType'
import { BiotopesRules } from '../../src'
import { playAction } from '@gamepark/rules-api'
import { BiotopesPendingEffect } from '../../src/material/effects/PendingEffect'
import { Memory } from '../../src/Memory'
import { PendingEffectType } from '../../src/material/effects/PendingEffectType'
import { speciesCardCharacteristics } from '../../src/material/SpeciesCardCharacteristics'
import { ChooseActionRule } from '../../src/rules/ChooseActionRule'
import { DrawCubesRule } from '../../src/rules/actions/common/DrawCubesRule'

describe('Woodland species tests', () => {
  test('After an expansion on a forest if the player has a Woodland species, game should proceed to the DrawCubes rule for the current player and allow to draw 1 cube', () => {
    // Given
    const { setup, game } = setupGameAndGetColonizationRule(
      [PlayerColor.Salamander, PlayerColor.Owl],
      [{ cardId: SpeciesCard.GreenWoodpecker, cubeBiotopeType: BiotopeType.Forest }],
      EcosystemActionType.Expansion
    )
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Forest,
      location: {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: PlayerColor.Salamander,
        parent: setup.material(MaterialType.BiotopeBoard).player(PlayerColor.Salamander).getIndex()
      }
    })
    const rules = new BiotopesRules(game)

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(1).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        player: PlayerColor.Salamander,
        id: EcosystemActionType.Expansion,
        x: 0
      }),
      PlayerColor.Salamander
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Salamander).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: -1,
        y: 1
      }),
      PlayerColor.Salamander
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCubesRule).and.to.have.property('player').which.eqls(PlayerColor.Salamander)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCubes, numberOfCubesToDraw: 1 }])
  })

  test('After an expansion on a forest if the player has a Woodland species and player drew a cube, game should proceed to the ChooseAction rule for the next player', () => {
    // Given
    const { setup, game, cardsWithIndexes } = setupGameAndGetColonizationRule(
      [PlayerColor.Salamander, PlayerColor.Owl],
      [{ cardId: SpeciesCard.GreenWoodpecker, cubeBiotopeType: BiotopeType.Forest }],
      EcosystemActionType.Expansion
    )
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Forest,
      location: {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: PlayerColor.Salamander,
        parent: setup.material(MaterialType.BiotopeBoard).player(PlayerColor.Salamander).getIndex()
      }
    })
    setup
      .material(MaterialType.SpeciesCard)
      .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore)
      .id<KnownSpeciesCardId>((id) => speciesCardCharacteristics[id.front].biotope === BiotopeType.Forest)
      .maxBy((card) => card.location.x ?? 0)
      .moveItem({
        type: LocationType.SpeciesDecksSpot,
        y: SpeciesDietType.Herbivore
      })
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(1).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        player: PlayerColor.Salamander,
        id: EcosystemActionType.Expansion,
        x: 0
      }),
      PlayerColor.Salamander
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Salamander).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: -1,
        y: 1
      }),
      PlayerColor.Salamander
    )

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).location(LocationType.CubeStockpileSpot).id(BiotopeType.Forest).moveItem({
        type: LocationType.CubeSpotOnPlayerSpeciesCard,
        player: PlayerColor.Salamander,
        parent: cardsWithIndexes[0].cardIndex
      }),
      PlayerColor.Salamander
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.to.have.property('player').which.eqls(PlayerColor.Owl)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })

  test('After a migration to a forest if the player has a Woodland species, game should proceed to the DrawCubes rule for the current player and allow to draw 1 cube', () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Salamander, PlayerColor.Owl],
      [{ cardId: SpeciesCard.GreenWoodpecker, cubeBiotopeType: BiotopeType.Forest }],
      EcosystemActionType.Migration
    )
    const rules = new BiotopesRules(game)

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(0).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        player: PlayerColor.Salamander,
        id: EcosystemActionType.Migration,
        x: 0
      }),
      PlayerColor.Salamander
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Salamander).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: -1,
        y: 1
      }),
      PlayerColor.Salamander
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCubesRule).and.to.have.property('player').which.eqls(PlayerColor.Salamander)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCubes, numberOfCubesToDraw: 1 }])
  })

  test('After a migration to a forest if the player has a Woodland species and player drew a cube, game should proceed to the ChooseAction rule for the next player', () => {
    // Given
    const { setup, game, cardsWithIndexes } = setupGameAndGetColonizationRule(
      [PlayerColor.Salamander, PlayerColor.Owl],
      [{ cardId: SpeciesCard.GreenWoodpecker, cubeBiotopeType: BiotopeType.Forest }],
      EcosystemActionType.Migration
    )
    setup
      .material(MaterialType.SpeciesCard)
      .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore)
      .id<KnownSpeciesCardId>((id) => speciesCardCharacteristics[id.front].biotope === BiotopeType.Forest)
      .maxBy((card) => card.location.x ?? 0)
      .moveItem({
        type: LocationType.SpeciesDecksSpot,
        y: SpeciesDietType.Herbivore
      })
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(0).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        player: PlayerColor.Salamander,
        id: EcosystemActionType.Migration,
        x: 0
      }),
      PlayerColor.Salamander
    )
    playAction(
      rules,
      rules
        .material(MaterialType.TerritoryToken)
        .location((l) => l.type === LocationType.CentralLandscapeSpot && l.x === -3 && l.y === -1)
        .moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: 0,
          y: 2
        }),
      PlayerColor.Salamander
    )

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).location(LocationType.CubeStockpileSpot).id(BiotopeType.Forest).moveItem({
        type: LocationType.CubeSpotOnPlayerSpeciesCard,
        player: PlayerColor.Salamander,
        parent: cardsWithIndexes[0].cardIndex
      }),
      PlayerColor.Salamander
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.to.have.property('player').which.eqls(PlayerColor.Owl)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })
})
