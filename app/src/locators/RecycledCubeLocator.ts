import { CubeType } from '@gamepark/biotopes/material/CubeType.ts'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { RuleId } from '@gamepark/biotopes/rules/RuleId'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class RecycledCubeLocator extends ListLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  maxCount = 3
  gap = { x: 1 }

  public getCoordinates(_location: Location<PlayerColor, LocationType, CubeType>, _context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): Partial<Coordinates> {
    switch (_location.id) {
      case CubeType.Plant:
        return { x: -10, y: 0 }
      case CubeType.Insect:
        return { x: -5, y: 0 }
      case CubeType.Mammal:
        return { x: 0, y: 0 }
      case CubeType.Bird:
        return { x: 5, y: 0 }
      case CubeType.AmphibianReptile:
        return { x: 10, y: 0 }
      default:
        throw new Error('Cannot place item  without location.id')
    }
  }
}

export const recycledCubeLocator = new RecycledCubeLocator()
