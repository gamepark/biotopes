import { DeckLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { herbivoreDeckLocator } from './HerbivoreDeckLocator.ts'

class HerbivoreDiscardLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  maxCount = 10
  getCoordinates(): Partial<Coordinates> {
    const baseCoordinates = herbivoreDeckLocator.coordinates
    return { x: baseCoordinates.x - 8, y: baseCoordinates.y }
  }
}

export const herbivoreDiscardLocator = new HerbivoreDiscardLocator()
