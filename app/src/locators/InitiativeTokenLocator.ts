import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class InitiativeTokenLocator extends Locator {
  getCoordinates(_location: Location, _context: MaterialContext): Partial<Coordinates> {
    const playerBoardCoordinates = _context.locators[LocationType.EcosystemBoardSpot]?.getCoordinates(
      { type: LocationType.EcosystemBoardSpot, player: _location.player },
      _context
    )
    const BoardY = playerBoardCoordinates?.y ?? 0
    return { x: (playerBoardCoordinates?.x ?? 0) - 10, y: BoardY + (BoardY > 0 ? -1 : 1) * 5 }
  }
}

export const initiativeTokenLocator = new InitiativeTokenLocator()
