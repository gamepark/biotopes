import { css } from '@emotion/react'
import {
  isAdaptationChooseActionCustomMove,
  isEvolutionChooseActionCustomMove,
  isExpansionChooseActionCustomMove, isMigrationChooseActionCustomMove,
  isPassCycleCustomMove
} from '@gamepark/biotopes/material/CustomMoveType.ts'
import { HeaderText, Picture } from '@gamepark/react-game'
import { FC } from 'react'
import adaptationSymbol from '../images/Symbols/Adaptation.svg?inline'
import expansionSymbol from '../images/Symbols/Expansion.svg?inline'
import evolutionSymbol from '../images/Symbols/Evolution.svg?inline'
import migrationSymbol from '../images/Symbols/Migration.svg?inline'

export const ChooseActionHeader: FC = () => {
  return (
    <HeaderText
      code="chooseAction"
      moves={{
        adaptation: isAdaptationChooseActionCustomMove,
        evolution: isEvolutionChooseActionCustomMove,
        expansion: isExpansionChooseActionCustomMove,
        migration: isMigrationChooseActionCustomMove,
        pass: isPassCycleCustomMove
      }}
      components={{
        adaptationSymbol: <Picture src={adaptationSymbol} css={symbolCss} />,
        evolutionSymbol: <Picture src={evolutionSymbol} css={symbolCss} />,
        expansionSymbol: <Picture src={expansionSymbol} css={symbolCss} />,
        migrationSymbol: <Picture src={migrationSymbol} css={symbolCss} />
      }}
    />
  )
}

const symbolCss = css`
  width: 0.8em;
  height: 0.8em;
`
