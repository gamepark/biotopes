import { BoardDescription, ItemContext, ItemMenuButton } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType.ts'
import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { BiotopeBoard } from '../../../rules/src/material/BiotopeBoard.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import mountainPeatland from '../images/Boards/Biotopes/biotope-mountain-peatland.jpg'
import coniferForest from '../images/Boards/Biotopes/biotope-conifer-forest.jpg'
import woodedCountryside from '../images/Boards/Biotopes/biotope-wooded-countryside.jpg'
import marsh from '../images/Boards/Biotopes/biotope-marsh.jpg'
import alpineGrass from '../images/Boards/Biotopes/biotope-alpine-grass.jpg'
import ripisylve from '../images/Boards/Biotopes/biotopes-ripisylve.jpg'
import mountainPasture from '../images/Boards/Biotopes/biotope-mountain-pasture.jpg'
import alluvialForest from '../images/Boards/Biotopes/biotope-alluvial-forest.jpg'
import { MaterialItem, MaterialMove } from '@gamepark/rules-api'
import React from 'react'
import { isBiotopesCreateItemType } from '@gamepark/biotopes/BiotopeTypes.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointer } from '@fortawesome/free-regular-svg-icons'

class BiotopeBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType, BiotopeBoard, RuleId, PlayerColor> {
  height = 20
  width = 7.3

  images = {
    [BiotopeBoard.MountainPeatland]: mountainPeatland,
    [BiotopeBoard.ConiferForest]: coniferForest,
    [BiotopeBoard.WoodedCountryside]: woodedCountryside,
    [BiotopeBoard.Marsh]: marsh,
    [BiotopeBoard.AlpineGrass]: alpineGrass,
    [BiotopeBoard.Ripisylve]: ripisylve,
    [BiotopeBoard.MountainPasture]: mountainPasture,
    [BiotopeBoard.AlluvialForest]: alluvialForest
  }

  public getItemMenu(
    _item: MaterialItem<PlayerColor, LocationType, BiotopeBoard>,
    _context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>,
    _legalMoves: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[]
  ): React.ReactNode {
    if (
      _context.player !== undefined &&
      (_context.rules.game.view === undefined || _context.rules.game.view === _context.player) &&
      _context.rules.game.rule?.id === RuleId.DrawCubes &&
      _item.location.player === _context.player
    ) {
      const moveToBoard = _legalMoves
        .filter(isBiotopesCreateItemType(MaterialType.Cube))
        .find((m) => m.item.location.type === LocationType.CubeOnBiotopeBoardSpot)
      if (moveToBoard !== undefined) {
        return (
          <>
            <ItemMenuButton move={moveToBoard} x={0} y={-10 + 3.75 * (moveToBoard?.item.location.id ?? 0)}>
              <FontAwesomeIcon icon={faHandPointer} size="lg" />
            </ItemMenuButton>
          </>
        )
      }
    }
    return super.getItemMenu(_item, _context, _legalMoves)
  }

  public isMenuAlwaysVisible(
    _item: MaterialItem<PlayerColor, LocationType, BiotopeBoard>,
    _context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): boolean {
    return (
      (_context.player !== undefined &&
        (_context.rules.game.view === undefined || _context.rules.game.view === _context.player) &&
        _context.rules.game.rule?.id === RuleId.DrawCubes &&
        _item.location.player === _context.player) ||
      super.isMenuAlwaysVisible(_item, _context)
    )
  }
}

export const biotopeBoardDescription = new BiotopeBoardDescription()
