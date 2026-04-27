import { BiotopesSetup } from '../../../src'
import { MaterialType } from '../../../src/material/MaterialType'
import { PlayerColor } from '../../../src/PlayerColor'
import { RuleId } from '../../../src/rules/RuleId'
import { LandscapeTile } from '../../../src/material/LandscapeTile'
import { LocationType } from '../../../src/material/LocationType'
import { KnownSpeciesCardId, SpeciesCard } from '../../../src/material/SpeciesCard'
import { BiotopeType } from '../../../src/material/BiotopeType'
import { ExpansionActionChooseCubeRule } from '../../../src/rules/actions/colonization/expansion/ExpansionActionChooseCubeRule'
import { EcosystemActionType } from '../../../src/material/EcosystemActionType'
import { MigrationActionChooseCubeRule } from '../../../src/rules/actions/colonization/migration/MigrationActionChooseCubeRule'
import { BiotopeBoard } from '../../../src/material/BiotopeBoard'

export const setupGameAndGetColonizationRule = (
  players: PlayerColor[],
  cardsWithCube: { cardId: SpeciesCard; cubeBiotopeType: BiotopeType }[],
  ruleTYpe: EcosystemActionType.Migration | EcosystemActionType.Expansion | EcosystemActionType.Competition
) => {
  const setup = new BiotopesSetup()
  const game = setup.setup({
    players: players.map((p) => ({ id: p }))
  })
  setup.material(MaterialType.BiotopeBoard).deleteItemsAtOnce()
  setup.material(MaterialType.LandscapeTile).deleteItemsAtOnce()
  setup.material(MaterialType.BiotopeBoard).createItemsAtOnce([
    {
      id: BiotopeBoard.MountainPasture,
      location: {
        type: LocationType.BiotopeBoardSpot,
        player: players[0]
      }
    },
    {
      id: BiotopeBoard.MountainPasture,
      location: {
        type: LocationType.BiotopeBoardSpot,
        player: players[1]
      }
    }
  ])
  setup.material(MaterialType.LandscapeTile).createItemsAtOnce([
    {
      id: LandscapeTile.A4,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: -2,
        y: -1,
        rotation: 5
      }
    },
    {
      id: LandscapeTile.B6,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: 1,
        y: -2,
        rotation: 5
      }
    },
    {
      id: LandscapeTile.B5,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: -1,
        y: 1
      }
    },
    {
      id: LandscapeTile.A10,
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: 2,
        y: 0,
        rotation: 3
      }
    }
  ])
  setup.material(MaterialType.TerritoryToken).createItemsAtOnce([
    {
      id: players[0],
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: -3,
        y: -1
      }
    },
    {
      id: players[0],
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: -2,
        y: 0
      }
    },
    {
      id: players[0],
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: -2,
        y: 2
      }
    },
    {
      id: players[0],
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: 0,
        y: 1
      }
    },
    {
      id: players[1],
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: -1,
        y: -2
      }
    },
    {
      id: players[1],
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: 2,
        y: -2
      }
    },
    {
      id: players[1],
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: 3,
        y: -1
      }
    },
    {
      id: players[1],
      location: {
        type: LocationType.CentralLandscapeSpot,
        x: 2,
        y: 1
      }
    }
  ])
  const cardsWithIndexes = cardsWithCube.map((cardWithCube, index) => {
    const cardIndex = setup
      .material(MaterialType.SpeciesCard)
      .id<KnownSpeciesCardId>((id) => id.front === cardWithCube.cardId)
      .moveItem({
        type: LocationType.PlayerSpeciesCardTableauSpot,
        player: players[0]
      }).itemIndex
    setup.material(MaterialType.Cube).createItem({
      id: cardWithCube.cubeBiotopeType,
      location: {
        type: LocationType.CubeSpotOnPlayerSpeciesCard,
        player: players[0],
        parent: cardIndex
      }
    })
    return { ...cardWithCube, cardIndex: cardIndex, cubeIndex: index }
  })
  game.rule = {
    id: ruleTYpe === EcosystemActionType.Expansion ? RuleId.ExpansionChooseCube : RuleId.MigrationActionChooseCube,
    player: players[0]
  }
  return {
    setup,
    game,
    colonizationRule: ruleTYpe === EcosystemActionType.Expansion ? new ExpansionActionChooseCubeRule(game) : new MigrationActionChooseCubeRule(game),
    cardsWithIndexes
  }
}

export const setupGameAndGetExpansionRule = (cardId: SpeciesCard, cubeBiotopeType: BiotopeType) => {
  const setupMultiple = setupGameAndGetColonizationRule(
    [PlayerColor.Ibex, PlayerColor.Salamander],
    [{ cardId: cardId, cubeBiotopeType: cubeBiotopeType }],
    EcosystemActionType.Expansion
  )
  return { setup: setupMultiple.setup, expansionRule: setupMultiple.colonizationRule } as { setup: BiotopesSetup; expansionRule: ExpansionActionChooseCubeRule }
}
