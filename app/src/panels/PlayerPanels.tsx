import { css } from '@emotion/react'
import { BiotopesRules } from '@gamepark/biotopes/BiotopesRules.ts'
import { BiotopesMove } from '@gamepark/biotopes/BiotopeTypes.ts'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { StyledPlayerPanel, usePlay, usePlayerId, usePlayers, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { createPortal } from 'react-dom'
import changeView = MaterialMoveBuilder.changeView

const isPlayerBeingViewed = (me: PlayerColor | undefined, player: PlayerColor, rules: BiotopesRules | undefined) => {
  if (me !== undefined) {
    if (rules?.game.view === undefined) {
      return me === player
    }
    return player === rules.game.view
  }
  if (rules?.game.view === undefined) {
    return player === rules?.game.players[0]
  }
  return player === rules.game.view
}

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const me = usePlayerId<PlayerColor>()
  const rules = useRules<BiotopesRules>()
  const root = document.getElementById('root')
  const play = usePlay<BiotopesMove>()
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel
          key={player.id}
          player={player}
          css={panelPosition(index)}
          onClick={isPlayerBeingViewed(me, player.id, rules) ? undefined : () => play(changeView(player.id))}
          activeRing
        />
      ))}
    </>,
    root
  )
}

const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
  width: 28em;
`

export const playerColorCode: Record<PlayerColor, string> = {
  [PlayerColor.Fox]: 'orange',
  [PlayerColor.Ibex]: 'pink',
  [PlayerColor.Owl]: 'grey',
  [PlayerColor.Salamander]: 'teal',
  [PlayerColor.Woodpecker]: 'green'
}
