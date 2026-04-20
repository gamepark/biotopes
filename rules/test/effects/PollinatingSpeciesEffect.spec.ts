import { describe, expect, test } from 'vitest'
import { BiotopesSetup } from '../../src'
import { PlayerColor } from '../../src/PlayerColor'
import { RuleId } from '../../src/rules/RuleId'
import { MaterialType } from '../../src/material/MaterialType'
import { KnownSpeciesCardId, SpeciesCard } from '../../src/material/SpeciesCard'
import { LocationType } from '../../src/material/LocationType'
import { BiotopeType } from '../../src/material/BiotopeType'
import { ExpansionActionChooseCubeRule } from '../../src/rules/actions/colonization/expansion/ExpansionActionChooseCubeRule'
import { ItemMoveType, MoveKind } from '@gamepark/rules-api'
import { EcosystemActionType } from '../../src/material/EcosystemActionType'
import { LandscapeTile } from '../../src/material/LandscapeTile'

const setupGameAndGetExpansionRule = () => {
  const setup = new BiotopesSetup()
  const game = setup.setup({
    advancedBiotopes: false,
    players: [{ id: PlayerColor.Ibex }, { id: PlayerColor.Salamander }]
  })
  game.rule = {
    id: RuleId.ExpansionChooseCube,
    player: PlayerColor.Ibex
  }
  setup.material(MaterialType.LandscapeTile).deleteItemsAtOnce()
  setup.material(MaterialType.LandscapeTile).createItemsAtOnce([
    {
      id: LandscapeTile.A4,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: -2,
        y: -1,
        rotation: 5
      }
    },
    {
      id: LandscapeTile.B6,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: 1,
        y: -2,
        rotation: 5
      }
    },
    {
      id: LandscapeTile.B5,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: -1,
        y: 1
      }
    },
    {
      id: LandscapeTile.A10,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: 2,
        y: 0,
        rotation: 3
      }
    }
  ])
  setup.material(MaterialType.TerritoryToken).createItemsAtOnce([
    {
      id: PlayerColor.Ibex,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: -3,
        y: -1
      }
    },
    {
      id: PlayerColor.Ibex,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: -2,
        y: 0
      }
    },
    {
      id: PlayerColor.Ibex,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: -2,
        y: 2
      }
    },
    {
      id: PlayerColor.Ibex,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: 0,
        y: 1
      }
    },
    {
      id: PlayerColor.Salamander,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: -1,
        y: -2
      }
    },
    {
      id: PlayerColor.Salamander,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: 2,
        y: -2
      }
    },
    {
      id: PlayerColor.Salamander,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: 3,
        y: -1
      }
    },
    {
      id: PlayerColor.Salamander,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: 2,
        y: 1
      }
    }
  ])
  const cardIndex = setup
    .material(MaterialType.SpeciesCard)
    .id<KnownSpeciesCardId>((id) => id.front === SpeciesCard.MammothWasp)
    .getIndex()
  setup.material(MaterialType.SpeciesCard).index(cardIndex).moveItem({
    type: LocationType.PlayerSpeciesCardTableauSpot,
    player: PlayerColor.Ibex
  })
  setup.material(MaterialType.Cube).createItem({
    id: BiotopeType.Forest,
    location: {
      type: LocationType.CubeSpotOnPlayerSpeciesCard,
      player: PlayerColor.Ibex,
      parent: cardIndex
    }
  })
  return { setup, expansionRule: new ExpansionActionChooseCubeRule(game) }
}
describe('Pollinating species tests', () => {
  test('Given no cubes on the expansion spot, cubes on a pollinating species card can move to both of the spots', () => {
    // Given
    const { expansionRule } = setupGameAndGetExpansionRule()

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
    const { setup, expansionRule } = setupGameAndGetExpansionRule()
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
