import { BiotopesSetup } from '../../../src'
import { MaterialType } from '../../../src/material/MaterialType'
import { PlayerColor } from '../../../src/PlayerColor'
import { RuleId } from '../../../src/rules/RuleId'
import { LandscapeTile } from '../../../src/material/LandscapeTile'
import { LocationType } from '../../../src/material/LocationType'
import { KnownSpeciesCardId, SpeciesCard } from '../../../src/material/SpeciesCard'
import { BiotopeType } from '../../../src/material/BiotopeType'
import { ExpansionActionChooseCubeRule } from '../../../src/rules/actions/colonization/expansion/ExpansionActionChooseCubeRule'

export const setupGameAndGetExpansionRule = (cardId: SpeciesCard, cubeBiotopeType: BiotopeType) => {
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
    .id<KnownSpeciesCardId>((id) => id.front === cardId)
    .getIndex()
  setup.material(MaterialType.SpeciesCard).index(cardIndex).moveItem({
    type: LocationType.PlayerSpeciesCardTableauSpot,
    player: PlayerColor.Ibex
  })
  setup.material(MaterialType.Cube).createItem({
    id: cubeBiotopeType,
    location: {
      type: LocationType.CubeSpotOnPlayerSpeciesCard,
      player: PlayerColor.Ibex,
      parent: cardIndex
    }
  })
  return { setup, expansionRule: new ExpansionActionChooseCubeRule(game) }
}
