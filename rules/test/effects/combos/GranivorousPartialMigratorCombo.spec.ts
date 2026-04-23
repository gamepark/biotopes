import { describe, expect, test } from 'vitest'
import { setupGameAndGetColonizationRule } from '../utils/setupGameAndGetColonizationRule.util'
import { PlayerColor } from '../../../src/PlayerColor'
import { SpeciesCard } from '../../../src/material/SpeciesCard'
import { BiotopeType } from '../../../src/material/BiotopeType'
import { BiotopesRules } from '../../../src'
import { EcosystemActionType } from '../../../src/material/EcosystemActionType'
import { playAction } from '@gamepark/rules-api'
import { MaterialType } from '../../../src/material/MaterialType'
import { LocationType } from '../../../src/material/LocationType'
import { DrawCardsRule } from '../../../src/rules/actions/common/DrawCardsRule'
import { BiotopesPendingEffect } from '../../../src/material/effects/PendingEffect'
import { Memory } from '../../../src/Memory'
import { PendingEffectType } from '../../../src/material/effects/PendingEffectType'
import { BiotopeCard, getBiotopeCardType } from '../../../src/material/BiotopeCard'

describe('Cosmopolitan and Granivorous species combo tests', () => {
  test('Given an expansion on a meadow for a player having a partial migrator and a granivorous species, game should proceed to the DrawCard rule for the current player and allow to draw 1 card', () => {
    const { setup, game } = setupGameAndGetColonizationRule(
      [PlayerColor.Salamander, PlayerColor.Woodpecker],
      [
        { cardId: SpeciesCard.CommonLinnet, cubeBiotopeType: BiotopeType.Meadow },
        { cardId: SpeciesCard.EuropeanGoldfinch, cubeBiotopeType: BiotopeType.Meadow }
      ],
      EcosystemActionType.Expansion
    )
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Meadow,
      location: {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: PlayerColor.Owl,
        parent: setup
          .material(MaterialType.BiotopesCard)
          .player(PlayerColor.Owl)
          .id<BiotopeCard>((id) => getBiotopeCardType(id) === BiotopeType.Meadow)
          .getIndex()
      }
    })
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(2).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        id: EcosystemActionType.Expansion,
        player: PlayerColor.Salamander,
        x: 0
      }),
      PlayerColor.Salamander
    )

    // When
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Salamander).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: 1,
        y: 0
      }),
      PlayerColor.Salamander
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule).and.have.property('player').which.eql(PlayerColor.Salamander)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 }])
  })

  test('Given a migration to a meadow for a player having a partial migrator and a granivorous species, game should proceed to the DrawCard rule for the current player and allow to draw 2 cards', () => {
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Salamander, PlayerColor.Woodpecker],
      [
        { cardId: SpeciesCard.CommonLinnet, cubeBiotopeType: BiotopeType.Meadow },
        { cardId: SpeciesCard.EuropeanGoldfinch, cubeBiotopeType: BiotopeType.Meadow }
      ],
      EcosystemActionType.Migration
    )
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(1).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        id: EcosystemActionType.Migration,
        player: PlayerColor.Salamander,
        x: 0
      }),
      PlayerColor.Salamander
    )

    // When
    playAction(
      rules,
      rules
        .material(MaterialType.TerritoryToken)
        .id(PlayerColor.Salamander)
        .location((l) => l.type === LocationType.CentralLandscapeSpot && l.x === 0 && l.y === 1)
        .moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: 2,
          y: 0
        }),
      PlayerColor.Salamander
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule).and.have.property('player').which.eql(PlayerColor.Salamander)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 2 }])
  })
})
