import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { BiotopesPendingEffect } from '../../../material/effects/PendingEffect'
import { Memory } from '../../../Memory'
import { DrawCardsPendingEffect } from '../../../material/effects/DrawCardsPendingEffect'

export class DrawCardsRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    const handLocation = {
      type: LocationType.PlayerSpeciesCardHandSpot,
      player: this.player
    }
    return this.materialHelper.speciesCardMaterial
      .location(LocationType.SpeciesRiversGrid)
      .moveItems(handLocation)
      .concat(this.materialHelper.herbivoresDeckMaterial.dealOne(handLocation))
      .concat(this.materialHelper.insectivoresDeckMaterial.dealOne(handLocation))
      .concat(this.materialHelper.carnivoreDeckMaterial.dealOne(handLocation))
  }

  public afterItemMove(
    _move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    if (isBiotopesMoveItemType(MaterialType.SpeciesCard)(_move) && _move.location.type === LocationType.PlayerSpeciesCardHandSpot) {
      const currentPendingEffect = this.memorize<BiotopesPendingEffect[]>(Memory.PendingEffects, (currentPendingEffects) => {
        ;(currentPendingEffects[0] as DrawCardsPendingEffect).numberOfCardsToDraw -= 1
        return currentPendingEffects
      })[0] as DrawCardsPendingEffect
      if (currentPendingEffect.numberOfCardsToDraw === 0) {
        return [this.startRule(RuleId.DiscardCardsFromHand)]
      }
    }
    return super.afterItemMove(_move, _context)
  }
}
