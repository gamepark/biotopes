import { DeckLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { carnivoreDeckLocator } from './CarnivoreDeckLocator.ts'

class CarnivoreDiscardLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  maxCount = 10
  getCoordinates(): Partial<Coordinates> {
    const deckCoordinates = carnivoreDeckLocator.coordinates
    return { x: deckCoordinates.x - 8, y: deckCoordinates.y }
  }
}

export const carnivoreDiscardLocator = new CarnivoreDiscardLocator()
