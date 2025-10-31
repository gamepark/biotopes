import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class PlayerClothBagLocator extends Locator {
  getRotateZ(location: Location, context: MaterialContext): number {
    const playerBoardCoordinates = context.locators[LocationType.EcosystemBoardSpot]?.getCoordinates(
      { type: LocationType.EcosystemBoardSpot, player: location.player },
      context
    )
    return (playerBoardCoordinates?.y ?? 0) > 0 ? 0 : 180
  }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const playerBoardCoordinates = context.locators[LocationType.EcosystemBoardSpot]?.getCoordinates(
      { type: LocationType.EcosystemBoardSpot, player: location.player },
      context
    )
    const BoardY = playerBoardCoordinates?.y ?? 0
    return { x: (playerBoardCoordinates?.x ?? 0) - 12, y: BoardY + (BoardY > 0 ? 1 : -1) * 10 }
  }
}

export const playerClothBagLocator = new PlayerClothBagLocator()
