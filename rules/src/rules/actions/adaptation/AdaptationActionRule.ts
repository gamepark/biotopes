import { ItemMove, MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { BiotopeType } from '../../../material/BiotopeType'
import { CubeType } from '../../../material/CubeType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { KnownSpeciesCardId } from '../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../material/SpeciesCardCharacteristics'
import { PlayerColor } from '../../../PlayerColor'
import { BiotopesPlayerTurnRule } from '../../BiotopesPlayerTurnRule'
import { RuleId } from '../../RuleId'

export class AdaptationActionRule extends BiotopesPlayerTurnRule {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    const cubeMaterial = this.material(MaterialType.Cube)
    const playerCubeMaterial = cubeMaterial.player(this.player)
    const playerSpeciesCard = this.material(MaterialType.SpeciesCard).location(LocationType.PlayerSpeciesCardHandSpot).player(this.player)
    const cubesOnBiotopeCardMoves = playerCubeMaterial.location(LocationType.CubeSpotOnPlayerBiotopesCard).moveItems({
      type: LocationType.RecycledCubesSpot,
      id: CubeType.Plant
    })
    const cubesOnSpeciesCardMoves = playerCubeMaterial.location(LocationType.CubeSpotOnPlayerSpeciesCard).moveItems((cube) => {
      const parentCard = playerSpeciesCard.index(cube.location.parent).getItem<KnownSpeciesCardId>()!
      const parentCardCharacteristics = speciesCardCharacteristics[parentCard?.id.front]
      return {
        type: LocationType.RecycledCubesSpot,
        id: parentCardCharacteristics.cubeType
      }
    })
    const cardMoves = playerSpeciesCard
      .id<KnownSpeciesCardId>(
        (id) => speciesCardCharacteristics[id.front].recycledCubesMatchDiet(cubeMaterial.location(LocationType.RecycledCubesSpot))
      )
      .moveItems<KnownSpeciesCardId, BiotopeType>((card) => ({
        type: LocationType.PlayerSpeciesCardTableauSpot,
        id: speciesCardCharacteristics[card.id.front].biotope,
        player: this.player
      }))
    return cubesOnBiotopeCardMoves.concat(cubesOnSpeciesCardMoves).concat(cardMoves)
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    if (isBiotopesMoveItemType(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.PlayerSpeciesCardTableauSpot) {
      const card = this.material(MaterialType.SpeciesCard).index(move.itemIndex).getItem<KnownSpeciesCardId>()!
      const characteristics = speciesCardCharacteristics[card.id.front]
      const cubeMaterial = this.material(MaterialType.Cube)
      return (cubeMaterial.location(LocationType.RecycledCubesSpot).moveItems((item) => ({
        type: LocationType.CubeStockpileSpot,
        id: item.id
      })) as BiotopesMove[]).concat(cubeMaterial.location(LocationType.CubeStockpileSpot).id(characteristics.biotope).moveItem({
        type: LocationType.CubeSpotOnPlayerSpeciesCard,
        player: move.location.player,
        parent: move.itemIndex
      })).concat(this.startPlayerTurn(RuleId.ChooseAction, this.nextPlayer))
    }
    return super.afterItemMove(move, _context)
  }
}
