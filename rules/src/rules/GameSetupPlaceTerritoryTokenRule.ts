import { MaterialMove } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { BiotopesPlayerTurnRule } from './BiotopesPlayerTurnRule'

export class GameSetupPlaceTerritoryTokenRule extends BiotopesPlayerTurnRule {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    const playerTerritoryTokens = this.material(MaterialType.TerritoryToken).player(this.player)
    const alreadyPlacedTokens = playerTerritoryTokens
        .location(LocationType.CentralLandscapeSpot)
        .getItems()
        ?.map((item) => ({ x: item.location.x, y: item.location.y })) ?? []
    const validDestinations = this.landscapeHelper.gridWithCoordinates
      .filter(({ x, y }) => this.landscapeHelper.getAdjacentValues({ x, y }).length < 6)
      .filter(({ x, y }) => !alreadyPlacedTokens.includes({ x, y }))
    const availablePlayerTerritoryTokens = playerTerritoryTokens.location(LocationType.TerritoryTokenSpotOnEcosystemBoard)
    return validDestinations.map(({x, y}) => availablePlayerTerritoryTokens.moveItem({
      type: LocationType.CentralLandscapeSpot,
      x: x,
      y: y,
    }))
  }
}
