import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import ConditionBoardButterfly from '../images/Boards/Environmental Conditions/ConditionBoardButterfly.jpg'
import ConditionBoardAnt from '../images/Boards/Environmental Conditions/ConditionBoardAnt.jpg'
import { EnvironmentalConditionsBoardSide } from '@gamepark/biotopes/EnvironmentalConditionsBoardSide'
import { MaterialItem } from '@gamepark/rules-api'
import { Memory } from '@gamepark/biotopes/Memory'

class EnvironmentalConditionsBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType> {
  height = 8.8
  width = 15
  images = {
    [EnvironmentalConditionsBoardSide.Butterfly]: ConditionBoardButterfly,
    [EnvironmentalConditionsBoardSide.Ant]: ConditionBoardAnt
  }

  getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<number, LocationType>[] {
    return [
      {
        id: _context.rules.remind(Memory.AntSide),
        location: { type: LocationType.EnvironmentalConditionsBoardSpot }
      }
    ]
  }
}

export const environmentalConditionsBoardDescription = new EnvironmentalConditionsBoardDescription()
