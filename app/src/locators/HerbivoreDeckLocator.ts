import { DeckLocator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'

class HerbivoreDeckLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  maxCount = 30
  coordinates = { x: -22.5, y: -20 }
}

export const herbivoreDeckLocator = new HerbivoreDeckLocator()
