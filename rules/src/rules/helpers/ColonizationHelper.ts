import { getHexagonsAtDistance, ItemMove, MaterialRulesPart, PlayMoveContext, XYCoordinates } from '@gamepark/rules-api'
import { isEqual, uniq } from 'es-toolkit'
import { range } from 'es-toolkit/compat'
import { BiotopesMove, isBiotopesMoveItemType } from '../../BiotopeTypes'
import { BiotopeType } from '../../material/BiotopeType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'
import { LandscapeHelper } from './LandscapeHelper'
import { MaterialHelper } from './MaterialHelper'
import { PlayerHelper } from './PlayerHelper'

export class ColonizationHelper extends MaterialRulesPart<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {

  private readonly landscapeHelper = new LandscapeHelper(this.game)
  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly playerHelper = new PlayerHelper(this.game)

  public computeReachableBiotopeTypes(distance: number = 1): BiotopeType[] {
    return uniq(this.computeReachableHexes(distance)
      .map((coords) => this.landscapeHelper.landscape.getValue(coords))
      .filter((biotope) => biotope !== undefined))
  }

  public computeReachableHexes(distance: number = 1): XYCoordinates[] {
    const coordsOwnedByOtherPlayers = this.materialHelper.otherPlayersTerritoryTokensOnCentralLandscape
      .getItems()
      .map((token) => ({
        x: token.location.x!,
        y: token.location.y!
      }))
    return this.materialHelper.playerTerritoryTokenOnCentralLandscape
      .getItems()
      .flatMap((token) => range(1, distance + 1).flatMap((dist) => getHexagonsAtDistance({ x: token.location.x!, y: token.location.y! }, dist)))
      .filter((coords) => coordsOwnedByOtherPlayers.find((otherPlayerCoords) => isEqual(coords, otherPlayerCoords)) === undefined)
  }

  public getPlaceTerritoryTokenMoves(destinationBiotope: BiotopeType): BiotopesMove[] {
    return this.computeReachableHexes()
      .map((coords) => ({ ...coords, biotope: this.landscapeHelper.landscape.getValue(coords) }))
      .filter(({ biotope }) => biotope !== undefined && destinationBiotope === biotope)
      .map(({ x, y }) =>
        this.materialHelper.availablePlayerTerritoryToken.moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: x,
          y: y
        })
      )
  }

  public afterPlaceTerritoryTokenMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.TerritoryToken)(move) && move.location.type === LocationType.CentralLandscapeSpot) {
      return [this.startPlayerTurn(RuleId.ChooseAction, this.playerHelper.nextPlayer)]
    }
    return []
  }
}