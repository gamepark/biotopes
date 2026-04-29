import { PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { BiotopeType, biotopeType } from '../../../material/BiotopeType'
import { BiotopesMove } from '../../../BiotopeTypes'
import { KnownSpeciesCardId } from '../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../material/SpeciesCardCharacteristics'
import { SpeciesCardEffect } from '../../../material/SpeciesCardEffect'
import { BiotopesPendingEffect } from '../../../material/effects/PendingEffect'
import { Memory } from '../../../Memory'
import { PendingEffectType } from '../../../material/effects/PendingEffectType'

export class TransferActionTransferCubesRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): BiotopesMove[] {
    const playerCubes = this.materialHelper.playerCubesOnSpeciesCards
    const transferCubeMoves = biotopeType.flatMap<BiotopesMove>((type) => {
      const cubeOfTypeMaterial = this.materialHelper.playerCubesOnBiotopeBoard.id<BiotopeType>(type)
      const destinationIndexes = this.materialHelper.playerSpeciesCardTableau
        .locationId(type)
        .index((cardIndex) => playerCubes.parent(cardIndex).getQuantity() < 4)
        .sort((card) => card.location.x!)
        .limit(cubeOfTypeMaterial.getQuantity())
        .getIndexes()
      return destinationIndexes.map((destinationIndex) =>
        cubeOfTypeMaterial.moveItem(
          {
            type: LocationType.CubeSpotOnPlayerSpeciesCard,
            player: this.player,
            parent: destinationIndex
          },
          1
        )
      )
    })
    const rSelectedSpecies = this.materialHelper.playerSpeciesCardTableau.id<KnownSpeciesCardId>(
      (id) => speciesCardCharacteristics[id.front].effect === SpeciesCardEffect.RSelectedSpecies
    )
    const areThereRSelectedSpecies = rSelectedSpecies.exists
    if (areThereRSelectedSpecies) {
      this.memorize<BiotopesPendingEffect[]>(Memory.PendingEffects, [
        { type: PendingEffectType.DrawCubes, numberOfCubesToDraw: Math.min(rSelectedSpecies.getQuantity(), 3) }
      ])
    }
    const nextRuleMove = this.startRule(areThereRSelectedSpecies ? RuleId.DrawCubes : RuleId.EndOfActionReplenishRiversAndActivateNextPlayer)
    return transferCubeMoves.concat(nextRuleMove)
  }
}
