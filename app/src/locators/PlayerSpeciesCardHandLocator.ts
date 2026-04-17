import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { HandLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export class PlayerSpeciesCardHandLocator extends HandLocator<PlayerColor, MaterialType, LocationType> {
  radius = 300
  maxAngle = 5
  gapMaxAngle = 2
  clockwise = true
  coordinates = { x: -35, y: -2.5 }

  public hide(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType, number, number>): boolean {
    return item.location.player !== (context.rules.game.view ?? context.player ?? context.rules.players[0])
  }
}

export const playerSpeciesCardHandLocator = new PlayerSpeciesCardHandLocator()
