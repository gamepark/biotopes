import { BiotopesPlayerTurnRule } from './BiotopesPlayerTurnRule'
import { Material, MaterialMove, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { countBy } from 'es-toolkit'
import { BiotopeType } from '../material/BiotopeType'
import { BiotopesMove } from '../BiotopeTypes'

export class PrimaryProductionRule extends BiotopesPlayerTurnRule {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    const tokenMaterial = this.territoryTokenMaterial.location(LocationType.CentralLandscapeSpot)
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
          this.createCubeMoves(biotopeType, this.reserveCubeMaterial, player, cubeCount)
        )
      })
      .concat(this.startPlayerTurn(RuleId.ChooseAction, this.player))
  }

  private createCubeMoves(
    biotopeType: string,
    reserveCubes: Material<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor,
    cubeCount: number
  ) {
    const type = parseInt(biotopeType) as BiotopeType
    return reserveCubes.id(type).moveItems(
      {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: player
      },
      cubeCount
    ) as BiotopesMove[]
  }
}
