import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopeType } from '../../../../material/BiotopeType'
import { LocationType } from '../../../../material/LocationType'
import { MaterialType } from '../../../../material/MaterialType'
import { PlayerColor } from '../../../../PlayerColor'
import { RuleId } from '../../../RuleId'
import { ColonizationHelper } from '../helpers/ColonizationHelper'

export class MigrationActionMoveTerritoryTokenOnMeadowRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {

  private readonly colonizationHelper = new ColonizationHelper(this.game)

  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    return this.colonizationHelper.getMigrationMoveTerritoryTokenMoves(BiotopeType.Meadow)
  }

  public afterItemMove(_move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    return this.colonizationHelper.afterPlaceTerritoryTokenMove(_move, _context)
  }
}