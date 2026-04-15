import { getHexagonsAtDistance, XYCoordinates } from '@gamepark/rules-api'
import { isEqual, uniq } from 'es-toolkit'
import { range } from 'es-toolkit/compat'
import { BiotopeType } from '../../../material/BiotopeType'
import { LocationType } from '../../../material/LocationType'
import { BiotopesPlayerTurnRule } from '../../BiotopesPlayerTurnRule'

export abstract class ColonizationActionRule extends BiotopesPlayerTurnRule {
  protected readonly playerAvailableTerritoryToken = this.territoryTokenMaterial.location(LocationType.TerritoryTokenSpotOnEcosystemBoard).player(this.player)
  protected readonly playerTerritoryTokenOnCentralLandscape = this.territoryTokenMaterial.location(LocationType.CentralLandscapeSpot).id(this.player)
  protected readonly otherPlayerTerritoryTokenOnCentralLandscape = this.territoryTokenMaterial.location(LocationType.CentralLandscapeSpot).id((p) => p !== this.player)

  protected computeReachableBiotopeTypes(distance: number = 1): BiotopeType[] {
    return uniq(this.computeReachableHexes(distance)
      .map((coords) => this.landscapeHelper.landscape.getValue(coords))
      .filter((biotope) => biotope !== undefined))
  }

  protected computeReachableHexes(distance: number = 1): XYCoordinates[] {
    const coordsOwnedByOtherPlayers = this.otherPlayerTerritoryTokenOnCentralLandscape
      .getItems()
      .map((token) => ({
        x: token.location.x!,
        y: token.location.y!
      }))
    return this.playerTerritoryTokenOnCentralLandscape
      .getItems()
      .flatMap((token) => range(1, distance + 1).flatMap((dist) => getHexagonsAtDistance({ x: token.location.x!, y: token.location.y! }, dist)))
      .filter((coords) => coordsOwnedByOtherPlayers.find((otherPlayerCoords) => isEqual(coords, otherPlayerCoords)) === undefined)
  }
}