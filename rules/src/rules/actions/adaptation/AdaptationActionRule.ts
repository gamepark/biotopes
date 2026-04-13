import { MaterialMove } from '@gamepark/rules-api'
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
    const playerSpeciesCard = this.material(MaterialType.SpeciesCard).location(LocationType.PlayerSpeciesCardTableauSpot).player(this.player)
    const cubesOnBiotopeCardMoves = playerCubeMaterial.location(LocationType.CubeSpotOnPlayerBiotopesCard).moveItems({
      type: LocationType.RecycledCubesSpot,
      id: CubeType.Plant
    })
    const cubesOnSpeciesCardMoves = playerCubeMaterial.location(LocationType.CubeSpotOnPlayerSpeciesCard).moveItems((cube) => {
      const parentCard = playerSpeciesCard.index(cube.location.parent).getItem<KnownSpeciesCardId>()!
      const parentCardCharacteristics = speciesCardCharacteristics[parentCard?.id.front]
      return {
        type: LocationType.RecycledCubesSpot,
        id: parentCardCharacteristics?.cubeType
      }
    })
    const cardMoves = playerCubeMaterial
      .id<KnownSpeciesCardId>(
        (id) => speciesCardCharacteristics[id.front]?.recycledCubesMatchDiet(cubeMaterial.location(LocationType.RecycledCubesSpot)) ?? false
      )
      .moveItems<KnownSpeciesCardId, BiotopeType>((card) => ({
        type: LocationType.PlayerSpeciesCardTableauSpot,
        id: speciesCardCharacteristics[card.id.front]?.biotope
      }))
    return cubesOnBiotopeCardMoves.concat(cubesOnSpeciesCardMoves).concat(cardMoves)
  }
}
