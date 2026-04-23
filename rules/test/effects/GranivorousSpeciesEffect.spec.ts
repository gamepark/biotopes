import { describe, expect, test } from 'vitest'
import { setupGameAndGetColonizationRule } from './utils/setupGameAndGetColonizationRule.util'
import { PlayerColor } from '../../src/PlayerColor'
import { SpeciesCard, SpeciesDietType } from '../../src/material/SpeciesCard'
import { BiotopeType } from '../../src/material/BiotopeType'
import { EcosystemActionType } from '../../src/material/EcosystemActionType'
import { MaterialType } from '../../src/material/MaterialType'
import { LocationType } from '../../src/material/LocationType'
import { BiotopeCard, getBiotopeCardType } from '../../src/material/BiotopeCard'
import { BiotopesRules } from '../../src'
import { playAction } from '@gamepark/rules-api'
import { DrawCardsRule } from '../../src/rules/actions/common/DrawCardsRule'
import { BiotopesPendingEffect } from '../../src/material/effects/PendingEffect'
import { Memory } from '../../src/Memory'
import { PendingEffectType } from '../../src/material/effects/PendingEffectType'
import { ChooseActionRule } from '../../src/rules/ChooseActionRule'

describe('Granivorous species tests', () => {
  test("After an expansion on a meadow with a Granivorous species present in the player's tableau, game should proceed to the DrawCard rule for the current player", () => {
    // Given
    const { setup, game } = setupGameAndGetColonizationRule(
      [PlayerColor.Owl, PlayerColor.Ibex],
      [{ cardId: SpeciesCard.EuropeanGoldfinch, cubeBiotopeType: BiotopeType.Meadow }],
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
      rules.material(MaterialType.Cube).index(1).moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Expansion, x: 0 }),
      PlayerColor.Owl
    )

    // When
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Owl).location(LocationType.TerritoryTokenSpotOnEcosystemBoard).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: 1,
        y: 0
      }),
      PlayerColor.Owl
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule).and.have.property('player').which.eqls(PlayerColor.Owl)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 }])
  })

  test("After an expansion on a meadow with a Granivorous species present in the player's tableau, and after player drew a card, game should proceed to the ChooseAction rule for the next player", () => {
    // Given
    const { setup, game } = setupGameAndGetColonizationRule(
      [PlayerColor.Owl, PlayerColor.Ibex],
      [{ cardId: SpeciesCard.EuropeanGoldfinch, cubeBiotopeType: BiotopeType.Meadow }],
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
      rules.material(MaterialType.Cube).index(1).moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Expansion, x: 0 }),
      PlayerColor.Owl
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Owl).location(LocationType.TerritoryTokenSpotOnEcosystemBoard).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: 1,
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
          type: LocationType.PlayerSpeciesCardHandSpot,
          player: PlayerColor.Owl
        }),
      PlayerColor.Owl
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').which.eqls(PlayerColor.Ibex)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })

  test("After a migration to a meadow with a Granivorous species present in the player's tableau, game should proceed to the DrawCard rule for the current player", () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Owl, PlayerColor.Ibex],
      [{ cardId: SpeciesCard.EuropeanGoldfinch, cubeBiotopeType: BiotopeType.Meadow }],
      EcosystemActionType.Migration
    )
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(0).moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Migration, x: 0 }),
      PlayerColor.Owl
    )

    // When
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Owl).location(LocationType.TerritoryTokenSpotOnEcosystemBoard).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: 1,
        y: 0
      }),
      PlayerColor.Owl
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule).and.have.property('player').which.eqls(PlayerColor.Owl)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 }])
  })

  test("After a migration to a meadow with a Granivorous species present in the player's tableau and player drew a card, game should proceed to the ChooseAction rule for the next player", () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Owl, PlayerColor.Ibex],
      [{ cardId: SpeciesCard.EuropeanGoldfinch, cubeBiotopeType: BiotopeType.Meadow }],
      EcosystemActionType.Migration
    )
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(0).moveItem({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Migration, x: 0 }),
      PlayerColor.Owl
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Owl).location(LocationType.TerritoryTokenSpotOnEcosystemBoard).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: 1,
        y: 0
      }),
      PlayerColor.Owl
    )

    // When
    playAction(
      rules,
      rules
        .material(MaterialType.SpeciesCard)
        .location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore)
        .deck()
        .dealOne({
          type: LocationType.PlayerSpeciesCardHandSpot,
          player: PlayerColor.Owl
        }),
      PlayerColor.Owl
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').which.eqls(PlayerColor.Ibex)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })
})
