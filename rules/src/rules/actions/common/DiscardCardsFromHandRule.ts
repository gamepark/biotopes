import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { BiotopesPendingEffect } from '../../../material/effects/PendingEffect'
import { Memory } from '../../../Memory'
import { PendingEffectType } from '../../../material/effects/PendingEffectType'
import { KnownSpeciesCardId } from '../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../material/SpeciesCardCharacteristics'

export class DiscardCardsFromHandRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  public readonly materialHelper = new MaterialHelper(this.game)

  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    if (this.materialHelper.playerSpeciesCardHand.getQuantity() < 6) {
      const newPendingActions = this.memorize<BiotopesPendingEffect[]>(Memory.PendingEffects, (currentPendingEffects) => currentPendingEffects.slice(1))
      if (newPendingActions.length === 0) {
        this.forget(Memory.PendingEffects)
      }
      return [this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer)]
    }
    return super.onRuleStart(_move, _previousRule, _context)
  }

  public getPlayerMoves(): BiotopesMove[] {
    return this.materialHelper.playerSpeciesCardHand.moveItems<KnownSpeciesCardId>((item) => ({
      type: LocationType.SpeciesDiscardsSpot,
      y: speciesCardCharacteristics[item.id.front].dietType
    }))
  }

  public afterItemMove(_move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.SpeciesCard)(_move) && _move.location.type === LocationType.SpeciesDiscardsSpot) {
      if (this.materialHelper.playerSpeciesCardHand.length === 5) {
        const newPendingActions = this.memorize<BiotopesPendingEffect[]>(Memory.PendingEffects, (currentPendingEffects) => currentPendingEffects.slice(1))
        if (newPendingActions.length === 0) {
          this.forget(Memory.PendingEffects)
          return [this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer)]
        }
        return this.getRuleMoveFromNextPendingAction(newPendingActions[0])
      }
    }
    return super.afterItemMove(_move, _context)
  }

  private getRuleMoveFromNextPendingAction(newPendingAction: BiotopesPendingEffect) {
    switch (newPendingAction.type) {
      case PendingEffectType.DrawCubes:
        return [this.startRule(RuleId.DiscardCardToDrawCube)]
      default:
        return [this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer)]
    }
  }
}
