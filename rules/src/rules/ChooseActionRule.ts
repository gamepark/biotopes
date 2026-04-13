import { CustomMove, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopesMove } from '../BiotopeTypes'
import {
  ChooseActionCustomMoveData,
  CustomMoveType,
  isAdaptationChooseActionCustomMove,
  isExpansionChooseActionCustomMove,
  isPassCycleCustomMove
} from '../material/CustomMoveType'
import { EcosystemActionType, ecosystemActionType } from '../material/EcosystemActionType'
import { BiotopesPlayerTurnRule } from './BiotopesPlayerTurnRule'
import { RuleId } from './RuleId'

export class ChooseActionRule extends BiotopesPlayerTurnRule {
  public getPlayerMoves(): BiotopesMove[] {
    return ecosystemActionType
      .map(
        (type) =>
          this.customMove<CustomMoveType, ChooseActionCustomMoveData<EcosystemActionType>>(CustomMoveType.ChooseAction, { action: type }) as BiotopesMove
      )
      .concat(this.customMove<CustomMoveType, undefined>(CustomMoveType.PassCycle))
  }

  public onCustomMove(move: CustomMove, context?: PlayMoveContext): BiotopesMove[] {
    if (isExpansionChooseActionCustomMove(move)) {
      return [this.startRule(RuleId.ExpansionChooseCube)]
    }
    if (isAdaptationChooseActionCustomMove(move)) {
      return [this.startRule(RuleId.AdaptationAction)]
    }
    if (isPassCycleCustomMove(move)) {
      // TODO memorize player has passed
      return [this.startPlayerTurn(RuleId.ChooseAction, this.nextPlayer)]
    }
    return super.onCustomMove(move, context)
  }
}
