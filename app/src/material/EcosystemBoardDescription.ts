import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import EcosystemFox from '../images/Boards/Ecosystem/EcosystemFox.jpg'
import EcosystemIbex from '../images/Boards/Ecosystem/EcosystemIbex.jpg'
import EcosystemOwl from '../images/Boards/Ecosystem/EcosystemOwl.jpg'
import EcosystemSalamander from '../images/Boards/Ecosystem/EcosystemSalamander.jpg'
import EcosystemWoodpecker from '../images/Boards/Ecosystem/EcosystemWoodpecker.jpg'
import { MaterialItem } from '@gamepark/rules-api'

class EcosystemBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType> {
  height = 19
  width = 12.5

  images = {
    [PlayerColor.Fox]: EcosystemFox,
    [PlayerColor.Ibex]: EcosystemIbex,
    [PlayerColor.Owl]: EcosystemOwl,
    [PlayerColor.Salamander]: EcosystemSalamander,
    [PlayerColor.Woodpecker]: EcosystemWoodpecker
  }

  getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<number, LocationType>[] {
    return _context.rules.players.map((player) => ({
      id: player,
      location: { type: LocationType.EcosystemBoardSpot, player: player }
    }))
  }
}

export const ecosystemBoardDescription = new EcosystemBoardDescription()
