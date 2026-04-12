import {
  FillGapStrategy,
  hideFront,
  hideFrontToOthers,
  hideItemId,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { GameSetupPlaceTerritoryTokenRule } from './rules/GameSetupPlaceTerritoryTokenRule'
import { GameSetupHandMulliganRule } from './rules/GameSetupHandMulliganRule'
import { GameSetupRiverRule } from './rules/GameSetupRiverRule'
import { ChooseActionRule } from './rules/ChooseActionRule'
import { PrimaryProductionRule } from './rules/PrimaryProductionRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class BiotopesRules
  extends SecretMaterialRules<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  implements
    TimeLimit<
      MaterialGame<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
      MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
      PlayerColor
    >
{
  locationsStrategies = {
    [MaterialType.BiotopesCard]: {
      [LocationType.AdvancedBiotopesSelectionSpot]: new FillGapStrategy()
    },
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
      [LocationType.PlayerSpeciesCardHandSpot]: new PositiveSequenceStrategy(),
      // TODO : A new strategy will be needed when we will remove an item from the river
      [LocationType.HerbivoreRiverSpot]: new FillGapStrategy(),
      [LocationType.InsectivoreRiverSpot]: new FillGapStrategy(),
      [LocationType.CarnivoreRiverSpot]: new FillGapStrategy()
    },
    [MaterialType.TerritoryToken]: {
      [LocationType.TerritoryTokenSpotOnEcosystemBoard]: new FillGapStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.SpeciesCard]: {
      [LocationType.HerbivoreDeckSpot]: hideFront,
      [LocationType.InsectivoreDeckSpot]: hideFront,
      [LocationType.CarnivoreDeckSpot]: hideFront,
      [LocationType.PlayerSpeciesCardHandSpot]: hideFrontToOthers
    },
    [MaterialType.Cube]: {
      [LocationType.PlayerClothBagSpot]: hideItemId
    }
  }

  rules = {
    [RuleId.GameSetupHandMulligan]: GameSetupHandMulliganRule,
    [RuleId.GameSetupPlaceTerritoryTokens]: GameSetupPlaceTerritoryTokenRule,
    [RuleId.GameSetupRiver]: GameSetupRiverRule,
    [RuleId.PrimaryProduction]: PrimaryProductionRule,
    [RuleId.ChooseAction]: ChooseActionRule
  }

  giveTime(): number {
    return 60
  }

  public itemsCanMerge(type: MaterialType): boolean {
    if (type === MaterialType.TerritoryToken) {
      return false
    }
    return super.itemsCanMerge(type)
  }
}
