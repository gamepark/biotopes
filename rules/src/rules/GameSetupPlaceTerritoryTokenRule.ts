import { getAdjacentHexagons, ItemMove, Material, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { BiotopesPlayerTurnRule } from './BiotopesPlayerTurnRule'
import { isBiotopesMoveItemType } from '../BiotopeTypes'

export class GameSetupPlaceTerritoryTokenRule extends BiotopesPlayerTurnRule {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    const playerTerritoryTokens = this.material(MaterialType.TerritoryToken).id(this.player)
    const alreadyTakenCoords = this.computeAlreadyTakenCoordinates(playerTerritoryTokens)
    const validDestinations = this.landscapeHelper.gridWithCoordinates
      .filter(({ x, y }) => this.landscapeHelper.getAdjacentValues({ x, y }).length < 6)
      .filter(({ x, y }) => !alreadyTakenCoords.some((coords) => coords.x === x && coords.y === y))
    const availablePlayerTerritoryTokens = playerTerritoryTokens.location(LocationType.TerritoryTokenSpotOnEcosystemBoard)
    return validDestinations.map(({ x, y }) =>
      availablePlayerTerritoryTokens.moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: x,
        y: y
      })
    )
  }

  public afterItemMove(
    _move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    if (isBiotopesMoveItemType(MaterialType.TerritoryToken)(_move) && _move.location.type === LocationType.CentralLandscapeSpot) {
      const nextRule = this.areAllTokenPlaced() ? RuleId.PrimaryProduction : RuleId.GameSetupPlaceTerritoryTokens
      return [this.startPlayerTurn(nextRule, this.nextPlayer)]
    }
    return super.afterItemMove(_move, _context)
  }

  private areAllTokenPlaced() {
    return this.material(MaterialType.TerritoryToken).location(LocationType.CentralLandscapeSpot).length === 4 * this.game.players.length
  }

  private computeAlreadyTakenCoordinates(playerTerritoryTokens: Material<PlayerColor, MaterialType, LocationType>) {
    const playerAlreadyPlacedTokenCoords =
      playerTerritoryTokens
        .location(LocationType.CentralLandscapeSpot)
        .getItems()
        ?.map((item) => ({ x: item.location.x!, y: item.location.y! }))
        .flatMap((coords) => getAdjacentHexagons(coords).concat(coords)) ?? []
    const otherPlayersTerritoryTokenCoords =
      this.material(MaterialType.TerritoryToken)
        .id((id) => id !== this.player)
        .getItems()
        ?.map((token) => ({ x: token.location.x!, y: token.location.y! })) ?? []
    return playerAlreadyPlacedTokenCoords.concat(otherPlayersTerritoryTokenCoords)
  }
}
