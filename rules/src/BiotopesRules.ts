import { FillGapStrategy, MaterialGame, MaterialMove, MaterialRules, PositiveSequenceStrategy, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { TheFirstStepRule } from './rules/TheFirstStepRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class BiotopesRules
  extends MaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  locationsStrategies = {
    [MaterialType.EnvironmentalConditionToken]: {
      [LocationType.EnvironmentalConditionTokenSpotOnEnviromnentalConditionsBoard]: new PositiveSequenceStrategy()
    },
    [MaterialType.BiotopesCard]: {
      [LocationType.AdvancedBiotopesSelectionSpot]: new FillGapStrategy(),
      [LocationType.HerbivoreDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.InsectivoreDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.CarnivoreDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.HerbivoreDiscardSpot]: new PositiveSequenceStrategy(),
      [LocationType.InsectivoreDiscardSpot]: new PositiveSequenceStrategy(),
      [LocationType.CarnivoreDiscardSpot]: new PositiveSequenceStrategy()
    }
  }

  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule
  }

  giveTime(): number {
    return 60
  }
}
