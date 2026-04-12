import { BiotopesPlayerTurnRule } from './BiotopesPlayerTurnRule'
import { Material, MaterialMove, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { countBy } from 'es-toolkit'
import { BiotopeType } from '../material/BiotopeType'
import { BiotopeCard, getBiotopeCardTypes } from '../material/BiotopeCard'
import { BiotopesMove } from '../BiotopeTypes'

export class PrimaryProductionRule extends BiotopesPlayerTurnRule {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    const tokenMaterial = this.material(MaterialType.TerritoryToken).location(LocationType.CentralLandscapeSpot)
    const biotopeCards = this.material(MaterialType.BiotopesCard)
    const reserveCubes = this.material(MaterialType.Cube).location(LocationType.CubeStockpileSpot)
    return this.game.players
      .flatMap((player) => {
        const playerBiotopeCards = biotopeCards.player(player)
        const playerTokenCoordinates = tokenMaterial
          .id(player)
          .getItems()!
          .map((token) => ({ x: token.location.x!, y: token.location.y! }))
        const cubeCountByType = countBy(
          playerTokenCoordinates.map((coords) => this.landscapeHelper.landscape.getValue(coords)).filter((type) => type !== undefined),
          (type) => type
        )
        return Object.entries(cubeCountByType).flatMap(([biotopeType, cubeCount]) =>
          this.createCubeMoves(biotopeType, playerBiotopeCards, reserveCubes, player, cubeCount)
        )
      })
      .concat(this.startPlayerTurn(RuleId.ChooseAction, this.player))
  }

  private createCubeMoves(
    biotopeType: string,
    playerBiotopeCards: Material<PlayerColor, MaterialType, LocationType>,
    reserveCubes: Material<PlayerColor, MaterialType, LocationType>,
    player: PlayerColor,
    cubeCount: number
  ) {
    const type = parseInt(biotopeType) as BiotopeType
    const biotopeCardIndex = playerBiotopeCards.id<BiotopeCard>((id) => getBiotopeCardTypes(id) === type).getIndex()
    return reserveCubes.id(type).moveItems(
      {
        type: LocationType.CubeSpotOnPlayerBiotopesCard,
        player: player,
        parent: biotopeCardIndex
      },
      cubeCount
    ) as BiotopesMove[]
  }
}
