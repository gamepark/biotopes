import { css } from '@emotion/react'
import {
  isAdaptationChooseActionCustomMove,
  isEvolutionChooseActionCustomMove,
  isExpansionChooseActionCustomMove,
  isPassCycleCustomMove
} from '@gamepark/biotopes/material/CustomMoveType.ts'
import { HeaderText } from '@gamepark/react-game'
import { FC } from 'react'
import AdaptationSymbol from '../images/Symbols/Adaptation.svg?react'
import ExpansionSymbol from '../images/Symbols/Expansion.svg?react'
import EvolutionSymbol from '../images/Symbols/Evolution.svg?react'

export const ChooseActionHeader: FC = () => {
  return (
    <HeaderText
      code="chooseAction"
      moves={{
        adaptation: isAdaptationChooseActionCustomMove,
        evolution: isEvolutionChooseActionCustomMove,
        expansion: isExpansionChooseActionCustomMove,
        pass: isPassCycleCustomMove
      }}
      components={{
        adaptationSymbol: <AdaptationSymbol css={symbolCss} />,
        evolutionSymbol: <EvolutionSymbol css={symbolCss} />,
        expansionSymbol: <ExpansionSymbol css={symbolCss} />
      }}
    />
  )
}

const symbolCss = css`
  width: 0.8em;
  height: 0.8em;
`
