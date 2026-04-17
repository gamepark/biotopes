import { ItemMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../../BiotopeTypes'
import { BiotopeType } from '../../../../material/BiotopeType'
import { CubeType } from '../../../../material/CubeType'
import { EcosystemActionType } from '../../../../material/EcosystemActionType'
import { LocationType } from '../../../../material/LocationType'
import { MaterialType } from '../../../../material/MaterialType'
import { KnownSpeciesCardId } from '../../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../../material/SpeciesCardCharacteristics'
import { PlayerColor } from '../../../../PlayerColor'
import { MaterialHelper } from '../../../helpers/MaterialHelper'
import { RuleId } from '../../../RuleId'
import { ColonizationHelper } from '../helpers/ColonizationHelper'

export class MigrationActionChooseCubeRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly colonizationHelper = new ColonizationHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    const biotopesToExtendTo = this.colonizationHelper.computeReachableBiotopeTypes(3)
    return this.materialHelper.playerSpeciesCardTableau
      .id<KnownSpeciesCardId>((cardId) => {
        const cardCubeType = speciesCardCharacteristics[cardId.front].cubeType
        return cardCubeType === CubeType.Bird || cardCubeType === CubeType.AmphibianReptile
      })
      .getIndexes()
      .flatMap<BiotopesMove>((cardIndex) =>
        this.materialHelper.playerCubesOnSpeciesCards
          .parent(cardIndex)
          .id<BiotopeType>((biotopeType) => biotopesToExtendTo.includes(biotopeType))
          .moveItems({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Migration, player: this.player })
      )
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (
      isBiotopesMoveItemType(MaterialType.Cube)(move) &&
      move.location.type === LocationType.CubeSpotOnEcosystemBoard &&
      move.location.id === EcosystemActionType.Migration
    ) {
      const cubeType = this.materialHelper.cubeMaterial.index(move.itemIndex).getItem<BiotopeType>()!.id
      const nextRule = this.getNextRuleFromBiotopeType(cubeType)
      return [this.startRule(nextRule)]
    }
    return super.afterItemMove(move, _context)
  }

  private getNextRuleFromBiotopeType(
    cubeType: BiotopeType
  ):
    | RuleId.MigrationActionMoveTerritoryTokenOnMountain
    | RuleId.MigrationActionMoveTerritoryTokenOnForest
    | RuleId.MigrationActionMoveTerritoryTokenOnMeadow
    | RuleId.MigrationActionMoveTerritoryTokenOnWetland {
    switch (cubeType) {
      case BiotopeType.Mountain:
        return RuleId.MigrationActionMoveTerritoryTokenOnMountain
      case BiotopeType.Forest:
        return RuleId.MigrationActionMoveTerritoryTokenOnForest
      case BiotopeType.Meadow:
        return RuleId.MigrationActionMoveTerritoryTokenOnMeadow
      case BiotopeType.Wetland:
        return RuleId.MigrationActionMoveTerritoryTokenOnWetland
    }
  }
}
