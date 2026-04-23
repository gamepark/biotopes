import { describe, expect, test } from 'vitest'
import { PlayerColor } from '../../src/PlayerColor'
import { MaterialType } from '../../src/material/MaterialType'
import { SpeciesCard } from '../../src/material/SpeciesCard'
import { LocationType } from '../../src/material/LocationType'
import { BiotopeType } from '../../src/material/BiotopeType'
import { ItemMoveType, MoveKind } from '@gamepark/rules-api'
import { EcosystemActionType } from '../../src/material/EcosystemActionType'
import { setupGameAndGetExpansionRule } from './utils/setupGameAndGetColonizationRule.util'

describe('Pollinating species tests', () => {
  test('Given no cubes on the expansion spot, cubes on a pollinating species card can move to both of the spots', () => {
    // Given
    const { expansionRule } = setupGameAndGetExpansionRule(SpeciesCard.MammothWasp, BiotopeType.Forest)

    // When
    const legalMoves = expansionRule.getPlayerMoves()

    // Then
    expect(legalMoves)
      .to.be.an('array')
      .that.has.length(2)
      .and.has.deep.members([
        {
          kind: MoveKind.ItemMove,
          type: ItemMoveType.Move,
          itemIndex: 0,
          itemType: MaterialType.Cube,
          location: {
            type: LocationType.CubeSpotOnEcosystemBoard,
            id: EcosystemActionType.Expansion,
            player: PlayerColor.Ibex,
            x: 0
          }
        },
        {
          kind: MoveKind.ItemMove,
          type: ItemMoveType.Move,
          itemIndex: 0,
          itemType: MaterialType.Cube,
          location: {
            type: LocationType.CubeSpotOnEcosystemBoard,
            id: EcosystemActionType.Expansion,
            player: PlayerColor.Ibex,
            x: 1
          }
        }
      ])
  })

  test('Given a cube on the insect expansion spot, cubes on a pollinating species card can move to the plant spot', () => {
    //  Given
    const { setup, expansionRule } = setupGameAndGetExpansionRule(SpeciesCard.MammothWasp, BiotopeType.Forest)
    setup.material(MaterialType.Cube).createItem({
      id: BiotopeType.Wetland,
      location: { type: LocationType.CubeSpotOnEcosystemBoard, player: PlayerColor.Ibex, id: EcosystemActionType.Expansion, x: 1 }
    })

    // When
    const legalMoves = expansionRule.getPlayerMoves()

    // Then
    expect(legalMoves).to.be.an('array').that.has.length(1)
    expect(legalMoves[0]).to.eql({
      kind: MoveKind.ItemMove,
      type: ItemMoveType.Move,
      itemIndex: 0,
      itemType: MaterialType.Cube,
      location: {
        type: LocationType.CubeSpotOnEcosystemBoard,
        id: EcosystemActionType.Expansion,
        player: PlayerColor.Ibex,
        x: 0
      }
    })
  })
})
