import { LandscapeTile } from '@gamepark/biotopes/material/LandscapeTile'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { HexagonalGridLocator, ItemContext } from '@gamepark/react-game'
import { Coordinates, HexGridSystem, MaterialItem } from '@gamepark/rules-api'

class CentralLandscapeSpotLocator extends HexagonalGridLocator {
  coordinatesSystem = HexGridSystem.Axial
  size = { x: 1.75, y: 1.8 }

  getItemRotateZ(item: MaterialItem<PlayerColor, LocationType, LandscapeTile>, _context: ItemContext<PlayerColor, MaterialType, LocationType>): number {
    return item.location.rotation as number
  }

  getItemCoordinates(
    item: MaterialItem<PlayerColor, LocationType, LandscapeTile>,
    context: ItemContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    const c = super.getItemCoordinates(item, context)
    return { x: c.y!, y: c.x! }
  }
}

export const centralLandscapeSpotLocator = new CentralLandscapeSpotLocator()
