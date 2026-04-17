import { FillGapStrategy, Material, MaterialItem } from '@gamepark/rules-api'
import { isEqual } from 'es-toolkit'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { KnownSpeciesCardId } from '../../material/SpeciesCard'
import { PlayerColor } from '../../PlayerColor'

export class SpeciesRiverStrategy extends FillGapStrategy<PlayerColor, MaterialType, LocationType> {
  public moveItem(material: Material<PlayerColor, MaterialType, LocationType>, item: MaterialItem<PlayerColor, LocationType>): void {
    const destination = item.location.x
    if (material.length === 3) {
      item.location.x = material.id<KnownSpeciesCardId>((cardId) => isEqual(cardId, item.id)).getItem()!.location.x!
    } else if (destination === 2) {
      if (material.location((l) => l.x === 2).exists) {
        item.location.x = 1
      }
    }
  }

  public removeItem(material: Material<PlayerColor, MaterialType, LocationType>, item: MaterialItem<PlayerColor, LocationType>): void {
    if (item.location.x! > (2 - material.length)) {
      material.location((l) => l.x! < item.location.x!).getItems().forEach((card) => card.location.x! += 1)
    }
  }

}