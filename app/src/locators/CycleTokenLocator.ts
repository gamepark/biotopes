import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { environmentalConditionsBoardDescription } from '../material/EnvironmentalConditionsBoardDescription'
import { Memory } from '@gamepark/biotopes/Memory'
import { EnvironmentalConditionsBoardSide } from '@gamepark/biotopes/EnvironmentalConditionsBoardSide'

class CycleTokenLocator extends ListLocator {
  parentItemType = MaterialType.EnvironmentalConditionsBoard
  gap = { x: 2.18 }

  getParentItem(_location: Location, context: MaterialContext): MaterialItem<PlayerColor> | undefined {
    return environmentalConditionsBoardDescription.getStaticItems(context)[0]
  }

  getPositionOnParent(_location: Location, context: MaterialContext) {
    return { x: context.rules.remind(Memory.AntSide) === EnvironmentalConditionsBoardSide.Ant ? 11.5 : 3.75, y: 86 }
  }
}

export const cycleTokenLocator = new CycleTokenLocator()
