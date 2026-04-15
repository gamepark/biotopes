import { MaterialMove, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { BiotopesPlayerTurnRule } from './BiotopesPlayerTurnRule'
import { RuleId } from './RuleId'

export class GameSetupRiverRule extends BiotopesPlayerTurnRule {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    const indexes = [this.herbivoresDeckMaterial, this.insectivoresDeckMaterial, this.carnivoreDeckMaterial].flatMap((deck) => deck.limit(3).getIndexes())
    return [
      this.speciesCardMaterial.index(indexes).moveItemsAtOnce({ type: LocationType.SpeciesRiversGrid }),
      this.startPlayerTurn(RuleId.PrimaryProduction, this.game.players[0])
    ]
  }
}
