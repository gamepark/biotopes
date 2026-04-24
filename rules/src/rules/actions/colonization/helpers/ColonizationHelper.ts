import { getHexagonsAtDistance, ItemMove, MaterialRulesPart, PlayMoveContext, XYCoordinates } from '@gamepark/rules-api'
import { isEqual, uniq } from 'es-toolkit'
import { range } from 'es-toolkit/compat'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../../BiotopeTypes'
import { BiotopeType } from '../../../../material/BiotopeType'
import { LocationType } from '../../../../material/LocationType'
import { MaterialType } from '../../../../material/MaterialType'
import { PlayerColor } from '../../../../PlayerColor'
import { LandscapeHelper } from '../../../helpers/LandscapeHelper'
import { MaterialHelper } from '../../../helpers/MaterialHelper'
import { RuleId } from '../../../RuleId'
import { EcosystemActionType } from '../../../../material/EcosystemActionType'
import { KnownSpeciesCardId } from '../../../../material/SpeciesCard'
import { speciesCardCharacteristics } from '../../../../material/SpeciesCardCharacteristics'
import { SpeciesCardEffect } from '../../../../material/SpeciesCardEffect'
import { BiotopesPendingEffect } from '../../../../material/effects/PendingEffect'
import { Memory } from '../../../../Memory'
import { PendingEffectType } from '../../../../material/effects/PendingEffectType'

export class ColonizationHelper extends MaterialRulesPart<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly landscapeHelper = new LandscapeHelper(this.game)
  private readonly materialHelper = new MaterialHelper(this.game)

  public computeReachableBiotopeTypes(distance: number = 1): BiotopeType[] {
    return uniq(
      this.computeReachableHexes(distance)
        .map((coords) => this.landscapeHelper.landscape.getValue(coords))
        .filter((biotope) => biotope !== undefined)
    )
  }

  public computeReachableHexes(distance: number = 1): XYCoordinates[] {
    const otherTokensCoords = this.materialHelper.centralLandscapeTerritoryTokenMaterial.getItems().map((token) => ({
      x: token.location.x!,
      y: token.location.y!
    }))
    return this.materialHelper.playerTerritoryTokenOnCentralLandscape
      .getItems()
      .flatMap((token) => this.computeReachableHexesFromCoords({ x: token.location.x!, y: token.location.y! }, otherTokensCoords, distance))
  }

  public computeReachableHexesOfType(biotopeType: BiotopeType, distance: number = 1): XYCoordinates[] {
    return this.computeReachableHexes(distance).filter((coords) => this.landscapeHelper.landscape.getValue(coords) === biotopeType)
  }

  public computeReachableHexesFromCoords(coords: XYCoordinates, otherTokenCoordinates: XYCoordinates[], distance: number = 1): XYCoordinates[] {
    return range(1, distance + 1)
      .flatMap((dist) => getHexagonsAtDistance(coords, dist))
      .filter((coords) => otherTokenCoordinates.find((otherTokenCoords) => isEqual(coords, otherTokenCoords)) === undefined)
  }

  public computeReachableHexesOfTypeFromCoords(
    coords: XYCoordinates,
    otherTokenCoordinates: XYCoordinates[],
    biotopeType: BiotopeType,
    distance: number = 1
  ): XYCoordinates[] {
    return this.computeReachableHexesFromCoords(coords, otherTokenCoordinates, distance).filter(
      (coords) => this.landscapeHelper.landscape.getValue(coords) === biotopeType
    )
  }

  public getPlaceTerritoryTokenMoves(destinationBiotope: BiotopeType): BiotopesMove[] {
    return this.computeReachableHexesOfType(destinationBiotope).map(({ x, y }) =>
      this.materialHelper.availablePlayerTerritoryToken.moveItem({
        type: LocationType.CentralLandscapeSpot,
        x: x,
        y: y
      })
    )
  }

  public getMigrationMoveTerritoryTokenMoves(destinationBiotope: BiotopeType) {
    return this.materialHelper.playerTerritoryTokenOnCentralLandscape.getItems().flatMap((token, index) => {
      const centralLandscapeTokenMaterial = this.materialHelper.centralLandscapeTerritoryTokenMaterial
      const otherTokenCoordinates = centralLandscapeTokenMaterial.getItems().map((token) => ({ x: token.location.x!, y: token.location.y! }))
      return this.computeReachableHexesOfTypeFromCoords(
        { x: token.location.x!, y: token.location.y! },
        otherTokenCoordinates,
        destinationBiotope,
        3
      ).map<BiotopesMove>(({ x, y }) =>
        centralLandscapeTokenMaterial.index(index).moveItem({
          type: LocationType.CentralLandscapeSpot,
          x: x,
          y: y
        })
      )
    })
  }

  public afterPlaceTerritoryTokenMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    actionType: EcosystemActionType.Expansion | EcosystemActionType.Migration | EcosystemActionType.Competition,
    biotopeType: BiotopeType,
    _context?: PlayMoveContext
  ): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.TerritoryToken)(move) && move.location.type === LocationType.CentralLandscapeSpot) {
      const materialWithDrawCardEffect = this.materialHelper.playerSpeciesCardTableau.id<KnownSpeciesCardId>((id) => {
        const cardEffect = speciesCardCharacteristics[id.front].effect
        return (
          (actionType === EcosystemActionType.Expansion && cardEffect === SpeciesCardEffect.CosmopolitanSpecies) ||
          (actionType === EcosystemActionType.Migration && cardEffect === SpeciesCardEffect.PartialMigrator) ||
          (biotopeType === BiotopeType.Mountain && cardEffect === SpeciesCardEffect.MountainSpecies) ||
          (biotopeType === BiotopeType.Forest && cardEffect === SpeciesCardEffect.ForestSpecies) ||
          (biotopeType === BiotopeType.Meadow && cardEffect === SpeciesCardEffect.GranivorousSpecies) ||
          (biotopeType === BiotopeType.Wetland && cardEffect === SpeciesCardEffect.AquaticSpecies)
        )
      })
      const materialWithDrawCubesEffect = this.materialHelper.playerSpeciesCardTableau.id<KnownSpeciesCardId>((id) => {
        const cardEffect = speciesCardCharacteristics[id.front].effect
        return biotopeType === BiotopeType.Forest && cardEffect === SpeciesCardEffect.WoodlandSpecies
      })
      if (materialWithDrawCubesEffect.exists) {
        this.memorize<BiotopesPendingEffect[] | undefined>(Memory.PendingEffects, (currentPendingEffects) =>
          [
            {
              type: PendingEffectType.DrawCubes,
              numberOfCubesToDraw: materialWithDrawCubesEffect.getQuantity()
            } as BiotopesPendingEffect
          ].concat(currentPendingEffects ?? [])
        )
      }
      if (materialWithDrawCardEffect.exists) {
        this.memorize<BiotopesPendingEffect[] | undefined>(Memory.PendingEffects, (currentPendingEffects) =>
          [
            {
              type: PendingEffectType.DrawCards,
              numberOfCardsToDraw: materialWithDrawCardEffect.getQuantity()
            } as BiotopesPendingEffect
          ].concat(currentPendingEffects ?? [])
        )
      }
      if (materialWithDrawCardEffect.exists) {
        return [this.startRule(RuleId.DrawCards)]
      }
      if (materialWithDrawCubesEffect.exists) {
        return [this.startRule(RuleId.DiscardCardToDrawCube)]
      }
      return [this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer)]
    }
    return []
  }
}
