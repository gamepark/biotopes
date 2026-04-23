import { describe, expect, test } from 'vitest'
import { setupGameAndGetExpansionRule } from './utils/setupGameAndGetColonizationRule.util'
import { KnownSpeciesCardId, SpeciesCard, SpeciesDietType } from '../../src/material/SpeciesCard'
import { BiotopeType } from '../../src/material/BiotopeType'
import { BiotopesRules } from '../../src'
import { playAction } from '@gamepark/rules-api'
import { MaterialType } from '../../src/material/MaterialType'
import { PlayerColor } from '../../src/PlayerColor'
import { LocationType } from '../../src/material/LocationType'
import { DrawCardsRule } from '../../src/rules/actions/common/DrawCardsRule'
import { BiotopesPendingEffect } from '../../src/material/effects/PendingEffect'
import { Memory } from '../../src/Memory'
import { PendingEffectType } from '../../src/material/effects/PendingEffectType'
import { EcosystemActionType } from '../../src/material/EcosystemActionType'
import { RuleId } from '../../src/rules/RuleId'
import { ChooseActionRule } from '../../src/rules/ChooseActionRule'

describe('Cosmopolitan Species tests', () => {
  test("After an expansion action with a cosmopolitan species present in the player's tableau, game should proceed to the DrawCard rule for the current player", () => {
    // Given
    const { expansionRule } = setupGameAndGetExpansionRule(SpeciesCard.BrownRat, BiotopeType.Meadow)
    const rules = new BiotopesRules(expansionRule.game)

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).location(LocationType.CubeSpotOnPlayerSpeciesCard).player(PlayerColor.Ibex).moveItem({
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
        x: 1,
        y: 0
      }),
      PlayerColor.Ibex
    )

    // Then
    expect(rules.rulesStep).to.be.instanceof(DrawCardsRule).and.have.property('player').eql(PlayerColor.Ibex)
    const pendingEffects = rules.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)
    expect(pendingEffects)
      .to.be.an('array')
      .that.has.length(1)
      .and.has.deep.members([{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 }])
  })

  test("After an expansion action with a cosmopolitan species present in the player's tableau and player drew a card, game should proceed to the ChooseAction rule for the next player", () => {
    // Given
    const { expansionRule } = setupGameAndGetExpansionRule(SpeciesCard.BrownRat, BiotopeType.Meadow)
    const rules = new BiotopesRules(expansionRule.game)
    playAction(
      rules,
      rules.material(MaterialType.Cube).location(LocationType.CubeSpotOnPlayerSpeciesCard).player(PlayerColor.Ibex).moveItem({
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
        x: 1,
        y: 0
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

  test('Cosmopolitan species should not trigger on a migration action', () => {
    // Given
    const { setup, expansionRule } = setupGameAndGetExpansionRule(SpeciesCard.BrownRat, BiotopeType.Meadow)
    const game = expansionRule.game
    const migratorIndex = setup
      .material(MaterialType.SpeciesCard)
      .id<KnownSpeciesCardId>((id) => id.front === SpeciesCard.MountainHare)
      .moveItem({
        type: LocationType.PlayerSpeciesCardTableauSpot,
        player: PlayerColor.Ibex
      }).itemIndex
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Mountain,
      location: {
        type: LocationType.CubeSpotOnPlayerSpeciesCard,
        player: PlayerColor.Ibex,
        parent: migratorIndex
      }
    })
    game.rule = {
      id: RuleId.MigrationActionChooseCube,
      player: PlayerColor.Ibex
    }
    const rules = new BiotopesRules(game)

    // When
    playAction(
      rules,
      rules.material(MaterialType.Cube).location(LocationType.CubeSpotOnPlayerSpeciesCard).player(PlayerColor.Ibex).id(BiotopeType.Mountain).moveItem({
        type: LocationType.CubeSpotOnEcosystemBoard,
        id: EcosystemActionType.Migration,
        x: 0
      }),
      PlayerColor.Ibex
    )
    playAction(
      rules,
      rules.material(MaterialType.TerritoryToken).player(PlayerColor.Ibex).location(LocationType.TerritoryTokenSpotOnEcosystemBoard).moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: 1,
        y: 0
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
