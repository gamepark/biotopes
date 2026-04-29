import { ItemMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { getBiotopeTypeFromCardId, SpeciesCardId } from '../../../material/SpeciesCard'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { uniq } from 'es-toolkit'
import { BiotopesPendingEffect } from '../../../material/effects/PendingEffect'
import { Memory } from '../../../Memory'
import { DrawCubesPendingEffect } from '../../../material/effects/DrawCubesPendingEffect'
import { PendingEffectType } from '../../../material/effects/PendingEffectType'

export class DrawCubesRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): BiotopesMove[] {
    return [
      this.materialHelper.cubeMaterial.createItemsAtOnce(
        [this.materialHelper.herbivoresDeckMaterial, this.materialHelper.insectivoresDeckMaterial, this.materialHelper.carnivoreDeckMaterial].map((deck) => {
          const card = deck.limit(1).getItem<SpeciesCardId>()!
          const cubeBiotope = getBiotopeTypeFromCardId(card.id)
          return {
            id: cubeBiotope,
            location: {
              type: LocationType.CubeStockpileSpot,
              id: cubeBiotope
            }
          }
        })
      )
    ]
  }

  public getPlayerMoves(): BiotopesMove[] {
    const cubeBiotopeTypes = uniq(
      this.materialHelper.cubeMaterial
        .location(LocationType.CubeStockpileSpot)
        .getItems()
        .map((cube) => cube.location.id)
    )
    return cubeBiotopeTypes.flatMap<BiotopesMove>((type) => {
      const cubeMaterial = this.materialHelper.cubeMaterial.location(LocationType.CubeStockpileSpot).locationId(type)
      return this.materialHelper.playerSpeciesCardTableau
        .locationId(type)
        .index((cardIndex) => this.materialHelper.playerCubesOnSpeciesCards.parent(cardIndex).getQuantity() < 4)
        .getIndexes()
        .flatMap((cardIndex) =>
          cubeMaterial.moveItems({
            type: LocationType.CubeSpotOnPlayerSpeciesCard,
            player: this.player,
            parent: cardIndex
          })
        )
        .concat(
          cubeMaterial.moveItems({
            type: LocationType.CubeOnBiotopeBoardSpot,
            player: this.player,
            id: type
          })
        )
    })
  }

  public afterItemMove(_move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (
      isBiotopesMoveItemType(MaterialType.Cube)(_move) &&
      (_move.location.type === LocationType.CubeOnBiotopeBoardSpot || _move.location.type === LocationType.CubeSpotOnPlayerSpeciesCard)
    ) {
      const cubesToDrawMaterial = this.materialHelper.cubeMaterial.location(LocationType.CubeStockpileSpot)
      const numberOfCubesDrawn = 3 - cubesToDrawMaterial.getQuantity()
      const currentPendingEffect = this.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)[0] as DrawCubesPendingEffect
      if (currentPendingEffect.numberOfCubesToDraw === numberOfCubesDrawn) {
        const deleteRemainingCubesMoves: BiotopesMove[] = cubesToDrawMaterial.exists ? [cubesToDrawMaterial.deleteItemsAtOnce()] : []
        const newPendingEffects = this.memorize<BiotopesPendingEffect[]>(Memory.PendingEffects, (oldPendingEffects) => oldPendingEffects.slice(1))
        if (newPendingEffects.length === 0) {
          this.forget(Memory.PendingEffects)
          return deleteRemainingCubesMoves.concat(
            currentPendingEffect.ruleWhenFinished !== undefined
              ? this.startRule(currentPendingEffect.ruleWhenFinished)
              : this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer)
          )
        }
        const nextRule = this.getRuleFromNewEffect(newPendingEffects[0])
        return deleteRemainingCubesMoves.concat(this.startRule(nextRule))
      }
    }
    return super.afterItemMove(_move, _context)
  }

  private getRuleFromNewEffect(newPendingEffect: BiotopesPendingEffect) {
    switch (newPendingEffect.type) {
      case PendingEffectType.DrawCubes:
        return RuleId.DrawCubes
      case PendingEffectType.DrawCards:
        return RuleId.DrawCards
      default:
        return RuleId.ChooseAction
    }
  }
}
