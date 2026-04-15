import { LocationStrategy, Material } from '@gamepark/rules-api'
import { MaterialItem } from '../../../../../rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerColor } from '../../PlayerColor'

export class BiotopeCubeStrategy implements LocationStrategy<PlayerColor, MaterialType, LocationType> {

  private readonly enforce: boolean = false

  constructor(enforce = false) {
    this.enforce = enforce
  }
  public addItem(_material: Material<PlayerColor, MaterialType, LocationType>, item: MaterialItem<PlayerColor, LocationType>): void {
    if (item.location.id === undefined || this.enforce) {
      item.location.id = item.id
    }
  }

}