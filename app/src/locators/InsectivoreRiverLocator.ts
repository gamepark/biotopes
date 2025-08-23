import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { centralLandscapeLocator } from './CentralLandscapeLocator'

class InsectivoreRiverLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  maxCount = 3
  gap = { x: -8 }
  getCoordinates(_location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const landscapeSize = centralLandscapeLocator.getLandscapeSize(context.rules.game)
    return { x: landscapeSize.width / 2 + 40, y: 0 }
  }
}

export const insectivoreRiverLocator = new InsectivoreRiverLocator()
