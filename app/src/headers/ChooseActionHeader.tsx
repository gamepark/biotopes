import { FC } from 'react'
import { HeaderText } from '@gamepark/react-game'
import { isChooseActionCustomMove, isPassCycleCustomMove } from '@gamepark/biotopes/material/CustomMoveType.ts'
import { EcosystemActionType } from '@gamepark/biotopes/material/EcosystemActionType.ts'

export const ChooseActionHeader: FC = () => (
  <HeaderText
    code="chooseAction"
    moves={{ expansion: (move) => isChooseActionCustomMove(move) && move.data?.action === EcosystemActionType.Expansion, pass: isPassCycleCustomMove }}
  />
)
