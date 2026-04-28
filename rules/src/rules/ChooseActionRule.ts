import { CustomMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { countBy } from 'es-toolkit'
import { BiotopesMove } from '../BiotopeTypes'
import { CubeType } from '../material/CubeType'
import {
  ChooseActionCustomMoveData,
  CustomMoveType,
  isAdaptationChooseActionCustomMove,
  isCompetitionChooseActionCustomMove,
  isEvolutionChooseActionCustomMove,
  isExpansionChooseActionCustomMove,
  isMigrationChooseActionCustomMove,
  isPassCycleCustomMove,
  isReproductionChooseActionCustomMove,
  isTransferChooseActionCustomMove
} from '../material/CustomMoveType'
import { EcosystemActionType, ecosystemActionType } from '../material/EcosystemActionType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { KnownSpeciesCardId } from '../material/SpeciesCard'
import { speciesCardCharacteristics } from '../material/SpeciesCardCharacteristics'
import { Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { ExpansionActionChooseCubeRule } from './actions/colonization/expansion/ExpansionActionChooseCubeRule'
import { MigrationActionChooseCubeRule } from './actions/colonization/migration/MigrationActionChooseCubeRule'
import { MaterialHelper } from './helpers/MaterialHelper'
import { RuleId } from './RuleId'
import { ReproductionActionPlaceCubeRule } from './actions/reproduction/ReproductionActionPlaceCubeRule'
import { SpeciesCardEffect } from '../material/SpeciesCardEffect'

export class ChooseActionRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): BiotopesMove[] {
    return ecosystemActionType
      .filter((type) => this.canPerformAction(type))
      .map<BiotopesMove>((type) => this.customMove<CustomMoveType, ChooseActionCustomMoveData<typeof type>>(CustomMoveType.ChooseAction, { action: type }))
      .concat(this.customMove<CustomMoveType, undefined>(CustomMoveType.PassCycle))
  }

  public onCustomMove(move: CustomMove, context?: PlayMoveContext): BiotopesMove[] {
    if (isExpansionChooseActionCustomMove(move)) {
      return [this.startRule(RuleId.ExpansionChooseCube)]
    }
    if (isAdaptationChooseActionCustomMove(move)) {
      return [this.startRule(RuleId.AdaptationAction)]
    }
    if (isEvolutionChooseActionCustomMove(move)) {
      return [this.startRule(RuleId.EvolutionActionPlaceCubesAndDiscardCards)]
    }
    if (isMigrationChooseActionCustomMove(move)) {
      return [this.startRule(RuleId.MigrationActionChooseCube)]
    }
    if (isReproductionChooseActionCustomMove(move)) {
      return [this.startRule(RuleId.ReproductionActionPlaceCube)]
    }
    if (isTransferChooseActionCustomMove(move)) {
      return [this.startRule(RuleId.TransferActionChooseCube)]
    }
    if (isCompetitionChooseActionCustomMove(move)) {
      return [this.startRule(RuleId.CompetitionActionChooseCube)]
    }
    if (isPassCycleCustomMove(move)) {
      this.memorize<PlayerColor[] | undefined>(Memory.PassedPlayers, (oldValue) => oldValue?.concat(this.player) ?? [this.player])
      return [this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer)]
    }
    return super.onCustomMove(move, context)
  }

  private canPerformAction(type: EcosystemActionType) {
    switch (type) {
      case EcosystemActionType.Expansion:
        return this.materialHelper.availablePlayerTerritoryToken.exists && new ExpansionActionChooseCubeRule(this.game).getPlayerMoves().length > 0
      case EcosystemActionType.Adaptation:
        return this.canAdaptCardFromHand()
      case EcosystemActionType.Evolution:
        return !this.materialHelper.cubeMaterial.location(LocationType.CubeSpotOnEcosystemBoard).player(this.player).locationId(EcosystemActionType.Evolution)
          .exists
      case EcosystemActionType.Migration:
        return new MigrationActionChooseCubeRule(this.game).getPlayerMoves().length > 0
      case EcosystemActionType.Reproduction:
        return (
          !this.materialHelper.cubeMaterial.location(LocationType.CubeSpotOnEcosystemBoard).player(this.player).locationId(EcosystemActionType.Reproduction)
            .exists && new ReproductionActionPlaceCubeRule(this.game).getPlayerMoves().length > 0
        )
      case EcosystemActionType.Transfert:
        return (
          (this.materialHelper.playerCubesOnBiotopeBoard.exists || this.materialHelper.playerCubesOnSpeciesCards.exists) &&
          !this.materialHelper.cubeMaterial.location(LocationType.CubeSpotOnEcosystemBoard).locationId(EcosystemActionType.Transfert).player(this.player).exists
        )
      default:
        return true
    }
  }

  private canAdaptCardFromHand() {
    const cubeCounts = countBy(
      this.materialHelper.playerCubesOnSpeciesCards.getItems().flatMap((cube) => {
        const parentCard = this.materialHelper.playerSpeciesCardTableau.index(cube.location.parent).getItem<KnownSpeciesCardId>()!
        return Array(cube.quantity ?? 1).fill(speciesCardCharacteristics[parentCard.id.front].cubeType)
      }),
      (cubeType) => cubeType
    )
    cubeCounts[CubeType.Plant] =
      this.materialHelper.playerCubesOnBiotopeBoard.getQuantity() +
      this.materialHelper.playerCubesOnSpeciesCards
        .parent((cardIndex) => {
          const card = this.materialHelper.playerSpeciesCardTableau.index(cardIndex).getItem<KnownSpeciesCardId>()!
          return speciesCardCharacteristics[card.id.front].effect === SpeciesCardEffect.PollinatingSpecies
        })
        .getQuantity()
    return this.materialHelper.playerSpeciesCardHand.getItems<KnownSpeciesCardId>().some((card) => {
      const characteristics = speciesCardCharacteristics[card.id.front]
      return Object.entries(characteristics.diet).every(([cubeTypeString, cubeCount]) => {
        const cubeType = parseInt(cubeTypeString) as CubeType
        return cubeCount <= cubeCounts[cubeType]
      })
    })
  }
}
