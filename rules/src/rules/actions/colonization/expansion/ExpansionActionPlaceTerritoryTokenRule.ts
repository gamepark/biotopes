import { BiotopeType } from '../../../../material/BiotopeType'
import { ItemMove, PlayMoveContext } from '@gamepark/rules-api'
import { PlayerColor } from '../../../../PlayerColor'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../../BiotopeTypes'
import { RuleId } from '../../../RuleId'
import { ColonizationActionRule } from '../ColonizationActionRule'

export abstract class ExpansionActionPlaceTerritoryTokenRule extends ColonizationActionRule {
  protected abstract readonly biotopeToExpandTo: BiotopeType

  public getPlayerMoves(): BiotopesMove[] {
    return this.computeReachableHexes()
      .map((coords) => ({ ...coords, biotope: this.landscapeHelper.landscape.getValue(coords) }))
      .filter(({ biotope }) => biotope !== undefined && this.biotopeToExpandTo === biotope)
      .map(({ x, y }) =>
        this.playerAvailableTerritoryToken.moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: x,
          y: y
        })
      )
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.TerritoryToken)(move) && move.location.type === LocationType.CentralLandscapeSpot) {
      return [this.startPlayerTurn(RuleId.ChooseAction, this.nextPlayer)]
    }
    return super.afterItemMove(move, _context)
  }
}
