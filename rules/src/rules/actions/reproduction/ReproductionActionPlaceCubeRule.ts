import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { CubeType } from '../../../material/CubeType'
import { EcosystemActionType } from '../../../material/EcosystemActionType'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { KnownSpeciesCardId } from '../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../material/SpeciesCardCharacteristics'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { RuleId } from '../../RuleId'
import { SpeciesCardEffect } from '../../../material/SpeciesCardEffect'
import { BiotopesPendingEffect } from '../../../material/effects/PendingEffect'
import { Memory } from '../../../Memory'
import { PendingEffectType } from '../../../material/effects/PendingEffectType'
import { BiotopeBoard } from '../../../material/BiotopeBoard'

const boardIdsWithFecundSpeciesEffect = [BiotopeBoard.WoodedCountryside, BiotopeBoard.Marsh, BiotopeBoard.AlpineGrass, BiotopeBoard.AlluvialForest]

export class ReproductionActionPlaceCubeRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    return this.materialHelper.playerCubesOnSpeciesCards
      .parent((cardIndex) => {
        const parentCard = this.materialHelper.playerSpeciesCardTableau.index(cardIndex).getItem<KnownSpeciesCardId>()!
        const cardCubeType = speciesCardCharacteristics[parentCard.id.front].cubeType
        return cardCubeType === CubeType.AmphibianReptile || cardCubeType === CubeType.Insect
      })
      .moveItems({ type: LocationType.CubeSpotOnEcosystemBoard, id: EcosystemActionType.Reproduction, player: this.player })
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (
      isBiotopesMoveItemType(MaterialType.Cube)(move) &&
      move.location.type === LocationType.CubeSpotOnEcosystemBoard &&
      move.location.id === EcosystemActionType.Reproduction
    ) {
      const fecundSpeciesMaterial = this.materialHelper.playerSpeciesCardTableau.id<KnownSpeciesCardId>(
        (cardId) => speciesCardCharacteristics[cardId.front].effect === SpeciesCardEffect.FecundSpecies
      )
      const playerBoardId = this.material(MaterialType.BiotopeBoard).player(this.player).getItem<BiotopeBoard>()!.id
      const numberOfCubesFromBoard = boardIdsWithFecundSpeciesEffect.includes(playerBoardId) ? 1 : 0
      if (fecundSpeciesMaterial.exists || numberOfCubesFromBoard === 1) {
        this.memorize<BiotopesPendingEffect[] | undefined>(Memory.PendingEffects, (currentPendingEffects) =>
          [
            {
              type: PendingEffectType.DrawCubes,
              numberOfCubesToDraw: Math.min(fecundSpeciesMaterial.getQuantity() + numberOfCubesFromBoard, 3),
              ruleWhenFinished: RuleId.ReproductionActionCreateCubes
            } as BiotopesPendingEffect
          ].concat(currentPendingEffects ?? [])
        )
        return [this.startRule(RuleId.DrawCubes)]
      }
      return [this.startRule(RuleId.ReproductionActionCreateCubes)]
    }
    return super.afterItemMove(move, _context)
  }
}
