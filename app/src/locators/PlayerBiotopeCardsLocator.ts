import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class PlayerBiotopeCardsLocator extends ListLocator {
  gap = { y: 4.75 }
  maxCount = 4

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const playerBoardCoordinates = context.locators[LocationType.EcosystemBoardSpot]?.getCoordinates(
      { type: LocationType.EcosystemBoardSpot, player: location.player },
      context
    )
    return { x: (playerBoardCoordinates?.x ?? 0) + 10, y: (playerBoardCoordinates?.y ?? 0) - 11.86 + (location.id ?? 1) * 4.75 }
  }
}

export const playerBiotopeCardsLocator = new PlayerBiotopeCardsLocator()
