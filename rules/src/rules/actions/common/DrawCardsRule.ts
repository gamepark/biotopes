import { ItemMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { BiotopesPendingEffect } from '../../../material/effects/PendingEffect'
import { Memory } from '../../../Memory'
import { DrawCardsPendingEffect } from '../../../material/effects/DrawCardsPendingEffect'
import { KnownSpeciesCardId, SpeciesDietType } from '../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../material/SpeciesCardCharacteristics'

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

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.PlayerSpeciesCardHandSpot) {
      const currentPendingEffect = this.memorize<BiotopesPendingEffect[]>(Memory.PendingEffects, (currentPendingEffects) => {
        ;(currentPendingEffects[0] as DrawCardsPendingEffect).numberOfCardsToDraw -= 1
        return currentPendingEffects
      })[0] as DrawCardsPendingEffect
      const refillDeckMoves: BiotopesMove[] = []
      const card = this.materialHelper.speciesCardMaterial.index(move.itemIndex).getItem<KnownSpeciesCardId>()!
      const cardDietType = speciesCardCharacteristics[card.id.front].dietType
      const deck =
        cardDietType === SpeciesDietType.Herbivore
          ? this.materialHelper.herbivoresDeckMaterial
          : cardDietType === SpeciesDietType.Insectivore
            ? this.materialHelper.insectivoresDeckMaterial
            : this.materialHelper.carnivoreDeckMaterial
      if (!deck.exists) {
        const discard = this.materialHelper.speciesCardMaterial.location(LocationType.SpeciesDiscardsSpot).location((l) => l.y === cardDietType)
        refillDeckMoves.push(discard.moveItemsAtOnce({ type: LocationType.SpeciesDecksSpot, y: cardDietType }), discard.shuffle())
      }
      if (currentPendingEffect.numberOfCardsToDraw === 0) {
        return refillDeckMoves.concat(this.startRule(RuleId.DiscardCardsFromHand))
      }
      return refillDeckMoves
    }
    return super.afterItemMove(move, _context)
  }
}
