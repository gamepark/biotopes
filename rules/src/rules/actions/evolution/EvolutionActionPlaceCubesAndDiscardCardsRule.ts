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

export class EvolutionActionPlaceCubesAndDiscardCardsRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {

  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    const freeCubeTypes = xor(
      cubeType,
      this.material(MaterialType.Cube)
        .location(LocationType.CubeSpotOnEcosystemBoard)
        .locationId(EcosystemActionType.Evolution)
        .getItems()
        .map((cube) => cube.location.x! as CubeType))
    return freeCubeTypes.flatMap<BiotopesMove>((cubeType) => {
      if (cubeType === CubeType.Plant) {
        return this.materialHelper.playerCubesOnBiotopeCards.moveItems({
          type: LocationType.CubeSpotOnEcosystemBoard,
          player: this.player,
          id: EcosystemActionType.Evolution,
          x: cubeType
        })
      } else {
        const cardOfTypeIndexes = this.materialHelper.playerSpeciesCardTableau.id<KnownSpeciesCardId>((cardId) => speciesCardCharacteristics[cardId.front].cubeType === cubeType).getIndexes()
        return cardOfTypeIndexes.flatMap((cardIndex) => this.materialHelper.playerCubesOnSpeciesCards.parent(cardIndex).moveItems({
          type: LocationType.CubeSpotOnEcosystemBoard,
          player: this.player,
          id: EcosystemActionType.Evolution,
          x: cubeType
        }))
      }
    })
      .concat(this.materialHelper.playerSpeciesCardHand.moveItems<KnownSpeciesCardId>({ type: LocationType.SpeciesDiscardsSpot }))
      .concat(this.customMove(CustomMoveType.EndEvolutionAction))
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.SpeciesDiscardsSpot) {
      this.memorize<number | undefined>(Memory.NumberOfDiscardedCardForEvolution, (oldValue) => (oldValue ?? 0) + 1)
    }
    return super.afterItemMove(move, _context)
  }

  public onCustomMove(move: CustomMove, _context?: PlayMoveContext): BiotopesMove[] {
    if (isEndOfEvolutionActionCustomMove(move)) {
      this.memorize(Memory.NumberOfCardsToPickForEvolution, this.remind<number>(Memory.NumberOfDiscardedCardForEvolution) + this.materialHelper.cubeMaterial.location(LocationType.CubeSpotOnEcosystemBoard).locationId(EcosystemActionType.Evolution).length)
      this.forget(Memory.NumberOfDiscardedCardForEvolution)
      return [this.startRule(RuleId.EvolutionActionPickCards)]
    }
    return super.onCustomMove(move, _context)
  }
}