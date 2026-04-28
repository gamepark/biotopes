import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import { DropAreaDescription, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { BiotopeType } from '@gamepark/biotopes/material/BiotopeType.ts'

const baseCoordinates = {
  [BiotopeType.Mountain]: { x: -52.5, y: -10 },
  [BiotopeType.Forest]: { x: -47.5, y: -10 },
  [BiotopeType.Meadow]: { x: -42.5, y: -10 },
  [BiotopeType.Wetland]: { x: -37.5, y: -10 }
}

class CubeStockpileLocator extends PileLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  radius = { x: 1.5, y: 2 }
  maxAngle = 20
  limit = 100
  locationDescription = new CubeStockPileDropAreaDescription()

  public getCoordinates(location: Location<PlayerColor, LocationType>): Partial<Coordinates> {
    return baseCoordinates[location.id as BiotopeType]
  }
}

class CubeStockPileDropAreaDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, BiotopeType, RuleId, PlayerColor> {
  width = 3
  height = 4
  borderRadius = 2.5
}

export const cubeStockpileLocator = new CubeStockpileLocator()
