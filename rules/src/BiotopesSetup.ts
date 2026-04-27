import { MaterialGameSetup, XYCoordinates } from '@gamepark/rules-api'
import { randomInt, sample, sampleSize } from 'es-toolkit'
import { BiotopesOptions } from './BiotopesOptions'
import { BiotopesRules } from './BiotopesRules'
import { biotopeEnvironmentalConditionTokens, speciesTypeEnvironmentalConditionTokens } from './material/EnvironmentalConditionToken'
import { LandscapeTile, landscapeTiles } from './material/LandscapeTile'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { speciesCards, speciesDietTypes } from './material/SpeciesCard'
import { speciesCardCharacteristics } from './material/SpeciesCardCharacteristics'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { biotopeBoards } from './material/BiotopeBoard'

const landscapeSetupCoordinate: Record<number, (XYCoordinates & { rotation?: number } & { id?: LandscapeTile })[]> = {
  2: [
    { x: -2, y: -1 },
    { x: 1, y: -2 },
    { x: -1, y: 1 },
    { x: 2, y: 0 }
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
    { x: -2, y: -2 },
    { x: 1, y: -3 },
    { x: 4, y: -4 },
    { x: -1, y: 0 },
    { x: 2, y: -1 },
    { x: -3, y: 3 },
    { x: 0, y: 2 },
    { x: 3, y: 1 }
  ]
  // 5: [
  //   { x: 0, y: -3 },
  //   { x: 3, y: -4 },
  //   { x: -2, y: 0 },
  //   { x: 1, y: -1 },
  //   { x: 4, y: -2 },
  //   { x: -4, y: 3 },
  //   { x: -1, y: 2 },
  //   { x: 2, y: 1 },
  //   { x: -3, y: 5 },
  //   { x: 0, y: 4 }
  // ]
}

/**
 * This class creates a new Game based on the game options
 */
export class BiotopesSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, BiotopesOptions, RuleId, PlayerColor> {
  Rules = BiotopesRules

  setupMaterial(_options: Partial<BiotopesOptions>) {
    this.setupLandscape()
    this.setupTokens()
    this.setupBiotopeBoard()
    this.setupDecks()
  }

  start() {
    this.startPlayerTurn(RuleId.GameSetupBiotopeBoardSelection, this.players[0])
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

  setupBiotopeBoard() {
    const boards = sampleSize(biotopeBoards, 2 * this.players.length)
    this.material(MaterialType.BiotopeBoard).createItemsAtOnce(
      this.players.flatMap((p, index) => {
        return boards.slice(2 * index, 2 * index + 2).map((board) => ({
          id: board,
          location: {
            type: LocationType.BiotopeBoardSelectionSpot,
            player: p
          }
        }))
      })
    )
  }

  setupDecks() {
    this.material(MaterialType.SpeciesCard).createItemsAtOnce(
      speciesCards.map((card) => ({
        id: { front: card, back: speciesCardCharacteristics[card].speciesType },
        location: { type: LocationType.SpeciesDecksSpot }
      }))
    )
    speciesDietTypes.forEach((deck) =>
      this.material(MaterialType.SpeciesCard)
        .location(LocationType.SpeciesDecksSpot)
        .location((l) => l.y === deck)
        .shuffle()
    )
  }
}
