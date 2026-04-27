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
import { DiscardCardToDrawCubeRule } from '../../src/rules/actions/common/DiscardCardToDrawCubeRule'
import { BiotopesPendingEffect } from '../../src/material/effects/PendingEffect'
import { Memory } from '../../src/Memory'
import { PendingEffectType } from '../../src/material/effects/PendingEffectType'
import { speciesCardCharacteristics } from '../../src/material/SpeciesCardCharacteristics'
import { ChooseActionRule } from '../../src/rules/ChooseActionRule'

describe('Rock species tests', () => {
  test('After an expansion on a mountain if the player has a Rock species, game should proceed to the DiscardCardToDrawCube rule for the current player and allow to draw 1 cube', () => {
    // Given
    const { setup, game } = setupGameAndGetColonizationRule(
      [PlayerColor.Ibex, PlayerColor.Fox],
      [{ cardId: SpeciesCard.RedbilledChough, cubeBiotopeType: BiotopeType.Mountain }],
      EcosystemActionType.Expansion
    )
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Mountain,
      location: {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: PlayerColor.Ibex,
        id: BiotopeType.Mountain,
        parent: setup.material(MaterialType.BiotopeBoard).player(PlayerColor.Ibex).getIndex()
      }
    })
    const rules = new BiotopesRules(game)

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(1).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        player: PlayerColor.Ibex,
        id: EcosystemActionType.Expansion,
        x: 0
      }),
      PlayerColor.Ibex
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Ibex).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: -2,
        y: 1
      }),
      PlayerColor.Ibex
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DiscardCardToDrawCubeRule).and.to.have.property('player').which.eqls(PlayerColor.Ibex)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCubes, numberOfCubesToDraw: 1 }])
  })

  test('After an expansion on a mountain if the player has a Rock species and player drew a cube, game should proceed to the ChooseAction rule for the next player', () => {
    // Given
    const { setup, game, cardsWithIndexes } = setupGameAndGetColonizationRule(
      [PlayerColor.Ibex, PlayerColor.Fox],
      [{ cardId: SpeciesCard.RedbilledChough, cubeBiotopeType: BiotopeType.Mountain }],
      EcosystemActionType.Expansion
    )
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Mountain,
      location: {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: PlayerColor.Ibex,
        parent: setup.material(MaterialType.BiotopeBoard).player(PlayerColor.Ibex).getIndex()
      }
    })
    setup
      .material(MaterialType.SpeciesCard)
      .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore)
      .id<KnownSpeciesCardId>((id) => speciesCardCharacteristics[id.front].biotope === BiotopeType.Mountain)
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
        player: PlayerColor.Ibex,
        id: EcosystemActionType.Expansion,
        x: 0
      }),
      PlayerColor.Ibex
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Ibex).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: -2,
        y: 1
      }),
      PlayerColor.Ibex
    )
    playAction(
      rules,
      rules
        .material(MaterialType.SpeciesCard)
        .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore)
        .deck()
        .dealOne({
          type: LocationType.SpeciesDiscardsSpot,
          y: SpeciesDietType.Herbivore
        }),
      PlayerColor.Ibex
    )

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).createItem({
        id: BiotopeType.Mountain,
        location: {
          type: LocationType.CubeSpotOnPlayerSpeciesCard,
          player: PlayerColor.Ibex,
          parent: cardsWithIndexes[0].cardIndex
        }
      }),
      PlayerColor.Ibex
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.to.have.property('player').which.eqls(PlayerColor.Fox)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })

  test('After a migration to a mountain if the player has a Rock species, game should proceed to the DiscardCardToDrawCube rule for the current player and allow to draw 1 cube', () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Ibex, PlayerColor.Fox],
      [
        { cardId: SpeciesCard.RedbilledChough, cubeBiotopeType: BiotopeType.Mountain },
        { cardId: SpeciesCard.EuropeanBeeEater, cubeBiotopeType: BiotopeType.Mountain }
      ],
      EcosystemActionType.Migration
    )
    const rules = new BiotopesRules(game)

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(1).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        player: PlayerColor.Ibex,
        id: EcosystemActionType.Migration,
        x: 0
      }),
      PlayerColor.Ibex
    )
    playAction(
      rules,
      rules
        .material(MaterialType.TerritoryToken)
        .location((l) => l.type === LocationType.CentralLandscapeSpot && l.x === -3 && l.y === -1)
        .moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: -1,
          y: 0
        }),
      PlayerColor.Ibex
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DiscardCardToDrawCubeRule).and.to.have.property('player').which.eqls(PlayerColor.Ibex)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCubes, numberOfCubesToDraw: 1 }])
  })

  test('After a migration to a mountain if the player has a Rock species and player drew a cube, game should proceed to the ChooseAction rule for the next player', () => {
    // Given
    const { setup, game, cardsWithIndexes } = setupGameAndGetColonizationRule(
      [PlayerColor.Ibex, PlayerColor.Fox],
      [
        { cardId: SpeciesCard.RedbilledChough, cubeBiotopeType: BiotopeType.Mountain },
        { cardId: SpeciesCard.EuropeanBeeEater, cubeBiotopeType: BiotopeType.Mountain }
      ],
      EcosystemActionType.Migration
    )
    setup
      .material(MaterialType.SpeciesCard)
      .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore)
      .id<KnownSpeciesCardId>((id) => speciesCardCharacteristics[id.front].biotope === BiotopeType.Mountain)
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
        player: PlayerColor.Ibex,
        id: EcosystemActionType.Migration,
        x: 0
      }),
      PlayerColor.Ibex
    )
    playAction(
      rules,
      rules
        .material(MaterialType.TerritoryToken)
        .location((l) => l.type === LocationType.CentralLandscapeSpot && l.x === -3 && l.y === -1)
        .moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: -1,
          y: 0
        }),
      PlayerColor.Ibex
    )
    playAction(
      rules,
      rules
        .material(MaterialType.SpeciesCard)
        .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore)
        .deck()
        .dealOne({
          type: LocationType.SpeciesDiscardsSpot,
          y: SpeciesDietType.Herbivore
        }),
      PlayerColor.Ibex
    )

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).createItem({
        id: BiotopeType.Mountain,
        location: {
          type: LocationType.CubeSpotOnPlayerSpeciesCard,
          player: PlayerColor.Ibex,
          parent: cardsWithIndexes[0].cardIndex
        }
      }),
      PlayerColor.Ibex
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.to.have.property('player').which.eqls(PlayerColor.Fox)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })
})
