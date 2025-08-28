import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { FlatMaterialDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import ClothBag from '../images/ClothBag.png'

class ClothBagDescription extends FlatMaterialDescription<PlayerColor, MaterialType, LocationType> {
  height = 14
  width = 11

  image = ClothBag

  getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<number, LocationType>[] {
    return _context.rules.players.map((player) => ({
      location: { type: LocationType.PlayerClothBagSpot, player: player }
    }))
  }
}

export const clothBagDescription = new ClothBagDescription()
