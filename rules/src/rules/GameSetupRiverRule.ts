import { MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { BiotopesMove } from '../BiotopeTypes'

export class GameSetupRiverRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {

  public getActivePlayerLegalMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    return []
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    return []
  }

  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    return [LocationType.HerbivoreDeckSpot, LocationType.InsectivoreDeckSpot, LocationType.CarnivoreDeckSpot].map((type) =>
      this.material(MaterialType.SpeciesCard)
        .location(type)
        .deck()
        .dealAtOnce({
          type:
            type === LocationType.HerbivoreDeckSpot
              ? LocationType.HerbivoreRiverSpot
              : type === LocationType.InsectivoreDeckSpot
                ? LocationType.InsectivoreRiverSpot
                : LocationType.CarnivoreRiverSpot
        }, 3) as BiotopesMove
    ).concat(this.startPlayerTurn(RuleId.ChooseAction, this.game.players[0]))


  }
}