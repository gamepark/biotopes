import { MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { countBy } from 'es-toolkit'
import { BiotopesMove } from '../BiotopeTypes'
import { BiotopeCard, getBiotopeCardType } from '../material/BiotopeCard'
import { BiotopeType } from '../material/BiotopeType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { LandscapeHelper } from './helpers/LandscapeHelper'
import { MaterialHelper } from './helpers/MaterialHelper'
import { RuleId } from './RuleId'

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
      .flatMap<BiotopesMove>((player) => {
        const playerTokenCoordinates = tokenMaterial
          .id(player)
          .getItems()!
          .map((token) => ({ x: token.location.x!, y: token.location.y! }))
        const cubeCountByType = countBy(
          playerTokenCoordinates.map((coords) => this.landscapeHelper.landscape.getValue(coords)).filter((type) => type !== undefined),
          (type) => type
        )
        return this.materialHelper.cubeMaterial.createItems(
          Object.entries(cubeCountByType).map(([biotopeType, cubeCount]) => {
            const type = parseInt(biotopeType) as BiotopeType
            const parentIndex = this.material(MaterialType.BiotopesCard)
              .player(this.player)
              .id<BiotopeCard>((id) => getBiotopeCardType(id) === type)
              .getIndex()
            return {
              id: type,
              quantity: cubeCount,
              location: {
                type: LocationType.CubeSpotOnPlayerBiotopesCard,
                player: player,
                parent: parentIndex
              }
            }
          })
        )
      })
      .concat(this.startPlayerTurn(RuleId.ChooseAction, this.player))
  }
}
