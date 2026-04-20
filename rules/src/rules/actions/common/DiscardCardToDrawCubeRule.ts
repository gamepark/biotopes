import { ItemMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { KnownSpeciesCardId } from '../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../material/SpeciesCardCharacteristics'
import { BiotopeType } from '../../../material/BiotopeType'

export class DiscardCardToDrawCubeRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)
  public getPlayerMoves(): BiotopesMove[] {
    return [
      this.materialHelper.herbivoresDeckMaterial,
      this.materialHelper.insectivoresDeckMaterial,
      this.materialHelper.carnivoreDeckMaterial
    ].map<BiotopesMove>((deck, deckIndex) => deck.dealOne({ type: LocationType.SpeciesDiscardsSpot, y: deckIndex + 1 }))
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.SpeciesDiscardsSpot) {
      const card = this.materialHelper.speciesCardMaterial.index(move.itemIndex).getItem<KnownSpeciesCardId>()!
      const nextRule = this.getNextRuleFromBiotope(speciesCardCharacteristics[card.id.front].biotope)
      return [this.startRule(nextRule)]
    }
    return super.afterItemMove(move, _context)
  }

  private getNextRuleFromBiotope(biotope: BiotopeType) {
    switch (biotope) {
      case BiotopeType.Mountain:
        return RuleId.DrawMountainCube
      case BiotopeType.Forest:
        return RuleId.DrawForestCube
      case BiotopeType.Meadow:
        return RuleId.DrawMeadowCube
      case BiotopeType.Wetland:
        return RuleId.DrawWetlandCube
    }
  }
}
