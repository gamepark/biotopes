import { MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
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
import { SpeciesCardEffect } from '../../../../material/SpeciesCardEffect'
import { PlayerHelper } from '../../../helpers/PlayerHelper'

export class DrawCubesHelper extends MaterialRulesPart<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly playerHelper = new PlayerHelper(this.game)

  public getPlayerMoves(player: PlayerColor, biotopeType: BiotopeType): BiotopesMove[] {
    return this.materialHelper.playerSpeciesCardTableau
      .id<KnownSpeciesCardId>((id) => speciesCardCharacteristics[id.front].biotope === biotopeType)
      .entries.map<BiotopesMove>(([cardIndex, card]) =>
        this.materialHelper.cubeMaterial.createItem({
          id: speciesCardCharacteristics[(card as MaterialItem<PlayerColor, LocationType, KnownSpeciesCardId>).id.front].biotope,
          location: {
            type: LocationType.CubeSpotOnPlayerSpeciesCard,
            player: player,
            parent: cardIndex
          }
        })
      )
  }

  public getCubeCreatedConsequences() {
    const currentEffect = this.remind<BiotopesPendingEffect[]>(Memory.PendingEffects)[0]
    const newPendingEffects = this.memorize<BiotopesPendingEffect[] | undefined>(Memory.PendingEffects, (currentPendingEffects) => {
      if (currentPendingEffects !== undefined) {
        const currentEffect = currentPendingEffects[0]
        if (currentEffect.type === SpeciesCardEffect.FecundSpecies) {
          if (currentEffect.numberOfCubesToDraw === 1) {
            const newActions = currentPendingEffects.filter((effect) => effect.type !== SpeciesCardEffect.FecundSpecies)
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
        currentEffect.type === SpeciesCardEffect.FecundSpecies
          ? this.startRule(RuleId.ReproductionActionCreateCubes)
          : this.startPlayerTurn(RuleId.ChooseAction, this.playerHelper.nextPlayer)
      ]
    }
    const nextRule = this.getRuleFromNewEffect(newPendingEffects[0])
    return [this.startRule(nextRule)]
  }

  private getRuleFromNewEffect(newPendingEffect: BiotopesPendingEffect) {
    switch (newPendingEffect.type) {
      case SpeciesCardEffect.FecundSpecies:
        return RuleId.DiscardCardToDrawCube
      default:
        return RuleId.ChooseAction
    }
  }
}
