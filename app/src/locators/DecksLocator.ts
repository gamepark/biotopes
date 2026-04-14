import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType.ts'
import { SpeciesDietType } from '@gamepark/biotopes/material/SpeciesCard.ts'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class DecksLocator extends DeckLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {

  limit = undefined

  public getCoordinates(location: Location<PlayerColor, LocationType>, _context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    switch (location.y as SpeciesDietType) {
      case SpeciesDietType.Herbivore:
        return { x: -22.5, y: -20 }
      case SpeciesDietType.Insectivore:
        return { x: -22.5, y: -15 }
      case SpeciesDietType.Carnivore:
        return { x: -22.5, y: -10 }
    }
  }

  public getLocationIndex(location: Location<PlayerColor, LocationType>, _context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>): number | undefined {
    return location.x
  }
}

export const decksLocator = new DecksLocator()