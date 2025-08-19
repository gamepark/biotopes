import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { environmentalConditionsBoardDescription } from '../material/EnvironmentalConditionsBoardDescription'

class EnvironmentalConditionsTokenLocator extends ListLocator {
  parentItemType = MaterialType.EnvironmentalConditionsBoard
  gap = { x: 2.73 }

  getParentItem(_location: Location, context: MaterialContext): MaterialItem<PlayerColor> | undefined {
    return environmentalConditionsBoardDescription.getStaticItems(context)[0]
  }

  getPositionOnParent(_location: Location, _context: MaterialContext) {
    return { x: 11.5, y: 25.5 }
  }
}

export const environmentalConditionsTokenLocator = new EnvironmentalConditionsTokenLocator()
