import { PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { LandscapeHelper } from './helpers/LandscapeHelper'

export abstract class BiotopesPlayerTurnRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  protected readonly landscapeHelper = new LandscapeHelper(this.game)

  protected isLastPlayer() {
    return this.nextPlayer === this.game.players[0]
  }
}
