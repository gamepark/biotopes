import { FC } from 'react'
import { HeaderText } from '@gamepark/react-game'
import { isBiotopesMoveItemAtOnce, isBiotopesStartPlayerTurn } from '@gamepark/biotopes/BiotopeTypes.ts'

export const GameSetupHandMulliganHeader:  FC = () => {
  return <HeaderText code="gameSetup.handMulligan" moves={{discard: isBiotopesMoveItemAtOnce, pass: isBiotopesStartPlayerTurn}} />
}