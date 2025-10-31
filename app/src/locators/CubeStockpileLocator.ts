import { MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/biotopes/material/LocationType'

class CubeStockpileLocator extends PileLocator {
  radius = 1
  maxAngle = 20
  limit = 10
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const environmentalConditionsBoardCoordinates = context.locators[LocationType.EnvironmentalConditionsBoardSpot]?.getCoordinates(
      { type: LocationType.EnvironmentalConditionsBoardSpot, player: location.player },
      context
    )
    return { x: (environmentalConditionsBoardCoordinates?.x ?? 0) - 10 + (location.id ?? 1) * 4, y: (environmentalConditionsBoardCoordinates?.y ?? 0) - 8 }
  }
}

export const cubeStockpileLocator = new CubeStockpileLocator()
