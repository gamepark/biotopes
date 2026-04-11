import { Locator } from '@gamepark/react-game'
import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'

class EnvironmentalConditionsBoardLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: -45, y: -17.5 }
}

export const environmentalConditionsBoardLocator = new EnvironmentalConditionsBoardLocator()
