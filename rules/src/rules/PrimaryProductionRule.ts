import { Material, MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { LandscapeHelper } from './helpers/LandscapeHelper'
import { MaterialHelper } from './helpers/MaterialHelper'
import { RuleId } from './RuleId'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { countBy } from 'es-toolkit'
import { BiotopeType } from '../material/BiotopeType'
import { BiotopesMove } from '../BiotopeTypes'

export class PrimaryProductionRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {

  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly landscapeHelper = new LandscapeHelper(this.game)

  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    const tokenMaterial = this.materialHelper.centralLandscapeTerritoryTokenMaterial
    return this.game.players
      .flatMap((player) => {
        const playerTokenCoordinates = tokenMaterial
          .id(player)
          .getItems()!
          .map((token) => ({ x: token.location.x!, y: token.location.y! }))
        const cubeCountByType = countBy(
          playerTokenCoordinates.map((coords) => this.landscapeHelper.landscape.getValue(coords)).filter((type) => type !== undefined),
          (type) => type
        )
        return Object.entries(cubeCountByType).flatMap(([biotopeType, cubeCount]) =>
          this.createCubeMoves(biotopeType, this.materialHelper.reserveCubeMaterial, player, cubeCount)
        )
      })
      .concat(this.startPlayerTurn(RuleId.ChooseAction, this.player))
  }

  private createCubeMoves(
    biotopeType: string,
    reserveCubes: Material<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor,
    cubeCount: number
  ): BiotopesMove[] {
    const type = parseInt(biotopeType) as BiotopeType
    return reserveCubes.id(type).moveItems(
      {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: player
      },
      cubeCount
    )
  }
}
