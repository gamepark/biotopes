import { EcosystemActionType } from './EcosystemActionType'
import { CustomMove, isCustomMoveType } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { MaterialType } from './MaterialType'
import { LocationType } from './LocationType'
import { BiotopesMove } from '../BiotopeTypes'

export enum CustomMoveType {
  ChooseAction = 1,
  PassCycle
}

export type ChooseActionCustomMoveData = {
  action: EcosystemActionType
}

export type ChooseActionCustomMove = CustomMove<typeof CustomMoveType.ChooseAction, ChooseActionCustomMoveData>

export type PassCycleCustomMove = CustomMove<typeof CustomMoveType.PassCycle, undefined>

export const isChooseActionCustomMove: (move: BiotopesMove) => move is ChooseActionCustomMove = isCustomMoveType<
  typeof CustomMoveType.ChooseAction,
  ChooseActionCustomMoveData,
  PlayerColor,
  MaterialType,
  LocationType
>(CustomMoveType.ChooseAction)

export const isPassCycleCustomMove: (move: BiotopesMove) => move is PassCycleCustomMove = isCustomMoveType<
  typeof CustomMoveType.PassCycle,
  undefined,
  PlayerColor,
  MaterialType,
  LocationType
>(CustomMoveType.PassCycle)
