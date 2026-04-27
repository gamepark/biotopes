import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { BiotopesMove, isBiotopesMoveItemType } from '../BiotopeTypes'

export class GameSetupSelectBiotopeBoardRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    return this.material(MaterialType.BiotopeBoard).location(LocationType.BiotopeBoardSelectionSpot).player(this.player).moveItems({
      type: LocationType.BiotopeBoardSpot,
      player: this.player
    })
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (
      isBiotopesMoveItemType(MaterialType.BiotopeBoard)(move) &&
      move.location.type === LocationType.BiotopeBoardSpot &&
      move.location.player === this.player
    ) {
      const nextRule = this.nextPlayer === this.game.players[0] ? RuleId.GameSetupHandMulligan : RuleId.GameSetupBiotopeBoardSelection
      return [
        this.material(MaterialType.BiotopeBoard).location(LocationType.BiotopeBoardSelectionSpot).player(this.player).deleteItemsAtOnce(),
        this.startPlayerTurn(nextRule, this.nextPlayer)
      ]
    }
    return super.afterItemMove(move, _context)
  }
}
