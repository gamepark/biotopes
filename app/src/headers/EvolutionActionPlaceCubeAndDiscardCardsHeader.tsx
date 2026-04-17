import { isEndOfEvolutionActionCustomMove } from '@gamepark/biotopes/material/CustomMoveType.ts'
import { HeaderText } from '@gamepark/react-game'
import { FC } from 'react'

export const EvolutionActionPlaceCubeAndDiscardCardsHeader: FC = () => <HeaderText code="evolutionAction.placeCubesDiscardCards" moves={{ end: isEndOfEvolutionActionCustomMove }} />