import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import { PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { BiotopeType } from '@gamepark/biotopes/material/BiotopeType.ts'

const baseCoordinates = {
  [BiotopeType.Mountain]: { x: -52.5, y: -10 },
  [BiotopeType.Forest]: { x: -47.5, y: -10 },
  [BiotopeType.Meadow]: { x: -42.5, y: -10 },
  [BiotopeType.Wetland]: { x: -37.5, y: -10 }
}

class CubeStockpileLocator extends PileLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  radius = 1
  maxAngle = 20
  limit = 100

  public getCoordinates(location: Location<PlayerColor, LocationType>): Partial<Coordinates> {
    return baseCoordinates[location.id as BiotopeType]
  }
}

export const cubeStockpileLocator = new CubeStockpileLocator()
