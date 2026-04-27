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

describe('Aquatic species tests', () => {
  test("After an expansion on a wetlan with a Aquatic species present in the payer's tableau, game should proceed to the DrawCard rule for the current player", () => {
    // Given
    const { setup, game } = setupGameAndGetColonizationRule(
      [PlayerColor.Salamander, PlayerColor.Fox],
      [{ cardId: SpeciesCard.NorthernPintail, cubeBiotopeType: BiotopeType.Wetland }],
      EcosystemActionType.Expansion
    )
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Wetland,
      location: {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: PlayerColor.Salamander,
        id: BiotopeType.Wetland,
        parent: setup.material(MaterialType.BiotopeBoard).player(PlayerColor.Salamander).getIndex()
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
      PlayerColor.Salamander
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Salamander).location(LocationType.TerritoryTokenSpotOnEcosystemBoard).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: 1,
        y: 1
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

  test("After an expansion action on a wetlan with a Aquatic species present in the player's tableau and player drew a card, game should proceed to the ChooseAction rule for the next player", () => {
    // Given
    const { setup, game } = setupGameAndGetColonizationRule(
      [PlayerColor.Salamander, PlayerColor.Fox],
      [{ cardId: SpeciesCard.NorthernPintail, cubeBiotopeType: BiotopeType.Wetland }],
      EcosystemActionType.Expansion
    )
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Wetland,
      location: {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: PlayerColor.Salamander,
        id: BiotopeType.Wetland,
        parent: setup.material(MaterialType.BiotopeBoard).player(PlayerColor.Salamander).getIndex()
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
      PlayerColor.Salamander
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Salamander).location(LocationType.TerritoryTokenSpotOnEcosystemBoard).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: 1,
        y: 1
      }),
      PlayerColor.Salamander
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
          player: PlayerColor.Salamander
        }),
      PlayerColor.Salamander
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').eql(PlayerColor.Fox)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })

  test("After a migration on a wetlan with a Aquatic species present in the payer's tableau, game should proceed to the DrawCard rule for the current player", () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Salamander, PlayerColor.Fox],
      [{ cardId: SpeciesCard.NorthernPintail, cubeBiotopeType: BiotopeType.Wetland }],
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
      PlayerColor.Salamander
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

  test("After a migration action to a wetlan with a Aquatic species present in the player's tableau and player drew a card, game should proceed to the ChooseAction rule for the next player", () => {
    // Given
    const { game } = setupGameAndGetColonizationRule(
      [PlayerColor.Salamander, PlayerColor.Fox],
      [{ cardId: SpeciesCard.NorthernPintail, cubeBiotopeType: BiotopeType.Wetland }],
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
      PlayerColor.Salamander
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
      PlayerColor.Salamander
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
          player: PlayerColor.Salamander
        }),
      PlayerColor.Salamander
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').eql(PlayerColor.Fox)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })
})
