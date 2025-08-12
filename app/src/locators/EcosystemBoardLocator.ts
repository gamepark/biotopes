import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'

class EcosystemBoardLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  getCoordinates(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const coord = [
      { x: 0, y: 20 },
      { x: 0, y: -20 }
    ]
    return coord[index]
  }
}

export const ecosystemBoardLocator = new EcosystemBoardLocator()
