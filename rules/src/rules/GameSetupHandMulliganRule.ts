import { MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { BiotopesItemMove, BiotopesMove, isBiotopesMoveItemTypeAtOnce, isBiotopesStartPlayerTurn } from '../BiotopeTypes'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SpeciesCardId, SpeciesCardType, SpeciesDietType } from '../material/SpeciesCard'
import { PlayerColor } from '../PlayerColor'
import { MaterialHelper } from './helpers/MaterialHelper'
import { PlayerHelper } from './helpers/PlayerHelper'
import { RuleId } from './RuleId'

export class GameSetupHandMulliganRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly playerHelper = new PlayerHelper(this.game)

  public onRuleStart(
    move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    if (isBiotopesStartPlayerTurn(move) && move.player === this.game.players[0]) {
      const herbivoresDeckMaterial = this.material(MaterialType.SpeciesCard)
        .location(LocationType.SpeciesDecksSpot)
        .location((l) => l.y === SpeciesDietType.Herbivore)
        .deck()
      const mountainHerbivores = herbivoresDeckMaterial.id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreMountain)
      const forestHerbivores = herbivoresDeckMaterial.id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreForest)
      const meadowHerbivores = herbivoresDeckMaterial.id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreMeadow)
      const wetlandsHerbivores = herbivoresDeckMaterial.id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreWetland)
      return this.game.players.map((player, index) =>
        herbivoresDeckMaterial
          .index([
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
      )
    }
    return super.onRuleStart(move, _previousRule, _context)
  }

  public getPlayerMoves(): BiotopesMove[] {
    const nextRule = this.playerHelper.isLastPlayer ? RuleId.GameSetupPlaceTerritoryTokens : RuleId.GameSetupHandMulligan
    return [
      this.materialHelper.playerSpeciesCardHand.moveItemsAtOnce({
        type: LocationType.SpeciesDiscardsSpot,
        y: SpeciesDietType.Herbivore
      }),
      this.startPlayerTurn(nextRule, this.nextPlayer)
    ]
  }

  public afterItemMove(move: BiotopesItemMove, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemTypeAtOnce(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.SpeciesDiscardsSpot) {
      const herbivoresDeck = this.materialHelper.herbivoresDeckMaterial.deck()
      const mountainHerbivoreIndex = herbivoresDeck
        .id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreMountain)
        .limit(1)
        .getIndex()
      const forestHerbivoreIndex = herbivoresDeck
        .id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreForest)
        .limit(1)
        .getIndex()
      const meadowHerbivoreIndex = herbivoresDeck
        .id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreMeadow)
        .limit(1)
        .getIndex()
      const wetlandHerbivoreIndex = herbivoresDeck
        .id<SpeciesCardId>((id) => id.back === SpeciesCardType.HerbivoreWetland)
        .limit(1)
        .getIndex()
      const cardsToDealIndexes = [mountainHerbivoreIndex, forestHerbivoreIndex, meadowHerbivoreIndex, wetlandHerbivoreIndex]
      const nextRule = this.playerHelper.isLastPlayer ? RuleId.GameSetupPlaceTerritoryTokens : RuleId.GameSetupHandMulligan
      return [
        herbivoresDeck.index(cardsToDealIndexes).dealAtOnce(
          {
            type: LocationType.PlayerSpeciesCardHandSpot,
            player: this.player
          },
          4
        ),
        this.startPlayerTurn(nextRule, this.nextPlayer)
      ]
    }
    if (isBiotopesMoveItemTypeAtOnce(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.PlayerSpeciesCardHandSpot) {
      return move.reveal === undefined ? [] : [this.materialHelper.herbivoresDeckMaterial.shuffle()]
    }
    return super.afterItemMove(move, _context)
  }
}
