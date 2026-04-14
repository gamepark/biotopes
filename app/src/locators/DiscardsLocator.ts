import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { decksLocator } from './DecksLocator.ts'

class DecksLocator extends DeckLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  maxCount = 40
  public getCoordinates(location: Location<PlayerColor, LocationType>, _context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const deckCoordinates = decksLocator.getCoordinates(location, _context)
    return { x: deckCoordinates.x! - 8, y: deckCoordinates.y }
  }
}

export const discardsLocator = new DecksLocator()