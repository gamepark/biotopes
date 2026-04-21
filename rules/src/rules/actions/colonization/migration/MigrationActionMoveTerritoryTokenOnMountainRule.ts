import { ItemMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopeType } from '../../../../material/BiotopeType'
import { LocationType } from '../../../../material/LocationType'
import { MaterialType } from '../../../../material/MaterialType'
import { PlayerColor } from '../../../../PlayerColor'
import { RuleId } from '../../../RuleId'
import { ColonizationHelper } from '../helpers/ColonizationHelper'
import { BiotopesMove } from '../../../../BiotopeTypes'
import { EcosystemActionType } from '../../../../material/EcosystemActionType'

export class MigrationActionMoveTerritoryTokenOnMountainRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly colonizationHelper = new ColonizationHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    return this.colonizationHelper.getMigrationMoveTerritoryTokenMoves(BiotopeType.Mountain)
  }

  public afterItemMove(_move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    return this.colonizationHelper.afterPlaceTerritoryTokenMove(_move, EcosystemActionType.Migration, _context)
  }
}
