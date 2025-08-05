import { LandscapeTile } from '@gamepark/biotopes/material/LandscapeTile'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { HexagonalGridLocator, ItemContext } from '@gamepark/react-game'
import { HexGridSystem, MaterialItem } from '@gamepark/rules-api'

class CentralLandscapeSpotLocator extends HexagonalGridLocator {
  coordinatesSystem = HexGridSystem.Axial
  orientation = 'flat' as const
  size = 1.75

  getItemRotateZ(item: MaterialItem<PlayerColor, LocationType, LandscapeTile>, _context: ItemContext<PlayerColor, MaterialType, LocationType>): number {
    return item.location.rotation as number
  }
}

export const centralLandscapeSpotLocator = new CentralLandscapeSpotLocator()
