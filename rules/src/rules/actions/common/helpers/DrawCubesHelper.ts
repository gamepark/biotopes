import { MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerColor } from '../../../../PlayerColor'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { RuleId } from '../../../RuleId'
import { BiotopeType } from '../../../../material/BiotopeType'
import { BiotopesMove } from '../../../../BiotopeTypes'
import { KnownSpeciesCardId } from '../../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../../material/SpeciesCardCharacteristics'
import { MaterialHelper } from '../../../helpers/MaterialHelper'
import { BiotopesPendingEffect } from '../../../../material/effects/PendingEffect'
import { Memory } from '../../../../Memory'
import { PendingEffectType } from '../../../../material/effects/PendingEffectType'

export class DrawCubesHelper extends MaterialRulesPart<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(player: PlayerColor, biotopeType: BiotopeType): BiotopesMove[] {
    return this.materialHelper.playerSpeciesCardTableau
      .id<KnownSpeciesCardId>((id) => speciesCardCharacteristics[id.front].biotope === biotopeType)
      .getIndexes()
      .map<BiotopesMove>((cardIndex) =>
        this.materialHelper.cubeMaterial.createItem({
          id: biotopeType,
          location: {
            type: LocationType.CubeSpotOnPlayerSpeciesCard,
            player: player,
            parent: cardIndex
          }
        })
      )
      .concat(
        this.materialHelper.cubeMaterial.createItem({
          id: biotopeType,
          location: {
            type: LocationType.CubeOnBiotopeBoardSpot,
            player: player,
            parent: this.material(MaterialType.BiotopeBoard).player(player).getIndex(),
            id: biotopeType
          }
        })
      )
  }

  public getCubeCreatedConsequences() {
    const currentEffect = this.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)[0]
    const newPendingEffects = this.memorize<BiotopesPendingEffect[] | undefined>(Memory.PendingEffects, (currentPendingEffects) => {
      if (currentPendingEffects !== undefined) {
        const currentEffect = currentPendingEffects[0]
        if (currentEffect.type === PendingEffectType.DrawCubes) {
          if (currentEffect.numberOfCubesToDraw === 1) {
            const newActions = currentPendingEffects.filter((effect) => effect !== currentEffect)
            return newActions.length > 0 ? newActions : undefined
          }
          currentEffect.numberOfCubesToDraw -= 1
          return currentPendingEffects
        }
      }
      return currentPendingEffects
    })
    if (newPendingEffects === undefined || newPendingEffects.length === 0) {
      return [
        currentEffect.type === PendingEffectType.DrawCubes && currentEffect.ruleWhenFinished !== undefined
          ? this.startRule(currentEffect.ruleWhenFinished)
          : this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer)
      ]
    }
    const nextRule = this.getRuleFromNewEffect(newPendingEffects[0])
    return [this.startRule(nextRule)]
  }

  private getRuleFromNewEffect(newPendingEffect: BiotopesPendingEffect) {
    switch (newPendingEffect.type) {
      case PendingEffectType.DrawCubes:
        return RuleId.DiscardCardToDrawCube
      case PendingEffectType.DrawCards:
        return RuleId.DrawCards
      default:
        return RuleId.ChooseAction
    }
  }
}
