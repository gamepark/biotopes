import { MaterialMove, PlayMoveContext } from '@gamepark/rules-api'
import { BiotopesItemMove, isBiotopesMoveItemTypeAtOnce } from '../BiotopeTypes'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { SpeciesCardId, SpeciesCardType, SpeciesDietType } from '../material/SpeciesCard'
import { PlayerColor } from '../PlayerColor'
import { BiotopesPlayerTurnRule } from './BiotopesPlayerTurnRule'
import { RuleId } from './RuleId'

export class GameSetupHandMulliganRule extends BiotopesPlayerTurnRule {
  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    const nextRule = this.isLastPlayer() ? RuleId.GameSetupPlaceTerritoryTokens : RuleId.GameSetupHandMulligan
    return [
      this.material(MaterialType.SpeciesCard).location(LocationType.PlayerSpeciesCardHandSpot).player(this.player).moveItemsAtOnce({
        type: LocationType.SpeciesDiscardsSpot
      }) as MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>
    ].concat(this.startPlayerTurn(nextRule, this.nextPlayer))
  }

  public afterItemMove(move: BiotopesItemMove, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    if (isBiotopesMoveItemTypeAtOnce(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.SpeciesDiscardsSpot) {
      const herbivoresDeck = this.herbivoresDeckMaterial.deck()
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
      const nextRule = this.isLastPlayer() ? RuleId.GameSetupPlaceTerritoryTokens : RuleId.GameSetupHandMulligan
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
      return move.reveal === undefined ? [] : [this.material(MaterialType.SpeciesCard).location((l) => l.type === LocationType.SpeciesDecksSpot && l.y === SpeciesDietType.Herbivore).shuffle()]
    }
    return super.afterItemMove(move, _context)
  }
}
