import { DropAreaDescription, ItemContext, MaterialContext, PileLocator } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType.ts'
import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { BiotopeType } from '@gamepark/biotopes/material/BiotopeType.ts'

const coordinatesByType = {
  [BiotopeType.Mountain]: { x: 22.5, y: 15 },
  [BiotopeType.Forest]: { x: 22.5, y: 37.5 },
  [BiotopeType.Meadow]: { x: 22.5, y: 60 },
  [BiotopeType.Wetland]: { x: 22.5, y: 82.5 }
}

class CubeOnBiotopeBoardLocator extends PileLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  parentItemType = MaterialType.BiotopeBoard
  minimumDistance = 0.75
  radius = { x: 0.75, y: 1 }
  locationDescription = new CubeOnBiotopeBoardDropAreaDescription()

  getPositionOnParent(
    location: Location<PlayerColor, LocationType, BiotopeType>,
    _context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): XYCoordinates {
    if (location.id !== undefined) {
      return coordinatesByType[location.id]
    }
    return super.getPositionOnParent(location, _context)
  }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): boolean {
    return item.location.player !== (context.rules.game.view ?? context.player ?? context.rules.players[0])
  }
}

class CubeOnBiotopeBoardDropAreaDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, BiotopeType, RuleId, PlayerColor> {
  width = 3
  height = 2
  borderRadius = 2
}

export const cubeOnBiotopeBoardLocator = new CubeOnBiotopeBoardLocator()
