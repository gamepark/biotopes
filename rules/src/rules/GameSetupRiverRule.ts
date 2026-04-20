import { PlayerTurnRule } from '@gamepark/rules-api'
import { BiotopesMove } from '../BiotopeTypes'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { MaterialHelper } from './helpers/MaterialHelper'
import { RuleId } from './RuleId'

export class GameSetupRiverRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public onRuleStart(): BiotopesMove[] {
    const indexes = [
      this.materialHelper.herbivoresDeckMaterial,
      this.materialHelper.insectivoresDeckMaterial,
      this.materialHelper.carnivoreDeckMaterial
    ].flatMap((deck) => deck.limit(3).getIndexes())
    return [
      this.materialHelper.speciesCardMaterial.index(indexes).moveItemsAtOnce({ type: LocationType.SpeciesRiversGrid }),
      this.startPlayerTurn(RuleId.PrimaryProduction, this.game.players[0])
    ]
  }
}
