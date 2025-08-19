import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { RoundTokenDescription } from '@gamepark/react-game'
import CycleToken from '../images/Token/CycleToken.jpg'

class CycleTokenDescription extends RoundTokenDescription<PlayerColor, MaterialType, LocationType> {
  diameter = 2
  image = CycleToken
}

export const cycleTokenDescription = new CycleTokenDescription()
