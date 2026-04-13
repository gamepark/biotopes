import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { BiotopesMove } from '../BiotopeTypes'
import { PlayerColor } from '../PlayerColor'
import { EcosystemActionType } from './EcosystemActionType'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'

export enum CustomMoveType {
  ChooseAction = 1,
  PassCycle
}

export type ChooseActionCustomMoveData<T extends EcosystemActionType> = {
  action: T
}

export type ChooseActionCustomMove<T extends EcosystemActionType> = CustomMove<typeof CustomMoveType.ChooseAction, ChooseActionCustomMoveData<T>>

export type PassCycleCustomMove = CustomMove<typeof CustomMoveType.PassCycle, undefined>

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

export const isPassCycleCustomMove: (move: BiotopesMove) => move is PassCycleCustomMove = isCustomMoveType<
  typeof CustomMoveType.PassCycle,
  undefined,
  PlayerColor,
  MaterialType,
  LocationType
>(CustomMoveType.PassCycle)
