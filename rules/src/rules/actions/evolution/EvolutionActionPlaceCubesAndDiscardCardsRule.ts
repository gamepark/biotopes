import { CustomMove, ItemMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { xor } from 'es-toolkit'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { CubeType, cubeType } from '../../../material/CubeType'
import { CustomMoveType, isEndOfEvolutionActionCustomMove } from '../../../material/CustomMoveType'
import { EcosystemActionType } from '../../../material/EcosystemActionType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { KnownSpeciesCardId } from '../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../material/SpeciesCardCharacteristics'
import { Memory } from '../../../Memory'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { RuleId } from '../../RuleId'
import { BiotopesPendingEffect } from '../../../material/effects/PendingEffect'
import { PendingEffectType } from '../../../material/effects/PendingEffectType'
import { DrawCardsPendingEffect } from '../../../material/effects/DrawCardsPendingEffect'

export class EvolutionActionPlaceCubesAndDiscardCardsRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    const freeCubeTypes = xor(
      cubeType,
      this.materialHelper.cubeMaterial
        .location(LocationType.CubeSpotOnEcosystemBoard)
        .locationId(EcosystemActionType.Evolution)
        .player(this.player)
        .getItems()
        .map((cube) => cube.location.x! as CubeType)
    )
    const moves = freeCubeTypes
      .flatMap<BiotopesMove>((cubeType) => {
        if (cubeType === CubeType.Plant) {
          return this.materialHelper.playerCubesOnBiotopeCards.moveItems({
            type: LocationType.CubeSpotOnEcosystemBoard,
            player: this.player,
            id: EcosystemActionType.Evolution,
            x: cubeType
          })
        } else {
          const cardOfTypeIndexes = this.materialHelper.playerSpeciesCardTableau
            .id<KnownSpeciesCardId>((cardId) => speciesCardCharacteristics[cardId.front].cubeType === cubeType)
            .getIndexes()
          return cardOfTypeIndexes.flatMap((cardIndex) =>
            this.materialHelper.playerCubesOnSpeciesCards.parent(cardIndex).moveItems({
              type: LocationType.CubeSpotOnEcosystemBoard,
              player: this.player,
              id: EcosystemActionType.Evolution,
              x: cubeType
            })
          )
        }
      })
      .concat(
        this.materialHelper.playerSpeciesCardHand.moveItems<KnownSpeciesCardId>((card) => ({
          type: LocationType.SpeciesDiscardsSpot,
          y: speciesCardCharacteristics[card.id.front].dietType
        }))
      )
    return this.materialHelper.cubeMaterial.location(LocationType.CubeSpotOnEcosystemBoard).locationId(EcosystemActionType.Evolution).player(this.player).exists
      ? moves.concat(this.customMove(CustomMoveType.EndEvolutionAction))
      : moves
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.SpeciesDiscardsSpot) {
      this.memorize<BiotopesPendingEffect[] | undefined>(Memory.PendingEffects, (currentPendingEffects) => {
        const currentDrawCardsAction = currentPendingEffects?.find<DrawCardsPendingEffect>(
          (effect): effect is DrawCardsPendingEffect => effect.type === PendingEffectType.DrawCards
        )
        if (currentDrawCardsAction === undefined) {
          return [{ type: PendingEffectType.DrawCards, numberOfCardsToDraw: 1 } as BiotopesPendingEffect].concat(currentPendingEffects ?? [])
        }
        currentDrawCardsAction.numberOfCardsToDraw += 1
        return currentPendingEffects
      })
    }
    return super.afterItemMove(move, _context)
  }

  public onCustomMove(move: CustomMove, _context?: PlayMoveContext): BiotopesMove[] {
    if (isEndOfEvolutionActionCustomMove(move)) {
      this.memorize<BiotopesPendingEffect[] | undefined>(Memory.PendingEffects, (currentPendingEffects) => {
        const currentDrawCardsAction = currentPendingEffects?.find<DrawCardsPendingEffect>(
          (effect): effect is DrawCardsPendingEffect => effect.type === PendingEffectType.DrawCards
        )
        const numberOfCubes = this.materialHelper.cubeMaterial
          .player(this.player)
          .location(LocationType.CubeSpotOnEcosystemBoard)
          .locationId(EcosystemActionType.Evolution)
          .getQuantity()
        if (currentDrawCardsAction === undefined) {
          return [
            {
              type: PendingEffectType.DrawCards,
              numberOfCardsToDraw: numberOfCubes
            } as BiotopesPendingEffect
          ].concat(currentPendingEffects ?? [])
        }
        currentDrawCardsAction.numberOfCardsToDraw += numberOfCubes
        return currentPendingEffects
      })
      return [this.startRule(RuleId.DrawCards)]
    }
    return super.onCustomMove(move, _context)
  }
}
