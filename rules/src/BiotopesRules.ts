import {
  FillGapStrategy,
  hideFront,
  hideFrontToOthers,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { AdaptationActionRule } from './rules/actions/adaptation/AdaptationActionRule'
import { ExpansionActionChooseCubeRule } from './rules/actions/colonization/expansion/ExpansionActionChooseCubeRule'
import { ExpansionActionPlaceTerritoryTokenOnForestRule } from './rules/actions/colonization/expansion/ExpansionActionPlaceTerritoryTokenOnForestRule'
import { ExpansionActionPlaceTerritoryTokenOnMeadowRule } from './rules/actions/colonization/expansion/ExpansionActionPlaceTerritoryTokenOnMeadowRule'
import { ExpansionActionPlaceTerritoryTokenOnMountainRule } from './rules/actions/colonization/expansion/ExpansionActionPlaceTerritoryTokenOnMountainRule'
import { ExpansionActionPlaceTerritoryTokenOnWetlandRule } from './rules/actions/colonization/expansion/ExpansionActionPlaceTerritoryTokenOnWetlandRule'
import { MigrationActionChooseCubeRule } from './rules/actions/colonization/migration/MigrationActionChooseCubeRule'
import { MigrationActionMoveTerritoryTokenOnForestRule } from './rules/actions/colonization/migration/MigrationActionMoveTerritoryTokenOnForestRule'
import { MigrationActionMoveTerritoryTokenOnMeadowRule } from './rules/actions/colonization/migration/MigrationActionMoveTerritoryTokenOnMeadowRule'
import { MigrationActionMoveTerritoryTokenOnMountainRule } from './rules/actions/colonization/migration/MigrationActionMoveTerritoryTokenOnMountainRule'
import { MigrationActionMoveTerritoryTokenOnWetlandRule } from './rules/actions/colonization/migration/MigrationActionMoveTerritoryTokenOnWetlandRule'
import { EvolutionActionPlaceCubesAndDiscardCardsRule } from './rules/actions/evolution/EvolutionActionPlaceCubesAndDiscardCardsRule'
import { ChooseActionRule } from './rules/ChooseActionRule'
import { EndOfCycleRule } from './rules/EndOfCycleRule'
import { GameSetupHandMulliganRule } from './rules/GameSetupHandMulliganRule'
import { GameSetupPlaceTerritoryTokenRule } from './rules/GameSetupPlaceTerritoryTokenRule'
import { GameSetupRiverRule } from './rules/GameSetupRiverRule'
import { PrimaryProductionRule } from './rules/PrimaryProductionRule'
import { RuleId } from './rules/RuleId'
import { BiotopeCubeStrategy } from './strategies/location/BiotopeCubeStrategy'
import { SpeciesRiverStrategy } from './strategies/location/SpeciesRiverStrategy'
import { SpeciesStrategy } from './strategies/location/SpeciesStrategy'
import { ReproductionActionPlaceCubeRule } from './rules/actions/reproduction/ReproductionActionPlaceCubeRule'
import { ReproductionActionCreateCubesRule } from './rules/actions/reproduction/ReproductionActionCreateCubesRule'
import { DiscardCardToDrawCubeRule } from './rules/actions/common/DiscardCardToDrawCubeRule'
import { DrawMountainCubeRule } from './rules/actions/common/DrawMountainCubeRule'
import { DrawForestCubeRule } from './rules/actions/common/DrawForestCubeRule'
import { DrawMeadowCubeRule } from './rules/actions/common/DrawMeadowCubeRule'
import { DrawWetlandCubeRule } from './rules/actions/common/DrawWetlandCubeRule'
import { DrawCardsRule } from './rules/actions/common/DrawCardsRule'
import { DiscardCardsFromHandRule } from './rules/actions/common/DiscardCardsFromHandRule'
import { EndOfActionReplenishRiversAndActivateNextPlayerRule } from './rules/actions/common/EndOfActionReplenishRiversAndActivateNextPlayerRule'

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
      [LocationType.EnvironmentalConditionTokenSpotOnEnvironmentalConditionsBoard]: new PositiveSequenceStrategy()
    },
    [MaterialType.SpeciesCard]: {
      [LocationType.PlayerSpeciesCardTableauSpot]: new PositiveSequenceStrategy(),
      [LocationType.PlayerSpeciesCardHandSpot]: new PositiveSequenceStrategy(),
      // TODO : A new strategy will be needed when we will remove an item from the river
      [LocationType.SpeciesDecksSpot]: new SpeciesStrategy(PositiveSequenceStrategy),
      [LocationType.SpeciesRiversGrid]: new SpeciesStrategy(SpeciesRiverStrategy),
      [LocationType.SpeciesDiscardsSpot]: new SpeciesStrategy(PositiveSequenceStrategy)
    },
    [MaterialType.TerritoryToken]: {
      [LocationType.TerritoryTokenSpotOnEcosystemBoard]: new FillGapStrategy()
    },
    [MaterialType.Cube]: {
      [LocationType.CubeSpotOnEcosystemBoard]: new PositiveSequenceStrategy(),
      [LocationType.RecycledCubesSpot]: new PositiveSequenceStrategy(),
      [LocationType.CubeSpotOnPlayerBiotopesCard]: new BiotopeCubeStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.SpeciesCard]: {
      [LocationType.SpeciesDecksSpot]: hideFront,
      [LocationType.PlayerSpeciesCardHandSpot]: hideFrontToOthers
    }
  }

  rules = {
    [RuleId.GameSetupHandMulligan]: GameSetupHandMulliganRule,
    [RuleId.GameSetupPlaceTerritoryTokens]: GameSetupPlaceTerritoryTokenRule,
    [RuleId.GameSetupRiver]: GameSetupRiverRule,
    [RuleId.PrimaryProduction]: PrimaryProductionRule,
    [RuleId.ChooseAction]: ChooseActionRule,
    [RuleId.ExpansionChooseCube]: ExpansionActionChooseCubeRule,
    [RuleId.ExpansionPlaceTokenOnMountain]: ExpansionActionPlaceTerritoryTokenOnMountainRule,
    [RuleId.ExpansionPlaceTokenOnForest]: ExpansionActionPlaceTerritoryTokenOnForestRule,
    [RuleId.ExpansionPlaceTokenOnMeadow]: ExpansionActionPlaceTerritoryTokenOnMeadowRule,
    [RuleId.ExpansionPlaceTokenOnWetland]: ExpansionActionPlaceTerritoryTokenOnWetlandRule,
    [RuleId.AdaptationAction]: AdaptationActionRule,
    [RuleId.EndOfCycle]: EndOfCycleRule,
    [RuleId.EvolutionActionPlaceCubesAndDiscardCards]: EvolutionActionPlaceCubesAndDiscardCardsRule,
    [RuleId.MigrationActionChooseCube]: MigrationActionChooseCubeRule,
    [RuleId.MigrationActionMoveTerritoryTokenOnMountain]: MigrationActionMoveTerritoryTokenOnMountainRule,
    [RuleId.MigrationActionMoveTerritoryTokenOnForest]: MigrationActionMoveTerritoryTokenOnForestRule,
    [RuleId.MigrationActionMoveTerritoryTokenOnMeadow]: MigrationActionMoveTerritoryTokenOnMeadowRule,
    [RuleId.MigrationActionMoveTerritoryTokenOnWetland]: MigrationActionMoveTerritoryTokenOnWetlandRule,
    [RuleId.ReproductionActionPlaceCube]: ReproductionActionPlaceCubeRule,
    [RuleId.ReproductionActionCreateCubes]: ReproductionActionCreateCubesRule,
    [RuleId.DiscardCardToDrawCube]: DiscardCardToDrawCubeRule,
    [RuleId.DrawMountainCube]: DrawMountainCubeRule,
    [RuleId.DrawForestCube]: DrawForestCubeRule,
    [RuleId.DrawMeadowCube]: DrawMeadowCubeRule,
    [RuleId.DrawWetlandCube]: DrawWetlandCubeRule,
    [RuleId.DrawCards]: DrawCardsRule,
    [RuleId.DiscardCardsFromHand]: DiscardCardsFromHandRule,
    [RuleId.EndOfActionReplenishRiversAndActivateNextPlayer]: EndOfActionReplenishRiversAndActivateNextPlayerRule
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
