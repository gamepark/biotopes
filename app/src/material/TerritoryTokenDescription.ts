import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor'
import { RoundTokenDescription } from '@gamepark/react-game'
import FoxTerritoryToken from '../images/Token/PlayerTerritoryToken/FoxTerritoryToken.jpg'
import IbexTerritoryToken from '../images/Token/PlayerTerritoryToken/IbexTerritoryToken.jpg'
import OwlTerritoryToken from '../images/Token/PlayerTerritoryToken/OwlTerritoryToken.jpg'
import SalamanderTerritoryToken from '../images/Token/PlayerTerritoryToken/SalamanderTerritoryToken.jpg'
import WoodpeckerTerritoryToken from '../images/Token/PlayerTerritoryToken/WoodpeckerTerritoryToken.jpg'

class TerritoryTokenDescription extends RoundTokenDescription<PlayerColor, MaterialType, LocationType> {
  diameter = 1.6
  images = {
    [PlayerColor.Fox]: FoxTerritoryToken,
    [PlayerColor.Ibex]: IbexTerritoryToken,
    [PlayerColor.Owl]: OwlTerritoryToken,
    [PlayerColor.Salamander]: SalamanderTerritoryToken,
    [PlayerColor.Woodpecker]: WoodpeckerTerritoryToken
  }
}

export const territoryTokenDescription = new TerritoryTokenDescription()
