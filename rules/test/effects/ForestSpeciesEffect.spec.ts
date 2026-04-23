import { describe, expect, test } from 'vitest'
import { setupGameAndGetExpansionRule } from './utils/setupGameAndGetColonizationRule.util'
import { KnownSpeciesCardId, SpeciesCard, SpeciesDietType } from '../../src/material/SpeciesCard'
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
import { RuleId } from '../../src/rules/RuleId'

describe('Forest species tests', () => {
  test("After an expansion on a forest with a Forest species present in the payer's tableau, game should proceed to the DrawCard rule for the current player", () => {
    // Given
    const { expansionRule } = setupGameAndGetExpansionRule(SpeciesCard.StagBeetle, BiotopeType.Forest)
    const rules = new BiotopesRules(expansionRule.game)

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(0).player(PlayerColor.Ibex).moveItem({
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
        x: -1,
        y: 1
      }),
      PlayerColor.Ibex
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule).and.have.property('player').which.eql(PlayerColor.Ibex)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 }])
  })

  test("After an expansion action on a forest with a forest species present in the player's tableau and player drew a card, game should proceed to the ChooseAction rule for the next player", () => {
    // Given
    const { expansionRule } = setupGameAndGetExpansionRule(SpeciesCard.BrownRat, BiotopeType.Meadow)
    const rules = new BiotopesRules(expansionRule.game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(0).player(PlayerColor.Ibex).moveItem({
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
        x: -1,
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
          type: LocationType.PlayerSpeciesCardHandSpot,
          player: PlayerColor.Ibex
        }),
      PlayerColor.Ibex
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').eql(PlayerColor.Salamander)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })

  test("After a migration on a forest with a Forest species present in the payer's tableau, game should proceed to the DrawCard rule for the current player", () => {
    // Given
    const { setup, expansionRule } = setupGameAndGetExpansionRule(SpeciesCard.StagBeetle, BiotopeType.Forest)
    const migratorIndex = setup
      .material(MaterialType.SpeciesCard)
      .id<KnownSpeciesCardId>((id) => id.front === SpeciesCard.HazelDormouse)
      .moveItem({
        type: LocationType.PlayerSpeciesCardTableauSpot,
        player: PlayerColor.Ibex
      }).itemIndex
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Forest,
      location: {
        type: LocationType.CubeSpotOnPlayerSpeciesCard,
        player: PlayerColor.Ibex,
        parent: migratorIndex
      }
    })
    const game = expansionRule.game
    game.rule = {
      id: RuleId.MigrationActionChooseCube,
      player: PlayerColor.Ibex
    }
    const rules = new BiotopesRules(game)

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(1).player(PlayerColor.Ibex).moveItem({
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
        .location((l) => l.type === LocationType.CentralLandscapeSpot && l.x === -3 && l.y === -1)
        .moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: 0,
          y: 2
        }),
      PlayerColor.Ibex
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule).and.have.property('player').which.eql(PlayerColor.Ibex)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 }])
  })

  test("After a migration action to a forest with a forest species present in the player's tableau and player drew a card, game should proceed to the ChooseAction rule for the next player", () => {
    // Given
    const { setup, expansionRule } = setupGameAndGetExpansionRule(SpeciesCard.StagBeetle, BiotopeType.Forest)
    const migratorIndex = setup
      .material(MaterialType.SpeciesCard)
      .id<KnownSpeciesCardId>((id) => id.front === SpeciesCard.HazelDormouse)
      .moveItem({
        type: LocationType.PlayerSpeciesCardTableauSpot,
        player: PlayerColor.Ibex
      }).itemIndex
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Forest,
      location: {
        type: LocationType.CubeSpotOnPlayerSpeciesCard,
        player: PlayerColor.Ibex,
        parent: migratorIndex
      }
    })
    const game = expansionRule.game
    game.rule = {
      id: RuleId.MigrationActionChooseCube,
      player: PlayerColor.Ibex
    }
    const rules = new BiotopesRules(game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).index(1).player(PlayerColor.Ibex).moveItem({
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
        .location((l) => l.type === LocationType.CentralLandscapeSpot && l.x === -3 && l.y === -1)
        .moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: 0,
          y: 2
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
          type: LocationType.PlayerSpeciesCardHandSpot,
          player: PlayerColor.Ibex
        }),
      PlayerColor.Ibex
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(ChooseActionRule).and.have.property('player').eql(PlayerColor.Salamander)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(pendingEffects).to.be.undefined
  })
})
