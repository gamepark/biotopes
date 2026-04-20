import { PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { BiotopesMove } from '../BiotopeTypes'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { MaterialHelper } from './helpers/MaterialHelper'
import { RuleId } from './RuleId'

export class EndOfCycleRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): BiotopesMove[] {
    this.forget(Memory.PassedPlayers)
    const currentPlayerWithInitiative = this.material(MaterialType.InitiativeToken).getItem()!.location.player!
    const currentPlayerWithInitiativeIndex = this.game.players.indexOf(currentPlayerWithInitiative)
    const nextPlayerWithInitiative = this.game.players[(currentPlayerWithInitiativeIndex + 1) % this.game.players.length]
    const rivers = this.material(MaterialType.SpeciesCard).location(LocationType.SpeciesRiversGrid)
    const indexes = [this.materialHelper.herbivoresDeckMaterial, this.materialHelper.insectivoresDeckMaterial, this.materialHelper.carnivoreDeckMaterial].map(
      (deck) => deck.getIndex()
    )
    return [
      rivers.location((l) => l.x === 2).moveItemsAtOnce({ type: LocationType.SpeciesDiscardsSpot }),
      this.materialHelper.speciesCardMaterial.index(indexes).deck().dealAtOnce({ type: LocationType.SpeciesRiversGrid }, 3),
      this.materialHelper.cubeMaterial.location(LocationType.CubeSpotOnEcosystemBoard).deleteItemsAtOnce(),
      this.material(MaterialType.CycleToken).moveItem((token) => ({
        type: LocationType.CycleTokenSpotOnEnvironmentalConditionsBoard,
        x: Math.min((token.location.x ?? 0) + 1, 4)
      })),
      this.material(MaterialType.InitiativeToken).moveItem({
        type: LocationType.PlayerInitiativeTokenSpot,
        player: nextPlayerWithInitiative
      }),
      this.startPlayerTurn(RuleId.PrimaryProduction, nextPlayerWithInitiative)
    ]
  }
}
