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
import { ColonizationHelper } from '../helpers/ColonizationHelper'
import { MaterialHelper } from '../../../helpers/MaterialHelper'
import { RuleId } from '../../../RuleId'

export class ExpansionActionChooseCubeRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {

  private readonly colonizationHelper = new ColonizationHelper(this.game)
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    const reachableBiotopeTypes = this.colonizationHelper.computeReachableBiotopeTypes()
    const playerSpeciesCard = this.materialHelper.playerSpeciesCardTableau
    const destination = {
      type: LocationType.CubeSpotOnEcosystemBoard,
      player: this.player,
      id: EcosystemActionType.Expansion
    }
    const biotopeCubeMoves: BiotopesMove[] = this.materialHelper.playerCubesOnBiotopeCards
      .id<BiotopeType>((id) => reachableBiotopeTypes.includes(id))
      .moveItems(destination)
    const insectCubeMoves: BiotopesMove[] = this.materialHelper.playerCubesOnSpeciesCards
      .id<BiotopeType>((id) => reachableBiotopeTypes.includes(id))
      .parent((cardIndex) => {
        const card = playerSpeciesCard.index(cardIndex).getItem<KnownSpeciesCardId>()!
        const characteristics = speciesCardCharacteristics[card.id.front]
        return characteristics.cubeType === CubeType.Insect
      }).moveItems(destination)
    const pollinatingSpeciesCubesMoves: BiotopesMove[] = []
    return biotopeCubeMoves.concat(insectCubeMoves).concat(pollinatingSpeciesCubesMoves)
  }

  public afterItemMove(_move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.Cube)(_move)) {
      const biotopeToExpandTo = this.materialHelper.cubeMaterial.index(_move.itemIndex).getItem<BiotopeType>()!.id
      const nextRule = this.getRuleFromBiotope(biotopeToExpandTo)
      return [this.startRule(nextRule)]
    }
    return super.afterItemMove(_move, _context)
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
}
