import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { BiotopesMove } from '../BiotopeTypes'
import { PlayerColor } from '../PlayerColor'
import { EcosystemActionType } from './EcosystemActionType'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'

export enum CustomMoveType {
  ChooseAction = 1,
  PassCycle,
  EndEvolutionAction
}

export type ChooseActionCustomMoveData<T extends EcosystemActionType> = {
  action: T
}

export type ChooseActionCustomMove<T extends EcosystemActionType> = CustomMove<typeof CustomMoveType.ChooseAction, ChooseActionCustomMoveData<T>>

export type PassCycleCustomMove = CustomMove<typeof CustomMoveType.PassCycle, undefined>

export type EndEvolutionActionCustomMove = CustomMove<typeof CustomMoveType.EndEvolutionAction, undefined>

export const isChooseActionCustomMoveType: <T extends EcosystemActionType>(actionType: T) => (move: BiotopesMove) => move is ChooseActionCustomMove<T> =
  <T extends EcosystemActionType>(actionType: T) =>
  (move: BiotopesMove): move is ChooseActionCustomMove<T> =>
    isCustomMoveType<typeof CustomMoveType.ChooseAction, ChooseActionCustomMoveData<T>, PlayerColor, MaterialType, LocationType>(CustomMoveType.ChooseAction)(
      move
    ) && move.data?.action === actionType

export const isExpansionChooseActionCustomMove = isChooseActionCustomMoveType(EcosystemActionType.Expansion)

export const isAdaptationChooseActionCustomMove = isChooseActionCustomMoveType(EcosystemActionType.Adaptation)

export const isEvolutionChooseActionCustomMove = isChooseActionCustomMoveType(EcosystemActionType.Evolution)

export const isMigrationChooseActionCustomMove = isChooseActionCustomMoveType(EcosystemActionType.Migration)

export const isReproductionChooseActionCustomMove = isChooseActionCustomMoveType(EcosystemActionType.Reproduction)
export const isTransferChooseActionCustomMove = isChooseActionCustomMoveType(EcosystemActionType.Transfert)

export const isEndOfEvolutionActionCustomMove: (move: BiotopesMove) => move is EndEvolutionActionCustomMove = isCustomMoveType<
  typeof CustomMoveType.EndEvolutionAction,
  undefined,
  PlayerColor,
  MaterialType,
  LocationType
>(CustomMoveType.EndEvolutionAction)

export const isPassCycleCustomMove: (move: BiotopesMove) => move is PassCycleCustomMove = isCustomMoveType<
  typeof CustomMoveType.PassCycle,
  undefined,
  PlayerColor,
  MaterialType,
  LocationType
>(CustomMoveType.PassCycle)
