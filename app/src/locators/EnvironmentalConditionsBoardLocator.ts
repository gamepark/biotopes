import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { centralLandscapeLocator } from './CentralLandscapeLocator'

class EnvironmentalConditionsBoardLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  getCoordinates(_location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const landscapeSize = centralLandscapeLocator.getLandscapeSize(context.rules.game)
    return { x: -(landscapeSize.width / 2 + 15), y: 5 }
  }
}

export const environmentalConditionsBoardLocator = new EnvironmentalConditionsBoardLocator()
