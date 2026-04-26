import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { BoardDescription, ItemContext, ItemMenuButton, MaterialContext } from '@gamepark/react-game'
import EcosystemFox from '../images/Boards/Ecosystem/EcosystemFox.jpg'
import EcosystemIbex from '../images/Boards/Ecosystem/EcosystemIbex.jpg'
import EcosystemOwl from '../images/Boards/Ecosystem/EcosystemOwl.jpg'
import EcosystemSalamander from '../images/Boards/Ecosystem/EcosystemSalamander.jpg'
import EcosystemWoodpecker from '../images/Boards/Ecosystem/EcosystemWoodpecker.jpg'
import { isCustomMoveType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import React from 'react'
import { ChooseActionCustomMoveData, CustomMoveType } from '@gamepark/biotopes/material/CustomMoveType.ts'
import { EcosystemActionType } from '@gamepark/biotopes/material/EcosystemActionType.ts'
import { cubeOnEcosystemBoardLocator } from '../locators/CubeOnEcosystemBoardLocator.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHand } from '@fortawesome/free-regular-svg-icons'

class EcosystemBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType, PlayerColor, RuleId, PlayerColor> {
  height = 19
  width = 12.5

  images = {
    [PlayerColor.Fox]: EcosystemFox,
    [PlayerColor.Ibex]: EcosystemIbex,
    [PlayerColor.Owl]: EcosystemOwl,
    [PlayerColor.Salamander]: EcosystemSalamander,
    [PlayerColor.Woodpecker]: EcosystemWoodpecker
  }

  public getStaticItems(
    _context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): MaterialItem<PlayerColor, LocationType, PlayerColor>[] {
    return _context.rules.players.map((player) => ({
      id: player,
      location: { type: LocationType.EcosystemBoardSpot, player: player }
    }))
  }

  public getItemMenu(
    _item: MaterialItem<PlayerColor, LocationType, PlayerColor>,
    context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    legalMoves: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[]
  ): React.ReactNode {
    if (context.player !== undefined && (context.rules.game.view === undefined || context.rules.game.view === context.player)) {
      if (context.rules.game.rule?.id === RuleId.ChooseAction) {
        const actionMoves = legalMoves.filter(isCustomMoveType<CustomMoveType, ChooseActionCustomMoveData<EcosystemActionType>>(CustomMoveType.ChooseAction))
        if (actionMoves.length > 0) {
          return (
            <>
              {actionMoves.map((move, moveIndex) => {
                const coordinates = cubeOnEcosystemBoardLocator.getCoordinates({ type: LocationType.CubeSpotOnEcosystemBoard, id: move.data!.action })
                if (move.data!.action === EcosystemActionType.Adaptation) {
                  coordinates.x = -5.5
                  coordinates.y = -2
                }
                return (
                  <ItemMenuButton
                    key={`p-action-${move.data!.action}-${moveIndex}`}
                    move={move}
                    x={coordinates.x ?? 0}
                    y={coordinates.y ?? 0}
                    label={<span>{`${EcosystemActionType[move.data!.action]}`}</span>}
                  >
                    <FontAwesomeIcon icon={faHand} size="lg" />
                  </ItemMenuButton>
                )
              })}
            </>
          )
        }
      }
    }
    return super.getItemMenu(_item, context, legalMoves)
  }
}

export const ecosystemBoardDescription = new EcosystemBoardDescription()
