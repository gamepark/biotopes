import { ListLocator } from '@gamepark/react-game'
import { Coordinates } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { insectivoreDeckLocator } from './InsectivoreDeckLocator.ts'

class InsectivoreRiverLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  maxCount = 3
  gap = { x: 7.5 }
  getCoordinates(): Partial<Coordinates> {
    const baseCoordinates = insectivoreDeckLocator.coordinates
    return { x: baseCoordinates.x + 7.5, y: baseCoordinates.y }
  }
}

export const insectivoreRiverLocator = new InsectivoreRiverLocator()
