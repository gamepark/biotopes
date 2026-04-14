import { MaterialGameSetup, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { randomInt, sample, sampleSize } from 'es-toolkit'
import { BiotopesOptions } from './BiotopesOptions'
import { BiotopesRules } from './BiotopesRules'
import { EnvironmentalConditionsBoardSide } from './EnvironmentalConditionsBoardSide'
import { advancedCardsByBiotope, basicBiotopeCards, getBiotopeCardTypes } from './material/BiotopeCard'
import { BiotopeType, biotopeType } from './material/BiotopeType'
import { biotopeEnvironmentalConditionTokens, speciesTypeEnvironmentalConditionTokens } from './material/EnvironmentalConditionToken'
import { LandscapeTile, landscapeTiles } from './material/LandscapeTile'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { SpeciesCardId, speciesCards, SpeciesCardType, SpeciesDietType, speciesDietTypes } from './material/SpeciesCard'
import { speciesCardCharacteristics } from './material/SpeciesCardCharacteristics'
import { Memory } from './Memory'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

const landscapeSetupCoordinate: Record<number, (XYCoordinates & { rotation?: number } & { id?: LandscapeTile })[]> = {
  2: [
    { x: -2, y: -1, rotation: 0, id: LandscapeTile.A1 },
    { x: 1, y: -2, rotation: 1, id: LandscapeTile.A2 },
    { x: -1, y: 1, rotation: 3, id: LandscapeTile.A3 },
    { x: 2, y: 0, rotation: 1, id: LandscapeTile.A4 }
  ],
  3: [
    { x: -3, y: -1 },
    { x: 0, y: -2 },
    { x: 3, y: -3 },
    { x: -2, y: 1 },
    { x: 1, y: 0 },
    { x: -1, y: 3 }
  ],
  4: [
    { x: 0, y: -3 },
    { x: -2, y: 0 },
    { x: 1, y: -1 },
    { x: 4, y: -2 },
    { x: -4, y: 3 },
    { x: -1, y: 2 },
    { x: 2, y: 1 },
    { x: 0, y: 4 }
  ],
  5: [
    { x: 0, y: -3 },
    { x: 3, y: -4 },
    { x: -2, y: 0 },
    { x: 1, y: -1 },
    { x: 4, y: -2 },
    { x: -4, y: 3 },
    { x: -1, y: 2 },
    { x: 2, y: 1 },
    { x: -3, y: 5 },
    { x: 0, y: 4 }
  ]
}

/**
 * This class creates a new Game based on the game options
 */
export class BiotopesSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, BiotopesOptions, RuleId, PlayerColor> {
  Rules = BiotopesRules

  setupMaterial(options: Partial<BiotopesOptions>) {
    this.memorize<EnvironmentalConditionsBoardSide>(Memory.AntSide, EnvironmentalConditionsBoardSide.Butterfly)
    this.setupLandscape()
    this.setupTokens()
    this.setupCubes()
    this.setupBiotopeCards(options.advancedBiotopes ?? false)
    this.setupDecks()
    this.setupHands()
  }

  start() {
    this.startPlayerTurn(RuleId.GameSetupHandMulligan, this.players[0])
  }

  setupLandscape() {
    const polyHexes = landscapeTiles
    this.material(MaterialType.LandscapeTile).createItemsAtOnce(
      landscapeSetupCoordinate[this.rules.players.length].map((value, index) => {
        const { x, y } = value
        const currentPolyHex = sample(polyHexes)
        const currentPolyHexIndex = polyHexes.indexOf(currentPolyHex)
        polyHexes.splice(currentPolyHex > LandscapeTile.A10 ? currentPolyHexIndex : currentPolyHexIndex + 10 - index, 1)
        polyHexes.splice(currentPolyHex > LandscapeTile.A10 ? currentPolyHexIndex - 10 + index : currentPolyHexIndex, 1)
        return {
          id: currentPolyHex,
          location: { type: LocationType.CentralLandscapeSpot, x: x, y: y, rotation: randomInt(6) }
        }
      })
    )
  }

  setupTokens() {
    this.material(MaterialType.InitiativeToken).createItem({
      location: { type: LocationType.PlayerInitiativeTokenSpot, player: this.players[0] }
    })
    this.material(MaterialType.CycleToken).createItem({
      location: { type: LocationType.CycleTokenSpotOnEnvironmentalConditionsBoard, x: 1 }
    })
    this.material(MaterialType.EnvironmentalConditionToken).createItemsAtOnce(
      sampleSize(biotopeEnvironmentalConditionTokens, 2)
        .concat(sampleSize(speciesTypeEnvironmentalConditionTokens, 2))
        .map((id) => ({
          id: id,
          location: { type: LocationType.EnvironmentalConditionTokenSpotOnEnvironmentalConditionsBoard }
        }))
    )
    this.material(MaterialType.TerritoryToken).createItemsAtOnce(
      this.players.flatMap((player) =>
        new Array(12).fill({
          id: player,
          location: { type: LocationType.TerritoryTokenSpotOnEcosystemBoard, player: player }
        })
      )
    )
  }

  setupCubes() {
    const cubes = biotopeType.map(
      (biotope) =>
        ({
          id: biotope,
          location: { type: LocationType.CubeStockpileSpot, id: biotope },
          quantity: this.game.players.length * 8
        }) as MaterialItem<PlayerColor, LocationType, BiotopeType>
    )
    this.material(MaterialType.Cube).createItems(cubes)
  }

  setupBiotopeCards(advancedBiotopes: boolean) {
    if (advancedBiotopes) {
      this.material(MaterialType.BiotopesCard).createItems(
        biotopeType.flatMap((biotope) =>
          advancedCardsByBiotope[biotope].map((card) => ({
            id: card,
            location: { type: LocationType.AdvancedBiotopesSelectionSpot, id: biotope }
          }))
        )
      )
    } else {
      this.material(MaterialType.BiotopesCard).createItems(
        this.rules.players.flatMap((player) =>
          basicBiotopeCards.map((card) => ({
            id: card,
            location: { type: LocationType.PlayerBiotopesCardSpot, player: player, id: getBiotopeCardTypes(card) }
          }))
        )
      )
    }
  }

  setupDecks() {
    this.material(MaterialType.SpeciesCard).createItemsAtOnce(
      speciesCards.map((card) => ({
        id: { front: card, back: speciesCardCharacteristics[card].speciesType },
        location: { type: LocationType.SpeciesDecksSpot }
      }))
    )
    speciesDietTypes.forEach((deck) => this.material(MaterialType.SpeciesCard).location(LocationType.SpeciesDecksSpot).location((l) => l.y === deck).shuffle())
  }

  private setupHands() {
    const herbivoresDeckMaterial = this.material(MaterialType.SpeciesCard).location(LocationType.SpeciesDecksSpot).location((l) => l.y === SpeciesDietType.Herbivore).deck()
    const mountainHerbivores = herbivoresDeckMaterial.id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreMountain)
    const forestHerbivores = herbivoresDeckMaterial.id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreForest)
    const meadowHerbivores = herbivoresDeckMaterial.id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreMeadow)
    const wetlandsHerbivores = herbivoresDeckMaterial.id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreWetland)
    this.players.forEach((player, index) => {
      herbivoresDeckMaterial.index([
        mountainHerbivores.entries[index][0],
        forestHerbivores.entries[index][0],
        meadowHerbivores.entries[index][0],
        wetlandsHerbivores.entries[index][0]
      ])
        .dealAtOnce(
          {
            type: LocationType.PlayerSpeciesCardHandSpot,
            player: player
          },
          4
        )
    })
  }
}
