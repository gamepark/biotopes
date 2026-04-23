import { ItemMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopesMove } from '../../../../BiotopeTypes'
import { LocationType } from '../../../../material/LocationType'
import { MaterialType } from '../../../../material/MaterialType'
import { PlayerColor } from '../../../../PlayerColor'
import { ColonizationHelper } from '../helpers/ColonizationHelper'
import { RuleId } from '../../../RuleId'
import { BiotopeType } from '../../../../material/BiotopeType'
import { EcosystemActionType } from '../../../../material/EcosystemActionType'

export class ExpansionActionPlaceTerritoryTokenOnMeadowRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly colonizationHelper = new ColonizationHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    return this.colonizationHelper.getPlaceTerritoryTokenMoves(BiotopeType.Meadow)
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, context?: PlayMoveContext): BiotopesMove[] {
    return this.colonizationHelper.afterPlaceTerritoryTokenMove(move, EcosystemActionType.Expansion, BiotopeType.Meadow, context)
  }
}
