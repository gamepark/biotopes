import { ItemMove, Material, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../../BiotopeTypes'
import { BiotopeType } from '../../../../material/BiotopeType'
import { CubeType } from '../../../../material/CubeType'
import { EcosystemActionType } from '../../../../material/EcosystemActionType'
import { LocationType } from '../../../../material/LocationType'
import { MaterialType } from '../../../../material/MaterialType'
import { KnownSpeciesCardId } from '../../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../../material/SpeciesCardCharacteristics'
import { PlayerColor } from '../../../../PlayerColor'
import { ColonizationHelper } from '../helpers/ColonizationHelper'
import { MaterialHelper } from '../../../helpers/MaterialHelper'
import { RuleId } from '../../../RuleId'
import { SpeciesCardEffect } from '../../../../material/SpeciesCardEffect'
import { isEqual } from 'es-toolkit'

export class ExpansionActionChooseCubeRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly colonizationHelper = new ColonizationHelper(this.game)
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    const reachableBiotopeTypes = this.colonizationHelper.computeReachableBiotopeTypes()
    const playerSpeciesCard = this.materialHelper.playerSpeciesCardTableau
    return this.getPlayerMovesToPlantDestination(reachableBiotopeTypes, playerSpeciesCard).concat(
      this.getPlayerMovesToInsectDestination(reachableBiotopeTypes, playerSpeciesCard)
    )
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.Cube)(move)) {
      const biotopeToExpandTo = this.materialHelper.cubeMaterial.index(move.itemIndex).getItem<BiotopeType>()!.id
      const nextRule = this.getRuleFromBiotope(biotopeToExpandTo)
      return [this.startRule(nextRule)]
    }
    return super.afterItemMove(move, _context)
  }

  private getRuleFromBiotope(biotopeToExpandTo: BiotopeType) {
    switch (biotopeToExpandTo) {
      case BiotopeType.Mountain:
        return RuleId.ExpansionPlaceTokenOnMountain
      case BiotopeType.Forest:
        return RuleId.ExpansionPlaceTokenOnForest
      case BiotopeType.Meadow:
        return RuleId.ExpansionPlaceTokenOnMeadow
      case BiotopeType.Wetland:
        return RuleId.ExpansionPlaceTokenOnWetland
    }
  }

  private getPlayerMovesToPlantDestination(
    reachableBiotopeTypes: BiotopeType[],
    playerSpeciesCard: Material<PlayerColor, MaterialType, LocationType>
  ): BiotopesMove[] {
    const plantDestination = {
      type: LocationType.CubeSpotOnEcosystemBoard,
      player: this.player,
      id: EcosystemActionType.Expansion,
      x: 0
    }
    if (!this.materialHelper.cubeMaterial.location((l) => isEqual(l, plantDestination)).exists) {
      const biotopeCubeMoves: BiotopesMove[] = this.materialHelper.playerCubesOnBiotopeCards
        .id<BiotopeType>((id) => reachableBiotopeTypes.includes(id))
        .moveItems(plantDestination)
      const pollinatingSpeciesCubesMoves: BiotopesMove[] = this.materialHelper.playerCubesOnSpeciesCards
        .id<BiotopeType>((id) => reachableBiotopeTypes.includes(id))
        .parent((cardIndex) => {
          const card = playerSpeciesCard.index(cardIndex).getItem<KnownSpeciesCardId>()!
          const characteristics = speciesCardCharacteristics[card.id.front]
          return characteristics.effect === SpeciesCardEffect.PollinatingSpecies
        })
        .moveItems(plantDestination)
      return biotopeCubeMoves.concat(pollinatingSpeciesCubesMoves)
    }
    return []
  }

  private getPlayerMovesToInsectDestination(
    reachableBiotopeTypes: BiotopeType[],
    playerSpeciesCard: Material<PlayerColor, MaterialType, LocationType>
  ): BiotopesMove[] {
    const insectDestination = {
      type: LocationType.CubeSpotOnEcosystemBoard,
      player: this.player,
      id: EcosystemActionType.Expansion,
      x: 1
    }
    if (!this.materialHelper.cubeMaterial.location((l) => isEqual(l, insectDestination)).exists) {
      return this.materialHelper.playerCubesOnSpeciesCards
        .id<BiotopeType>((id) => reachableBiotopeTypes.includes(id))
        .parent((cardIndex) => {
          const card = playerSpeciesCard.index(cardIndex).getItem<KnownSpeciesCardId>()!
          const characteristics = speciesCardCharacteristics[card.id.front]
          return characteristics.cubeType === CubeType.Insect
        })
        .moveItems(insectDestination)
    }
    return []
  }
}
