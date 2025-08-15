import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { TokenDescription } from '@gamepark/react-game'

class InitiativeTokenDescription extends TokenDescription<PlayerColor, MaterialType, LocationType> {
  // TODO : complete with correct data
  height = 5.6
  width = 8.7
  image = ''
}

export const initiativeTokenDescription = new InitiativeTokenDescription()
