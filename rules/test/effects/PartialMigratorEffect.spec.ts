import { describe, expect, test } from 'vitest'
import { setupGameAndGetColonizationRule } from './utils/setupGameAndGetColonizationRule.util'
import { PlayerColor } from '../../src/PlayerColor'
import { SpeciesCard, SpeciesDietType } from '../../src/material/SpeciesCard'
import { BiotopeType } from '../../src/material/BiotopeType'
import { EcosystemActionType } from '../../src/material/EcosystemActionType'
import { MaterialType } from '../../src/material/MaterialType'
import { LocationType } from '../../src/material/LocationType'
import { BiotopesRules } from '../../src'
import { playAction } from '@gamepark/rules-api'
import { DrawCardsRule } from '../../src/rules/actions/common/DrawCardsRule'
import { BiotopesPendingEffect } from '../../src/material/effects/PendingEffect'
import { Memory } from '../../src/Memory'
import { PendingEffectType } from '../../src/material/effects/PendingEffectType'
import { ChooseActionRule } from '../../src/rules/ChooseActionRule'

describe('Partial migrator species tests', () => {
  test("After a migration with a Partial migrator species present in the player's tableau, game should proceed to the DrawCard rule for the current player", () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Fox, PlayerColor.Woodpecker],
      [{ cardId: SpeciesCard.CommonLinnet, cubeBiotopeType: BiotopeType.Meadow }],
      EcosystemActionType.Migration
    )
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(0).moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Migration, x: 0 }),
      PlayerColor.Fox
    )

    // When
    playAction(
      rules,
      rules
        .material(MaterialType.TerritoryToken)
        .id(PlayerColor.Fox)
        .location((l) => l.type === LocationType.CentralLandscapeSpot && l.x === 0 && l.y === 1)
        .moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: 1,
          y: -2
        }),
      PlayerColor.Fox
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule).and.have.property('player').which.eqls(PlayerColor.Fox)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 }])
  })

  test("After a migration with a Partial migrator species present in the player's tableau, and after player drew a card, game should proceed to the ChooseAction rule for the next player", () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Fox, PlayerColor.Woodpecker],
      [{ cardId: SpeciesCard.EuropeanGoldfinch, cubeBiotopeType: BiotopeType.Meadow }],
      EcosystemActionType.Migration
    )
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(0).moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Migration, x: 0 }),
      PlayerColor.Fox
    )
    playAction(
      rules,
      rules
        .material(MaterialType.TerritoryToken)
        .id(PlayerColor.Fox)
        .location((l) => l.type === LocationType.CentralLandscapeSpot && l.x === 0 && l.y === 1)
        .moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: 1,
          y: -2
        }),
      PlayerColor.Fox
    )

    // When
    playAction(
      rules,
      rules
        .material(MaterialType.SpeciesCard)
        .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Insectivore)
        .deck()
        .dealOne({
          type: LocationType.PlayerSpeciesCardHandSpot,
          player: PlayerColor.Fox
        }),
      PlayerColor.Fox
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').which.eqls(PlayerColor.Woodpecker)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })
})
