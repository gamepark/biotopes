import { getAdjacentHexagons, ItemMove, Material, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { LandscapeHelper } from './helpers/LandscapeHelper'
import { MaterialHelper } from './helpers/MaterialHelper'
import { RuleId } from './RuleId'
import { BiotopesMove, isBiotopesMoveItemType } from '../BiotopeTypes'

export class GameSetupPlaceTerritoryTokenRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly landscapeHelper = new LandscapeHelper(this.game)
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    const playerTerritoryTokens = this.materialHelper.playerTerritoryToken
    const alreadyTakenCoords = this.computeAlreadyTakenCoordinates(playerTerritoryTokens)
    const validDestinations = this.landscapeHelper.gridWithCoordinates
      .filter(({ x, y }) => this.landscapeHelper.getAdjacentValues({ x, y }).length < 6)
      .filter(({ x, y }) => !alreadyTakenCoords.some((coords) => coords.x === x && coords.y === y))
    const availablePlayerTerritoryTokens = playerTerritoryTokens.location(LocationType.TerritoryTokenSpotOnEcosystemBoard)
    return validDestinations.map<BiotopesMove>(({ x, y }) =>
      availablePlayerTerritoryTokens.moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: x,
        y: y
      })
    )
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.TerritoryToken)(move) && move.location.type === LocationType.CentralLandscapeSpot) {
      const nextRule = this.areAllTokenPlaced() ? RuleId.GameSetupRiver : RuleId.GameSetupPlaceTerritoryTokens
      return [this.startPlayerTurn(nextRule, this.nextPlayer)]
    }
    return super.afterItemMove(move, _context)
  }

  private areAllTokenPlaced() {
    return this.materialHelper.centralLandscapeTerritoryTokenMaterial.length === 4 * this.game.players.length
  }

  private computeAlreadyTakenCoordinates(playerTerritoryTokens: Material<PlayerColor, MaterialType, LocationType>) {
    const playerAlreadyPlacedTokenCoords =
      playerTerritoryTokens
        .location(LocationType.CentralLandscapeSpot)
        .getItems()
        ?.map((item) => ({ x: item.location.x!, y: item.location.y! }))
        .flatMap((coords) => getAdjacentHexagons(coords).concat(coords)) ?? []
    const otherPlayersTerritoryTokenCoords =
      this.materialHelper.otherPlayersTerritoryTokensOnCentralLandscape.getItems()?.map((token) => ({ x: token.location.x!, y: token.location.y! })) ?? []
    return playerAlreadyPlacedTokenCoords.concat(otherPlayersTerritoryTokenCoords)
  }
}
