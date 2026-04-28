import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, XYCoordinates } from '@gamepark/rules-api'
import { PlayerColor } from '../../../../PlayerColor'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { RuleId } from '../../../RuleId'
import { ColonizationHelper } from '../helpers/ColonizationHelper'
import { BiotopeType } from '../../../../material/BiotopeType'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../../BiotopeTypes'
import { MaterialHelper } from '../../../helpers/MaterialHelper'
import { Memory } from '../../../../Memory'

export class CompetitionActionMoveForestOpponentToken extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly colonizationHelper = new ColonizationHelper(this.game)
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    return this.colonizationHelper.computeCompetitionOpponentTokenOnBiotopeMoves(BiotopeType.Forest)
  }

  public beforeItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.TerritoryToken)(move) && move.location.type === LocationType.CentralLandscapeSpot) {
      const tokenBeingMoved = this.materialHelper.territoryTokenMaterial.index(move.itemIndex).getItem()!
      this.memorize<XYCoordinates>(Memory.CompetitionOwnDestination, { x: tokenBeingMoved.location.x!, y: tokenBeingMoved.location.y! })
      return [this.startRule(RuleId.CompetitionActionMoveOwnToken)]
    }
    return super.beforeItemMove(move, _context)
  }
}
