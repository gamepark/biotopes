import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerColor } from '../../../../PlayerColor'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { RuleId } from '../../../RuleId'
import { ColonizationHelper } from '../helpers/ColonizationHelper'
import { BiotopeType } from '../../../../material/BiotopeType'

export class CompetitionActionMoveMountainOpponentToken extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly colonizationHelper = new ColonizationHelper(this.game)

  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    return this.colonizationHelper.computeCompetitionOpponentTokenOnBiotopeMoves(BiotopeType.Mountain)
  }
}
