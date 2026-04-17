import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { countBy } from 'es-toolkit'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { KnownSpeciesCardId, SpeciesDietType } from '../../../material/SpeciesCard'
import { Memory } from '../../../Memory'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { PlayerHelper } from '../../helpers/PlayerHelper'
import { RuleId } from '../../RuleId'

export class EvolutionActionPickCardsRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {

  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly playerHelper = new PlayerHelper(this.game)

  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    const handLocation = {
      type: LocationType.PlayerSpeciesCardHandSpot,
      player: this.player
    }
    return this.materialHelper.speciesCardMaterial.location(LocationType.SpeciesRiversGrid).moveItems(handLocation)
      .concat(this.materialHelper.herbivoresDeckMaterial.dealOne(handLocation))
      .concat(this.materialHelper.insectivoresDeckMaterial.dealOne(handLocation))
      .concat(this.materialHelper.carnivoreDeckMaterial.dealOne(handLocation))
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemType(MaterialType.SpeciesCard)(move) && move.location.type === LocationType.PlayerSpeciesCardHandSpot) {
      const newNumberOfCardsToDraw = this.memorize<number>(Memory.NumberOfCardsToPickForEvolution, (oldValue) => oldValue - 1)
      if (newNumberOfCardsToDraw === 0) {
        this.forget(Memory.NumberOfCardsToPickForEvolution)
        const riverMaterial = this.materialHelper.speciesCardMaterial.location(LocationType.SpeciesRiversGrid)
        const consequences: BiotopesMove[] = [
          this.materialHelper.playerSpeciesCardHand.length > 5
            ? this.startRule(RuleId.EvolutionActionDiscardCardsFromHand)
            : this.startPlayerTurn(RuleId.ChooseAction, this.playerHelper.nextPlayer)
        ]
        if (riverMaterial.length < 9) {
          const riverCounts = countBy(riverMaterial.getItems<KnownSpeciesCardId>(), (card) => card.location.y as SpeciesDietType)
          const indexesToDraw: number[] = this.materialHelper.herbivoresDeckMaterial.limit(3 - (riverCounts[SpeciesDietType.Herbivore] ?? 0)).getIndexes()
            .concat(this.materialHelper.insectivoresDeckMaterial.limit(3 - (riverCounts[SpeciesDietType.Insectivore] ?? 0)).getIndexes())
            .concat(this.materialHelper.carnivoreDeckMaterial.limit(3 - (riverCounts[SpeciesDietType.Carnivore] ?? 0)).getIndexes())
          return [this.materialHelper.speciesCardMaterial.index(indexesToDraw).deck().dealAtOnce({ type: LocationType.SpeciesRiversGrid }, indexesToDraw.length) as BiotopesMove]
            .concat(consequences)
        }
        return consequences
      }
    }
    return super.afterItemMove(move, _context)
  }
}