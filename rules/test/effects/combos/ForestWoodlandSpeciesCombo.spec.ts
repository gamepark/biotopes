import { describe, expect, test } from 'vitest'
import { setupGameAndGetColonizationRule } from '../utils/setupGameAndGetColonizationRule.util'
import { PlayerColor } from '../../../src/PlayerColor'
import { SpeciesCard } from '../../../src/material/SpeciesCard'
import { BiotopeType } from '../../../src/material/BiotopeType'
import { EcosystemActionType } from '../../../src/material/EcosystemActionType'
import { BiotopesRules } from '../../../src'
import { playAction } from '@gamepark/rules-api'
import { MaterialType } from '../../../src/material/MaterialType'
import { LocationType } from '../../../src/material/LocationType'
import { DrawCardsRule } from '../../../src/rules/actions/common/DrawCardsRule'
import { BiotopesPendingEffect } from '../../../src/material/effects/PendingEffect'
import { Memory } from '../../../src/Memory'
import { PendingEffectType } from '../../../src/material/effects/PendingEffectType'

describe('Forest and Woodland species tests', () => {
  test('After an expansion to a forest, game should proceed to the DrawCards rule for the current player with 1 card to draw and have a pending action to draw 1 cube', () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Fox, PlayerColor.Salamander],
      [
        { cardId: SpeciesCard.StagBeetle, cubeBiotopeType: BiotopeType.Forest },
        { cardId: SpeciesCard.GreenWoodpecker, cubeBiotopeType: BiotopeType.Forest }
      ],
      EcosystemActionType.Expansion
    )
    const rules = new BiotopesRules(game)

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(0).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        id: EcosystemActionType.Expansion,
        player: PlayerColor.Fox,
        x: 1
      }),
      PlayerColor.Fox
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Fox).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: -1,
        y: 1
      }),
      PlayerColor.Fox
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule).that.has.property('player').which.eqls(PlayerColor.Fox)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(2)
      .and.have.deep.ordered.members([
        { type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 },
        { type: PendingEffectType.DrawCubes, numberOfCubesToDraw: 1 }
      ])
  })

  test('After a migration to a forest, game should proceed to the DrawCards rule for the current player with 1 card to draw and have a pending action to draw 1 cube', () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Fox, PlayerColor.Salamander],
      [
        { cardId: SpeciesCard.StagBeetle, cubeBiotopeType: BiotopeType.Forest },
        { cardId: SpeciesCard.GreenWoodpecker, cubeBiotopeType: BiotopeType.Forest }
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
        player: PlayerColor.Fox,
        x: 1
      }),
      PlayerColor.Fox
    )
    playAction(
      rules,
      rules
        .material(MaterialType.TerritoryToken)
        .location((l) => l.type === LocationType.CentralLandscapeSpot && l.x === -3 && l.y === -1)
        .moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: 0,
          y: -2
        }),
      PlayerColor.Fox
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule).that.has.property('player').which.eqls(PlayerColor.Fox)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(2)
      .and.have.deep.ordered.members([
        { type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 },
        { type: PendingEffectType.DrawCubes, numberOfCubesToDraw: 1 }
      ])
  })
})
