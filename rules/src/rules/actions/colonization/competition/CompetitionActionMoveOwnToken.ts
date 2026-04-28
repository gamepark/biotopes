import { getAdjacentHexagons, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, XYCoordinates } from '@gamepark/rules-api'
import { PlayerColor } from '../../../../PlayerColor'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { RuleId } from '../../../RuleId'
import { Memory } from '../../../../Memory'
import { MaterialHelper } from '../../../helpers/MaterialHelper'
import { LandscapeHelper } from '../../../helpers/LandscapeHelper'
import { isEqual } from 'es-toolkit'
import { ColonizationHelper } from '../helpers/ColonizationHelper'
import { isBiotopesMoveItemType } from '../../../../BiotopeTypes'
import { EcosystemActionType } from '../../../../material/EcosystemActionType'

export class CompetitionActionMoveOwnToken extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly landscapeHelper = new LandscapeHelper(this.game)
  private readonly colonizationHelper = new ColonizationHelper(this.game)

  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    const destination = this.remind<XYCoordinates>(Memory.CompetitionOwnDestination)
    const origins = getAdjacentHexagons(destination).filter((coords) => this.landscapeHelper.landscape.getValue(coords) !== undefined)
    return this.materialHelper.playerTerritoryTokenOnCentralLandscape
      .location(({ x, y }) => origins.find((coords) => isEqual(coords, { x, y })) !== undefined)
      .moveItems({
        type: LocationType.CentralLandscapeSpot,
        ...destination
      })
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    if (isBiotopesMoveItemType(MaterialType.TerritoryToken)(move) && move.location.type === LocationType.CentralLandscapeSpot) {
      const targetBiotope = this.landscapeHelper.landscape.getValue({ x: move.location.x!, y: move.location.y! })!
      return this.colonizationHelper.afterPlaceTerritoryTokenMove(move, EcosystemActionType.Competition, targetBiotope, _context)
    }
    return super.afterItemMove(move, _context)
  }
}
