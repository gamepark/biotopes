import { ItemMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { BiotopeType } from '../../../material/BiotopeType'
import { CubeType } from '../../../material/CubeType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { KnownSpeciesCardId } from '../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../material/SpeciesCardCharacteristics'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { RuleId } from '../../RuleId'

export class AdaptationActionRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    const cubeMaterial = this.materialHelper.cubeMaterial
    const playerSpeciesCard = this.materialHelper.playerSpeciesCardHand
    const cubesOnBiotopeCardMoves = this.materialHelper.playerCubesOnBiotopeCards.moveItems({
      type: LocationType.RecycledCubesSpot,
      id: CubeType.Plant
    })
    const cubesOnSpeciesCardMoves = this.materialHelper.playerCubesOnSpeciesCards.moveItems((cube) => {
      const parentCard = this.materialHelper.playerSpeciesCardTableau.index(cube.location.parent).getItem<KnownSpeciesCardId>()!
      const parentCardCharacteristics = speciesCardCharacteristics[parentCard?.id.front]
      return {
        type: LocationType.RecycledCubesSpot,
        id: parentCardCharacteristics.cubeType
      }
    })
    const cardMoves = playerSpeciesCard
      .id<KnownSpeciesCardId>((id) => speciesCardCharacteristics[id.front].recycledCubesMatchDiet(cubeMaterial.location(LocationType.RecycledCubesSpot)))
      .moveItems<KnownSpeciesCardId, BiotopeType>((card) => ({
        type: LocationType.PlayerSpeciesCardTableauSpot,
        id: speciesCardCharacteristics[card.id.front].biotope,
        player: this.player
      }))
    return cubesOnBiotopeCardMoves.concat(cubesOnSpeciesCardMoves).concat(cardMoves)
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.PlayerSpeciesCardTableauSpot) {
      const card = this.material(MaterialType.SpeciesCard).index(move.itemIndex).getItem<KnownSpeciesCardId>()!
      const characteristics = speciesCardCharacteristics[card.id.front]
      const cubeMaterial = this.materialHelper.cubeMaterial
      return [
        cubeMaterial.location(LocationType.RecycledCubesSpot).deleteItemsAtOnce(),
        cubeMaterial.createItem({
          id: characteristics.biotope,
          location: {
            type: LocationType.CubeSpotOnPlayerSpeciesCard,
            player: move.location.player,
            parent: move.itemIndex
          }
        }),
        this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer)
      ]
    }
    return super.afterItemMove(move, _context)
  }
}
