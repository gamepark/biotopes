import { ListLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { environmentalConditionsBoardDescription } from '../material/EnvironmentalConditionsBoardDescription'

class CycleTokenLocator extends ListLocator {
  parentItemType = MaterialType.EnvironmentalConditionsBoard
  gap = { x: 2.18 }
  positionOnParent = { x: 11.5, y: 86 }

  getParentItem(): MaterialItem<PlayerColor> | undefined {
    return environmentalConditionsBoardDescription.staticItem
  }
}

export const cycleTokenLocator = new CycleTokenLocator()
