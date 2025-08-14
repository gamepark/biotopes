/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { MaterialGame } from '@gamepark/rules-api'
import { centralLandscapeLocator } from './locators/CentralLandscapeLocator'
import { ecosystemBoardDescription } from './material/EcosystemBoardDescription'

export function GameDisplay({ game }: { game: MaterialGame }) {
  const margin = { top: 7, left: 0, right: 30, bottom: 0 }
  const landscapeSize = centralLandscapeLocator.getLandscapeSize(game)
  const verticalSpaceForPlayers = (ecosystemBoardDescription.height + 2) * 2
  const yMax = (landscapeSize.height + verticalSpaceForPlayers) / 2
  const yMin = -yMax
  return (
    <>
      <GameTable xMin={-50} xMax={50} yMin={yMin} yMax={yMax} margin={margin} css={process.env.NODE_ENV === 'development' && tableBorder}>
        <GameTableNavigation />
        <PlayerPanels />
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
