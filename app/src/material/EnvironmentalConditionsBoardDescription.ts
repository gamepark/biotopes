import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { BoardDescription } from '@gamepark/react-game'
import ConditionBoardAnt from '../images/Boards/Environmental Conditions/ConditionBoardAnt.jpg'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'

class EnvironmentalConditionsBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType, undefined, RuleId, PlayerColor> {
  height = 8.8
  width = 15
  image = ConditionBoardAnt
  staticItem = {
    id: undefined,
    location: { type: LocationType.EnvironmentalConditionsBoardSpot }
  }
}

export const environmentalConditionsBoardDescription = new EnvironmentalConditionsBoardDescription()
