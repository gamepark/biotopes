import { LocationStrategy, Material, MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { KnownSpeciesCardId, SpeciesCardId, SpeciesDietType } from '../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../material/SpeciesCardCharacteristics'
import { PlayerColor } from '../../PlayerColor'

export class SpeciesStrategy<Strategy extends LocationStrategy> implements LocationStrategy<PlayerColor, MaterialType, LocationType> {
  private readonly herbivoreDelegate: Strategy
  private readonly insectivoreDelegate: Strategy
  private readonly carnivoreDelegate: Strategy

  constructor(type: {new(): Strategy}) {
    this.herbivoreDelegate = new type()
    this.insectivoreDelegate = new type()
    this.carnivoreDelegate = new type()
  }

  public addItem(material: Material<PlayerColor, MaterialType, LocationType>, item: MaterialItem<PlayerColor, LocationType, KnownSpeciesCardId>): void {
    const dietType = speciesCardCharacteristics[item.id.front].dietType
    const delegate = this.getDelegateFromCardId(dietType)
    item.location.y = dietType
    delegate?.addItem?.(material.location((l) => l.y === dietType), item)
  }

  public moveItem(material: Material<PlayerColor, MaterialType, LocationType>, item: MaterialItem<PlayerColor, LocationType, KnownSpeciesCardId>, index: number): void {
    const dietType = speciesCardCharacteristics[item.id.front].dietType
    const delegate = this.getDelegateFromCardId(dietType)
    delegate?.moveItem?.(material.location((l) => l.y === dietType), item, index)
  }

  public removeItem(material: Material<PlayerColor, MaterialType, LocationType>, item: MaterialItem<PlayerColor, LocationType, SpeciesCardId>): void {
    const dietType = Math.floor(item.id.back / 10) as SpeciesDietType
    const delegate = this.getDelegateFromCardId(dietType)
    delegate?.removeItem?.(material.location((l) => l.y === dietType), item)
  }

  private getDelegateFromCardId(dietType: SpeciesDietType) {
    switch (dietType) {
      case SpeciesDietType.Herbivore:
        return this.herbivoreDelegate
      case SpeciesDietType.Insectivore:
        return this.insectivoreDelegate
      case SpeciesDietType.Carnivore:
        return this.carnivoreDelegate
    }
  }
}