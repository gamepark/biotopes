import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { BoardDescription } from '@gamepark/react-game'
import { EcosystemBoard } from '@gamepark/biotopes/material/EcosystemBoard'
import EcosystemFox from '../images/Boards/Ecosystem/EcosystemFox.jpg'
import EcosystemIbex from '../images/Boards/Ecosystem/EcosystemIbex.jpg'
import EcosystemOwl from '../images/Boards/Ecosystem/EcosystemOwl.jpg'
import EcosystemSalamander from '../images/Boards/Ecosystem/EcosystemSalamander.jpg'
import EcosystemWoodpecker from '../images/Boards/Ecosystem/EcosystemWoodpecker.jpg'

class EcosystemBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType> {
  height = 19
  width = 12.5

  images = {
    [EcosystemBoard.Fox]: EcosystemFox,
    [EcosystemBoard.Ibex]: EcosystemIbex,
    [EcosystemBoard.Owl]: EcosystemOwl,
    [EcosystemBoard.Salamander]: EcosystemSalamander,
    [EcosystemBoard.Woodpecker]: EcosystemWoodpecker
  }
}

export const ecosystemBoardDescription = new EcosystemBoardDescription()
