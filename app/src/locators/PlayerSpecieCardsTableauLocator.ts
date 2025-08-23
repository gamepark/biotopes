import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class PlayerSpecieCardsTableauLocator extends ListLocator {
  gap = { x: 7 }

  getCoordinates(location: Location, context: MaterialContext): Partial<Coordinates> {
    const playerBoardCoordinates = context.locators[LocationType.EcosystemBoardSpot]?.getCoordinates(
      { type: LocationType.EcosystemBoardSpot, player: location.player },
      context
    )
    return { x: (playerBoardCoordinates?.x ?? 0) + 17, y: (playerBoardCoordinates?.y ?? 0) - 11.86 + (location.id ?? 1) * 4.75 }
  }
}

export const playerSpecieCardsTableauLocator = new PlayerSpecieCardsTableauLocator()
