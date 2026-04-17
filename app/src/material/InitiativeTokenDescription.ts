import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { RoundTokenDescription } from '@gamepark/react-game'
import InitiativeToken from '../images/Token/InitiativeToken.svg?url'

class InitiativeTokenDescription extends RoundTokenDescription<PlayerColor, MaterialType, LocationType> {
  diameter = 1.7
  image = InitiativeToken
}

export const initiativeTokenDescription = new InitiativeTokenDescription()
