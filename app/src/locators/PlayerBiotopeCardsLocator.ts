import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class PlayerBiotopeCardsLocator extends ListLocator {
  gap = { y: 4.75 }
  maxCount = 4

  getCoordinates(_location: Location, _context: MaterialContext): Partial<Coordinates> {
    const playerBoardCoordinates = _context.locators[LocationType.EcosystemBoardSpot]?.getCoordinates(
      { type: LocationType.EcosystemBoardSpot, player: _location.player },
      _context
    )
    return { x: (playerBoardCoordinates?.x ?? 0) + 10, y: (playerBoardCoordinates?.y ?? 0) - 11.86 }
  }
}

export const playerBiotopeCardsLocator = new PlayerBiotopeCardsLocator()
