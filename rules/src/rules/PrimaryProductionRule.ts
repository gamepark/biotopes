import { Location, MaterialItem, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { countBy } from 'es-toolkit'
import { BiotopesMove } from '../BiotopeTypes'
import { BiotopeType } from '../material/BiotopeType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { LandscapeHelper } from './helpers/LandscapeHelper'
import { MaterialHelper } from './helpers/MaterialHelper'
import { RuleId } from './RuleId'
import { KnownSpeciesCardId } from '../material/SpeciesCard'
import { speciesCardCharacteristics } from '../material/SpeciesCardCharacteristics'
import { SpeciesCardEffect } from '../material/SpeciesCardEffect'
import { BiotopeBoard } from '../material/BiotopeBoard'

export class PrimaryProductionRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly landscapeHelper = new LandscapeHelper(this.game)

  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): BiotopesMove[] {
    const tokenMaterial = this.materialHelper.centralLandscapeTerritoryTokenMaterial
    return this.game.players
      .flatMap<BiotopesMove>((player) => {
        const playerTokenCoordinates = tokenMaterial
          .id(player)
          .getItems()!
          .map((token) => ({ x: token.location.x!, y: token.location.y! }))
        const cubeCountByType = countBy(
          playerTokenCoordinates.map((coords) => this.landscapeHelper.landscape.getValue(coords)).filter((type) => type !== undefined),
          (type) => type
        )
        const territoryCubes = this.getTerritoryCubes(cubeCountByType, player)
        const detritivoreCubes = this.getDetritivoreCubes(player)
        const biotopeBoardId = this.material(MaterialType.BiotopeBoard).player(player).getItem<BiotopeBoard>()!.id
        return this.materialHelper.cubeMaterial.createItemsAtOnce(
          territoryCubes.concat(detritivoreCubes).concat(this.getBiotopeBoardProducedCube(biotopeBoardId, player))
        )
      })
      .concat(this.startPlayerTurn(RuleId.ChooseAction, this.player))
  }

  private getDetritivoreCubes = (player: PlayerColor) => {
    return this.materialHelper.speciesCardMaterial
      .location(LocationType.PlayerSpeciesCardTableauSpot)
      .player(player)
      .id<KnownSpeciesCardId>((id) => speciesCardCharacteristics[id.front].effect === SpeciesCardEffect.DetritivoreSpecies)
      .index((cardIndex) => this.materialHelper.playerCubesOnSpeciesCards.parent(cardIndex).getQuantity() < 4)
      .entries.map<MaterialItem<PlayerColor, LocationType, BiotopeType>>(([index, card]) => ({
        id: speciesCardCharacteristics[(card.id as KnownSpeciesCardId).front].biotope,
        location: {
          type: LocationType.CubeSpotOnPlayerSpeciesCard,
          player: player,
          parent: index
        },
        quantity: 1
      }))
  }

  private getTerritoryCubes = (cubeCountByType: Record<BiotopeType, number>, player: PlayerColor) => {
    return Object.entries(cubeCountByType).map<MaterialItem<PlayerColor, LocationType, BiotopeType>>(([biotopeType, cubeCount]) => {
      const type = parseInt(biotopeType) as BiotopeType
      const parentIndex = this.material(MaterialType.BiotopeBoard).player(this.player).getIndex()
      return {
        id: type,
        quantity: cubeCount,
        location: {
          type: LocationType.CubeOnBiotopeBoardSpot,
          id: type,
          player: player,
          parent: parentIndex
        }
      }
    })
  }

  private getBiotopeBoardProducedCube(boardId: BiotopeBoard, player: PlayerColor): MaterialItem<PlayerColor, LocationType, BiotopeType>[] {
    const destination: Location<PlayerColor, LocationType, BiotopeType> = {
      type: LocationType.CubeOnBiotopeBoardSpot,
      player: player,
      parent: this.material(MaterialType.BiotopeBoard).player(this.player).getIndex()
    }
    switch (boardId) {
      case BiotopeBoard.ConiferForest:
        return [
          {
            id: BiotopeType.Mountain,
            location: {
              ...destination,
              id: BiotopeType.Mountain
            }
          }
        ]
      case BiotopeBoard.Ripisylve:
        return [
          {
            id: BiotopeType.Forest,
            location: {
              ...destination,
              id: BiotopeType.Forest
            }
          }
        ]
      case BiotopeBoard.MountainPasture:
        return [
          {
            id: BiotopeType.Meadow,
            location: {
              ...destination,
              id: BiotopeType.Meadow
            }
          }
        ]
      case BiotopeBoard.MountainPeatland:
        return [
          {
            id: BiotopeType.Wetland,
            location: {
              ...destination,
              id: BiotopeType.Wetland
            }
          }
        ]
      default:
        return []
    }
  }
}
