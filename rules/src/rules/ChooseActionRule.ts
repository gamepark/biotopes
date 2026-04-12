import { BiotopesPlayerTurnRule } from './BiotopesPlayerTurnRule'
import { CustomMove, PlayMoveContext } from '@gamepark/rules-api'
import { RuleId } from './RuleId'
import { EcosystemActionType, ecosystemActionType } from '../material/EcosystemActionType'
import { ChooseActionCustomMoveData, CustomMoveType, isChooseActionCustomMove, isPassCycleCustomMove } from '../material/CustomMoveType'
import { BiotopesMove } from '../BiotopeTypes'

export class ChooseActionRule extends BiotopesPlayerTurnRule {
  public getPlayerMoves(): BiotopesMove[] {
    return ecosystemActionType
      .map((type) => this.customMove<CustomMoveType, ChooseActionCustomMoveData>(CustomMoveType.ChooseAction, { action: type }) as BiotopesMove)
      .concat(this.customMove<CustomMoveType, undefined>(CustomMoveType.PassCycle))
  }

  public onCustomMove(move: CustomMove, context?: PlayMoveContext): BiotopesMove[] {
    if (isChooseActionCustomMove(move) && move.data?.action === EcosystemActionType.Expansion) {
      return [this.startRule(RuleId.ExpansionChooseCube)]
    }
    if (isPassCycleCustomMove(move)) {
      // TODO memorize player has passed
      return [this.startPlayerTurn(RuleId.ChooseAction, this.nextPlayer)]
    }
    return super.onCustomMove(move, context)
  }
}
