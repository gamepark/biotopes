import { ItemMove, Material, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
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
import { SpeciesCardEffect } from '../../../material/SpeciesCardEffect'
import { BiotopeBoard } from '../../../material/BiotopeBoard'
import { BiotopesPendingEffect } from '../../../material/effects/PendingEffect'
import { Memory } from '../../../Memory'
import { PendingEffectType } from '../../../material/effects/PendingEffectType'
import { uniq } from 'es-toolkit'

export class AdaptationActionRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    const cubeMaterial = this.materialHelper.cubeMaterial
    const playerSpeciesHandMaterial = this.materialHelper.playerSpeciesCardHand
    const playerSpeciesCardTableau = this.materialHelper.playerSpeciesCardTableau
    const cubeMoves = this.computeCubeMovesForCubeTypesInHand(playerSpeciesHandMaterial, playerSpeciesCardTableau)
    const cardMoves = playerSpeciesHandMaterial
      .id<KnownSpeciesCardId>((id) => speciesCardCharacteristics[id.front].recycledCubesMatchDiet(cubeMaterial.location(LocationType.RecycledCubesSpot)))
      .moveItems<KnownSpeciesCardId, BiotopeType>((card) => ({
        type: LocationType.PlayerSpeciesCardTableauSpot,
        id: speciesCardCharacteristics[card.id.front].biotope,
        player: this.player
      }))
    return cubeMoves.concat(cardMoves)
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.PlayerSpeciesCardTableauSpot) {
      const card = this.material(MaterialType.SpeciesCard).index(move.itemIndex).getItem<KnownSpeciesCardId>()!
      const characteristics = speciesCardCharacteristics[card.id.front]
      const cubeMaterial = this.materialHelper.cubeMaterial
      const cardBiotope = characteristics.biotope
      const adaptationConsequences: BiotopesMove[] = [
        cubeMaterial.location(LocationType.RecycledCubesSpot).deleteItemsAtOnce(),
        cubeMaterial.createItem({
          id: cardBiotope,
          location: {
            type: LocationType.CubeSpotOnPlayerSpeciesCard,
            player: move.location.player,
            parent: move.itemIndex
          }
        })
      ]
      const biotopeBoardId = this.material(MaterialType.BiotopeBoard).player(this.player).getItem<BiotopeBoard>()!.id
      if (
        (biotopeBoardId === BiotopeBoard.AlpineGrass && cardBiotope === BiotopeType.Meadow) ||
        (biotopeBoardId === BiotopeBoard.Ripisylve && cardBiotope === BiotopeType.Wetland) ||
        (biotopeBoardId === BiotopeBoard.MountainPasture && cardBiotope === BiotopeType.Mountain) ||
        (biotopeBoardId === BiotopeBoard.AlluvialForest && cardBiotope === BiotopeType.Wetland)
      ) {
        this.memorize<BiotopesPendingEffect[]>(Memory.PendingEffects, [{ type: PendingEffectType.DrawCubes, numberOfCubesToDraw: 1 }])
        return adaptationConsequences.concat(this.startRule(RuleId.DrawCubes))
      }
      return adaptationConsequences.concat(this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer))
    }
    return super.afterItemMove(move, _context)
  }

  private computeCubeMovesForCubeTypesInHand = (
    playerSpeciesHandMaterial: Material<PlayerColor, MaterialType, LocationType>,
    playerSpeciesCardTableau: Material<PlayerColor, MaterialType, LocationType>
  ) => {
    const cubeTypesInHand = uniq(
      playerSpeciesHandMaterial
        .getItems<KnownSpeciesCardId>()
        .flatMap(({ id }) => Object.keys(speciesCardCharacteristics[id.front].diet).map((k) => parseInt(k) as CubeType))
    )
    return cubeTypesInHand.flatMap<BiotopesMove>((cubeType) => {
      if (cubeType === CubeType.Plant) {
        const biotopeCubesMoves = this.materialHelper.playerCubesOnBiotopeBoard.moveItems({
          type: LocationType.RecycledCubesSpot,
          id: CubeType.Plant
        })
        const pollinatingSpeciesMoves = this.materialHelper.playerCubesOnSpeciesCards
          .parent((cardIndex) => {
            const parentCard = playerSpeciesCardTableau.index(cardIndex).getItem<KnownSpeciesCardId>()!
            const characteristics = speciesCardCharacteristics[parentCard.id.front]
            return characteristics.effect === SpeciesCardEffect.PollinatingSpecies
          })
          .moveItems({
            type: LocationType.RecycledCubesSpot,
            id: CubeType.Plant
          })
        return biotopeCubesMoves.concat(pollinatingSpeciesMoves)
      }
      return this.materialHelper.playerCubesOnSpeciesCards
        .parent((cardIndex) => {
          const parentCard = playerSpeciesCardTableau.index(cardIndex).getItem<KnownSpeciesCardId>()!
          return speciesCardCharacteristics[parentCard.id.front].cubeType === cubeType
        })
        .moveItems({
          type: LocationType.RecycledCubesSpot,
          id: cubeType
        })
    })
  }
}
