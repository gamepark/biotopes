import { ItemMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { BiotopeType } from '../../../material/BiotopeType'
import { DrawCubesHelper } from './helpers/DrawCubesHelper'
import { BiotopesMove, isBiotopesCreateItemType } from '../../../BiotopeTypes'

export class DrawForestCubeRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly drawCubesHelper = new DrawCubesHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    return this.drawCubesHelper.getPlayerMoves(this.player, BiotopeType.Forest)
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesCreateItemType(MaterialType.Cube)(move) && move.item.location.type === LocationType.CubeSpotOnPlayerSpeciesCard) {
      return this.drawCubesHelper.getCubeCreatedConsequences()
    }
    return super.afterItemMove(move, _context)
  }
}
