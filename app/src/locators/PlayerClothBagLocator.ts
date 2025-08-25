import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class PlayerClothBagLocator extends Locator {
  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const playerBoardCoordinates = context.locators[LocationType.EcosystemBoardSpot]?.getCoordinates(
      { type: LocationType.EcosystemBoardSpot, player: location.player },
      context
    )
    const BoardY = playerBoardCoordinates?.y ?? 0
    return { x: (playerBoardCoordinates?.x ?? 0) - 12, y: BoardY + (BoardY > 0 ? 1 : -1) * 12 }
  }
}

export const playerClothBagLocator = new PlayerClothBagLocator()
