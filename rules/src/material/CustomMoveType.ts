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

export const isChooseActionCustomMove: <T extends EcosystemActionType>(move: BiotopesMove) => move is ChooseActionCustomMove<T> = <
  T extends EcosystemActionType
>(
  move: BiotopesMove
) =>
  isCustomMoveType<typeof CustomMoveType.ChooseAction, ChooseActionCustomMoveData<T>, PlayerColor, MaterialType, LocationType>(CustomMoveType.ChooseAction)(
    move
  )

export const isExpansionChooseActionCustomMove: (move: BiotopesMove) => move is ChooseActionCustomMove<typeof EcosystemActionType.Expansion> = (
  move
): move is ChooseActionCustomMove<typeof EcosystemActionType.Expansion> => isChooseActionCustomMove(move) && move.data?.action === EcosystemActionType.Expansion

export const isAdaptationChooseActionCustomMove: (move: BiotopesMove) => move is ChooseActionCustomMove<typeof EcosystemActionType.Adaptation> = (
  move
): move is ChooseActionCustomMove<typeof EcosystemActionType.Adaptation> =>
  isChooseActionCustomMove(move) && move.data?.action === EcosystemActionType.Adaptation

export const isEvolutionChooseActionCustomMove: (move: BiotopesMove) => move is ChooseActionCustomMove<typeof EcosystemActionType.Evolution> = (
  move
): move is ChooseActionCustomMove<typeof EcosystemActionType.Evolution> => isChooseActionCustomMove(move) && move.data?.action === EcosystemActionType.Evolution

export const isMigrationChooseActionCustomMove: (move: BiotopesMove) => move is ChooseActionCustomMove<typeof EcosystemActionType.Migration> = (
  move
): move is ChooseActionCustomMove<typeof EcosystemActionType.Migration> => isChooseActionCustomMove(move) && move.data?.action === EcosystemActionType.Migration

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
