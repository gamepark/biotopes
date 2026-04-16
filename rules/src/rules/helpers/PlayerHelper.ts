import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../../Memory'
import { PlayerColor } from '../../PlayerColor'
import { RuleId } from '../RuleId'

export class PlayerHelper extends MaterialRulesPart<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {


  public get player() {
    return this.game.rule!.player!
  }

  public get isLastPlayer() {
    return this.nextPlayer === this.game.players[0]
  }

  get nextPlayer(): PlayerColor {
    const currentPlayerIndex = this.game.players.indexOf(this.player)
    const passedPlayers = this.remind<PlayerColor[]>(Memory.PassedPlayers) ?? []
    const players = this.game.players.slice(currentPlayerIndex + 1).concat(this.game.players.slice(0, currentPlayerIndex + 1))
    return players.find((p) => !passedPlayers.includes(p)) ?? this.player
  }
}