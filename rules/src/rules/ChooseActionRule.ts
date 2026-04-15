import { CustomMove, PlayMoveContext } from '@gamepark/rules-api'
import { countBy } from 'es-toolkit'
import { BiotopesMove } from '../BiotopeTypes'
import { CubeType } from '../material/CubeType'
import {
  ChooseActionCustomMoveData,
  CustomMoveType,
  isAdaptationChooseActionCustomMove,
  isExpansionChooseActionCustomMove,
  isPassCycleCustomMove
} from '../material/CustomMoveType'
import { EcosystemActionType, ecosystemActionType } from '../material/EcosystemActionType'
import { KnownSpeciesCardId } from '../material/SpeciesCard'
import { speciesCardCharacteristics } from '../material/SpeciesCardCharacteristics'
import { Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { ExpansionActionChooseCubeRule } from './actions/colonization/expansion/ExpansionActionChooseCubeRule'
import { BiotopesPlayerTurnRule } from './BiotopesPlayerTurnRule'
import { RuleId } from './RuleId'

export class ChooseActionRule extends BiotopesPlayerTurnRule {
  public getPlayerMoves(): BiotopesMove[] {
    return ecosystemActionType
      .filter((type) => this.canPerformAction(type))
      .map(
        (type) =>
          this.customMove<CustomMoveType, ChooseActionCustomMoveData<typeof type>>(CustomMoveType.ChooseAction, { action: type }) as BiotopesMove
      )
      .concat(this.customMove<CustomMoveType, undefined>(CustomMoveType.PassCycle))
  }

  public onCustomMove(move: CustomMove, context?: PlayMoveContext): BiotopesMove[] {
    if (isExpansionChooseActionCustomMove(move)) {
      return [this.startRule(RuleId.ExpansionChooseCube)]
    }
    if (isAdaptationChooseActionCustomMove(move)) {
      return [this.startRule(RuleId.AdaptationAction)]
    }
    if (isPassCycleCustomMove(move)) {
      this.memorize<PlayerColor[] | undefined>(Memory.PassedPlayers, (oldValue) => oldValue?.concat(this.player) ?? [this.player])
      return [this.startPlayerTurn(this.nextPlayer === this.player ? RuleId.EndOfCycle : RuleId.ChooseAction, this.nextPlayer)]
    }
    return super.onCustomMove(move, context)
  }

  private canPerformAction(type: EcosystemActionType) {
    switch (type) {
      case EcosystemActionType.Expansion:
        return new ExpansionActionChooseCubeRule(this.game).getPlayerMoves().length > 0
      case EcosystemActionType.Adaptation:
        return this.canAdaptCardFromHand()
      default:
        return true
    }
  }

  private canAdaptCardFromHand() {
    const cubeCounts = countBy(this.playerCubesOnSpeciesCards.getItems().map((cube) => {
      const parentCard = this.playerSpeciesCardTableau.index(cube.location.parent).getItem<KnownSpeciesCardId>()!
      return speciesCardCharacteristics[parentCard.id.front].cubeType
    }), (cubeType) => cubeType)
    cubeCounts[CubeType.Plant] = this.playerCubesOnBiotopeCards.length
    return this.playerSpeciesCardHand.getItems<KnownSpeciesCardId>().some((card) => {
      const characteristics = speciesCardCharacteristics[card.id.front]
      return Object.entries(characteristics.diet).every(([cubeTypeString, cubeCount]) => {
        const cubeType = parseInt(cubeTypeString) as CubeType
        return cubeCount <= cubeCounts[cubeType]
      })
    })
  }
}
