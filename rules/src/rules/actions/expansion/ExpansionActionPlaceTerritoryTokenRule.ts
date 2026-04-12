import { BiotopesPlayerTurnRule } from '../../BiotopesPlayerTurnRule'
import { BiotopeType } from '../../../material/BiotopeType'
import { getAdjacentHexagons, ItemMove, PlayMoveContext } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { RuleId } from '../../RuleId'

export abstract class ExpansionActionPlaceTerritoryTokenRule extends BiotopesPlayerTurnRule {
  protected abstract readonly biotopeToExpandTo: BiotopeType

  public getPlayerMoves(): BiotopesMove[] {
    const otherPlayerTokenCoords = this.material(MaterialType.TerritoryToken)
      .location(LocationType.CentralLandscapeSpot)
      .id<PlayerColor>((id) => id !== this.player)
      .getItems()
      .map((token) => ({ x: token.location.x!, y: token.location.y! }))
    const playerTokens = this.material(MaterialType.TerritoryToken).player(this.player)
    return this.material(MaterialType.TerritoryToken)
      .location(LocationType.CentralLandscapeSpot)
      .id(this.player)
      .getItems()
      .map((token) => ({ x: token.location.x!, y: token.location.y! }))
      .flatMap((coords) => getAdjacentHexagons(coords))
      .filter((coords) => otherPlayerTokenCoords.find((tokenCoords) => tokenCoords.x === coords.x && tokenCoords.y === coords.y) === undefined)
      .map((coords) => ({ ...coords, biotope: this.landscapeHelper.landscape.getValue(coords) }))
      .filter(({ biotope }) => biotope !== undefined && this.biotopeToExpandTo === biotope)
      .map(({ x, y }) =>
        playerTokens.moveItem({
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
