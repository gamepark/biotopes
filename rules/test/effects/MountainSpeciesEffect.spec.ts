import { describe, expect, test } from 'vitest'
import { setupGameAndGetColonizationRule } from './utils/setupGameAndGetColonizationRule.util'
import { SpeciesCard, SpeciesDietType } from '../../src/material/SpeciesCard'
import { BiotopeType } from '../../src/material/BiotopeType'
import { BiotopesRules } from '../../src'
import { playAction } from '@gamepark/rules-api'
import { MaterialType } from '../../src/material/MaterialType'
import { LocationType } from '../../src/material/LocationType'
import { PlayerColor } from '../../src/PlayerColor'
import { EcosystemActionType } from '../../src/material/EcosystemActionType'
import { DrawCardsRule } from '../../src/rules/actions/common/DrawCardsRule'
import { BiotopesPendingEffect } from '../../src/material/effects/PendingEffect'
import { Memory } from '../../src/Memory'
import { PendingEffectType } from '../../src/material/effects/PendingEffectType'
import { ChooseActionRule } from '../../src/rules/ChooseActionRule'
import { BiotopeCard, getBiotopeCardType } from '../../src/material/BiotopeCard'

describe('Mountain species tests', () => {
  test("After an expansion on a mountain with a Mountain species present in the payer's tableau, game should proceed to the DrawCard rule for the current player", () => {
    // Given
    const { setup, game } = setupGameAndGetColonizationRule(
      [PlayerColor.Owl, PlayerColor.Salamander],
      [{ cardId: SpeciesCard.WesternCapercaillie, cubeBiotopeType: BiotopeType.Mountain }],
      EcosystemActionType.Expansion
    )
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Mountain,
      location: {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: PlayerColor.Owl,
        parent: setup
          .material(MaterialType.BiotopesCard)
          .player(PlayerColor.Owl)
          .id<BiotopeCard>((id) => getBiotopeCardType(id) === BiotopeType.Mountain)
          .getIndex()
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
      PlayerColor.Owl
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Owl).location(LocationType.TerritoryTokenSpotOnEcosystemBoard).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: -2,
        y: 1
      }),
      PlayerColor.Owl
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule).and.have.property('player').which.eql(PlayerColor.Owl)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 }])
  })

  test("After an expansion action on a mountain with a Mountain species present in the player's tableau and player drew a card, game should proceed to the ChooseAction rule for the next player", () => {
    // Given
    const { setup, game } = setupGameAndGetColonizationRule(
      [PlayerColor.Owl, PlayerColor.Salamander],
      [{ cardId: SpeciesCard.WesternCapercaillie, cubeBiotopeType: BiotopeType.Mountain }],
      EcosystemActionType.Expansion
    )
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Mountain,
      location: {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: PlayerColor.Owl,
        parent: setup
          .material(MaterialType.BiotopesCard)
          .player(PlayerColor.Owl)
          .id<BiotopeCard>((id) => getBiotopeCardType(id) === BiotopeType.Mountain)
          .getIndex()
      }
    })
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(1).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        id: EcosystemActionType.Expansion,
        x: 0
      }),
      PlayerColor.Owl
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Owl).location(LocationType.TerritoryTokenSpotOnEcosystemBoard).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: -2,
        y: 1
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
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').eql(PlayerColor.Salamander)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })

  test("After a migration on a mountain with a Mountain species present in the payer's tableau, game should proceed to the DrawCard rule for the current player", () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Owl, PlayerColor.Salamander],
      [{ cardId: SpeciesCard.WesternCapercaillie, cubeBiotopeType: BiotopeType.Mountain }],
      EcosystemActionType.Migration
    )
    const rules = new BiotopesRules(game)

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(0).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        id: EcosystemActionType.Migration,
        x: 0
      }),
      PlayerColor.Owl
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
      PlayerColor.Owl
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule).and.have.property('player').which.eql(PlayerColor.Owl)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 }])
  })

  test("After a migration action to a mountain with a Mountain species present in the player's tableau and player drew a card, game should proceed to the ChooseAction rule for the next player", () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Owl, PlayerColor.Salamander],
      [{ cardId: SpeciesCard.WesternCapercaillie, cubeBiotopeType: BiotopeType.Mountain }],
      EcosystemActionType.Migration
    )
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(0).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        id: EcosystemActionType.Migration,
        x: 0
      }),
      PlayerColor.Owl
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
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').eql(PlayerColor.Salamander)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })
})
