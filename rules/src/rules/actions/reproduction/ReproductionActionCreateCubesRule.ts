import { MaterialItem, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { BiotopesMove } from '../../../BiotopeTypes'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { KnownSpeciesCardId } from '../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../material/SpeciesCardCharacteristics'
import { inRange } from 'es-toolkit/compat'

export class ReproductionActionCreateCubesRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): BiotopesMove[] {
    const cubeOnTableauMaterial = this.materialHelper.playerCubesOnSpeciesCards
    const cardsWithEnoughCubes = this.materialHelper.playerSpeciesCardTableau.index((cardIndex) =>
      inRange(cubeOnTableauMaterial.parent(cardIndex).getQuantity(), 2, 4)
    )
    const cubesToCreate = cardsWithEnoughCubes.entries.map(([index, card]: [number, MaterialItem<PlayerColor, LocationType>]) => {
      const biotopeType = speciesCardCharacteristics[(card as MaterialItem<PlayerColor, LocationType, KnownSpeciesCardId>).id.front].biotope
      return {
        id: biotopeType,
        location: {
          type: LocationType.CubeSpotOnPlayerSpeciesCard,
          player: this.player,
          parent: index
        }
      }
    })
    return [this.material(MaterialType.Cube).createItemsAtOnce(cubesToCreate) as BiotopesMove].concat(
      this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer)
    )
  }
}
