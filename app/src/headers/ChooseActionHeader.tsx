import { css } from '@emotion/react'
import {
  isAdaptationChooseActionCustomMove,
  isEvolutionChooseActionCustomMove,
  isExpansionChooseActionCustomMove,
  isPassCycleCustomMove
} from '@gamepark/biotopes/material/CustomMoveType.ts'
import { HeaderText, Picture } from '@gamepark/react-game'
import { FC } from 'react'
import AdaptationSymbol from '../images/Symbols/Adaptation.svg?inline'
import ExpansionSymbol from '../images/Symbols/Expansion.svg?inline'
import EvolutionSymbol from '../images/Symbols/Evolution.svg?inline'

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
        adaptationSymbol: <Picture src={AdaptationSymbol} css={symbolCss} />,
        evolutionSymbol: <Picture src={EvolutionSymbol} css={symbolCss} />,
        expansionSymbol: <Picture src={ExpansionSymbol} css={symbolCss} />
      }}
    />
  )
}

const symbolCss = css`
  width: 0.8em;
  height: 0.8em;
`
