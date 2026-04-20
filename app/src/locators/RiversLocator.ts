import { LocationType } from '@gamepark/biotopes/material/LocationType.ts'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType.ts'
import { SpeciesDietType } from '@gamepark/biotopes/material/SpeciesCard.ts'
import { PlayerColor } from '@gamepark/biotopes/PlayerColor.ts'
import { RuleId } from '@gamepark/biotopes/rules/RuleId.ts'
import { GridBoundaries, GridLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

class RiversLocator extends GridLocator<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  gap = { x: 7.5, y: 5 }
  gridSize = { rows: 3, columns: 3 }

  public getCoordinates(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): Partial<Coordinates> {
    const gridCoordinates = super.getCoordinates(location, context)
    return { ...gridCoordinates, x: (gridCoordinates.x ?? 0) - 7.5, y: (gridCoordinates.y ?? 0) - 15 }
  }

  public getBoundaries(): GridBoundaries | undefined {
    return { xMin: 0, xMax: 2, yMin: SpeciesDietType.Herbivore, yMax: SpeciesDietType.Carnivore }
  }

  public getHoverTransform(
    _item: MaterialItem<PlayerColor, LocationType>,
    _context: ItemContext<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
  ): string[] {
    return super.getHoverTransform(_item, _context).concat('scale(2.5)', 'translateZ(5em)')
  }
}

export const riversLocator = new RiversLocator()
