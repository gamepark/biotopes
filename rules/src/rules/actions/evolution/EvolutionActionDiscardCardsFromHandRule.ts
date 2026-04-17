import { ItemMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { PlayerHelper } from '../../helpers/PlayerHelper'
import { RuleId } from '../../RuleId'

export class EvolutionActionDiscardCardsFromHandRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {

  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly playerHelper = new PlayerHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    return this.materialHelper.playerSpeciesCardHand.moveItems({
      type: LocationType.SpeciesDiscardsSpot
    })
  }

  public afterItemMove(_move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.SpeciesCard)(_move) && _move.location.type === LocationType.SpeciesDiscardsSpot) {
      if (this.materialHelper.playerSpeciesCardHand.length === 5) {
        return [this.startPlayerTurn(RuleId.ChooseAction, this.playerHelper.nextPlayer)]
      }
    }
    return super.afterItemMove(_move, _context)
  }
}