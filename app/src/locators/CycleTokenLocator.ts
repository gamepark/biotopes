import { Locator, MaterialContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { environmentalConditionsBoardDescription } from '../material/EnvironmentalConditionsBoardDescription'
import { Memory } from '@gamepark/biotopes/Memory'
import { EnvironmentalConditionsBoardSide } from '@gamepark/biotopes/EnvironmentalConditionsBoardSide'

class CycleTokenLocator extends Locator {
  parentItemType = MaterialType.EnvironmentalConditionsBoard

  getParentItem(_location: Location, context: MaterialContext): MaterialItem<PlayerColor> | undefined {
    return environmentalConditionsBoardDescription.getStaticItems(context)[0]
  }

  getPositionOnParent(location: Location, context: MaterialContext) {
    return { x: (context.rules.remind(Memory.AntSide) === EnvironmentalConditionsBoardSide.Ant ? 11.5 : 3.75) + (location.x ?? 1) * 14.5, y: 86 }
  }
}

export const cycleTokenLocator = new CycleTokenLocator()
