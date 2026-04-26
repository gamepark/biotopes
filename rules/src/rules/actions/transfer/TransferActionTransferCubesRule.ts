import { PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { BiotopeType, biotopeType } from '../../../material/BiotopeType'
import { BiotopesMove } from '../../../BiotopeTypes'

export class TransferActionTransferCubesRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): BiotopesMove[] {
    const playerCubes = this.materialHelper.playerCubesOnSpeciesCards
    return biotopeType
      .flatMap<BiotopesMove>((type) => {
        const cubeOfTypeMaterial = this.materialHelper.playerCubesOnBiotopeCards.id<BiotopeType>(type)
        const destinationIndexes = this.materialHelper.playerSpeciesCardTableau
          .locationId(type)
          .index((cardIndex) => playerCubes.parent(cardIndex).getQuantity() < 4)
          .sort((card) => card.location.x!)
          .limit(cubeOfTypeMaterial.getQuantity())
          .getIndexes()
        const moves = destinationIndexes.map((destinationIndex) =>
          cubeOfTypeMaterial.moveItem(
            {
              type: LocationType.CubeSpotOnPlayerSpeciesCard,
              player: this.player,
              parent: destinationIndex
            },
            1
          )
        )
        return moves
      })
      .concat(this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer)) // TODO Adapt when R-selected  species  effect is implemented
  }
}
