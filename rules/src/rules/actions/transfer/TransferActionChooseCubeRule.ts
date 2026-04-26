import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { EcosystemActionType } from '../../../material/EcosystemActionType'
import { isBiotopesMoveItemType } from '../../../BiotopeTypes'

export class TransferActionChooseCubeRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    return this.materialHelper.playerCubesOnSpeciesCards
      .moveItems({
        type: LocationType.CubeSpotOnEcosystemBoard,
        id: EcosystemActionType.Transfert,
        player: this.player
      })
      .concat(
        this.materialHelper.playerCubesOnBiotopeCards.moveItems({
          type: LocationType.CubeSpotOnEcosystemBoard,
          id: EcosystemActionType.Transfert,
          player: this.player
        })
      )
  }

  public afterItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    if (
      isBiotopesMoveItemType(MaterialType.Cube)(move) &&
      move.location.type === LocationType.CubeSpotOnEcosystemBoard &&
      move.location.id === EcosystemActionType.Transfert
    ) {
      return [this.startRule(RuleId.TransferActionTransferCubes)]
    }
    return super.afterItemMove(move, _context)
  }
}
