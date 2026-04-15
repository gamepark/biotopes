import { FillGapStrategy, Material, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'

export class SpeciesRiverStrategy extends FillGapStrategy<PlayerColor, MaterialType, LocationType> {
  public moveItem(material: Material<PlayerColor, MaterialType, LocationType>, item: MaterialItem<PlayerColor, LocationType>): void {
    const destination = item.location.x
    if (destination === 2) {
      if (material.location((l) => l.x === 2).exists) {
        item.location.x = 1
      }
    }
  }


}