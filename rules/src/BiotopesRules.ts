import { FillGapStrategy, HiddenMaterialRules, hideFront, MaterialGame, MaterialMove, PositiveSequenceStrategy, TimeLimit } from '@gamepark/rules-api'
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
  extends HiddenMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  locationsStrategies = {
    [MaterialType.EnvironmentalConditionToken]: {
      [LocationType.EnvironmentalConditionTokenSpotOnEnviromnentalConditionsBoard]: new PositiveSequenceStrategy()
    },
    [MaterialType.SpeciesCard]: {
      [LocationType.HerbivoreDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.InsectivoreDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.CarnivoreDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.HerbivoreDiscardSpot]: new PositiveSequenceStrategy(),
      [LocationType.InsectivoreDiscardSpot]: new PositiveSequenceStrategy(),
      [LocationType.CarnivoreDiscardSpot]: new PositiveSequenceStrategy(),
      [LocationType.PlayerSpeciesCardTableauSpot]: new PositiveSequenceStrategy(),
      // TODO : A new strategy will be needed when we will remove an item from the river
      [LocationType.HerbivoreRiverSpot]: new FillGapStrategy(),
      [LocationType.InsectivoreRiverSpot]: new FillGapStrategy(),
      [LocationType.CarnivoreRiverSpot]: new FillGapStrategy()
    },
    [MaterialType.BiotopesCard]: {
      [LocationType.AdvancedBiotopesSelectionSpot]: new FillGapStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.SpeciesCard]: {
      [LocationType.HerbivoreDeckSpot]: hideFront,
      [LocationType.InsectivoreDeckSpot]: hideFront,
      [LocationType.CarnivoreDeckSpot]: hideFront
    }
  }

  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule
  }

  giveTime(): number {
    return 60
  }
}
