import { ItemMove, Material, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { PlayerColor } from '../../../PlayerColor'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { countBy } from 'es-toolkit'
import { KnownSpeciesCardId, SpeciesDietType, speciesDietTypes } from '../../../material/SpeciesCard'
import { BiotopesMove, isBiotopesMoveItemTypeAtOnce, isBiotopesShuffleItemType } from '../../../BiotopeTypes'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { PlayerHelper } from '../../helpers/PlayerHelper'
import { Memory } from '../../../Memory'

export class EndOfActionReplenishRiversAndActivateNextPlayerRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)
  private readonly playerHelper = new PlayerHelper(this.game)

  public onRuleStart(_move: RuleMove<PlayerColor, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext): BiotopesMove[] {
    const riverMaterial = this.materialHelper.speciesCardMaterial.location(LocationType.SpeciesRiversGrid)
    const ruleChangeConsequences = [
      this.startPlayerTurn(
        this.playerHelper.nextPlayer === this.player && this.remind<PlayerColor[]>(Memory.PassedPlayers).includes(this.player)
          ? RuleId.EndOfCycle
          : RuleId.ChooseAction,
        this.playerHelper.nextPlayer
      )
    ]
    if (riverMaterial.getQuantity() < 9) {
      return this.replenishRiverMoves(riverMaterial).concat(ruleChangeConsequences)
    }
    return ruleChangeConsequences
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (isBiotopesMoveItemTypeAtOnce(MaterialType.SpeciesCard)(move)) {
      return [
        {
          deck: this.materialHelper.herbivoresDeckMaterial,
          discard: this.materialHelper.speciesCardMaterial.location(LocationType.SpeciesDiscardsSpot).location(({ y }) => y === SpeciesDietType.Herbivore),
          dietType: SpeciesDietType.Herbivore
        },
        {
          deck: this.materialHelper.insectivoresDeckMaterial,
          discard: this.materialHelper.speciesCardMaterial.location(LocationType.SpeciesDiscardsSpot).location(({ y }) => y === SpeciesDietType.Insectivore),
          dietType: SpeciesDietType.Insectivore
        },
        {
          deck: this.materialHelper.carnivoreDeckMaterial,
          discard: this.materialHelper.speciesCardMaterial.location(LocationType.SpeciesDiscardsSpot).location(({ y }) => y === SpeciesDietType.Carnivore),
          dietType: SpeciesDietType.Carnivore
        }
      ]
        .filter(({ deck }) => !deck.exists)
        .flatMap<BiotopesMove>(({ discard, dietType }) => [discard.moveItemsAtOnce({ type: LocationType.SpeciesDecksSpot, y: dietType }), discard.shuffle()])
    }
    if (isBiotopesShuffleItemType(MaterialType.SpeciesCard)(move) && move.indexes.length > 0) {
      const riversWithLessThan3Cards = speciesDietTypes
        .map((type) => ({
          dietType: type,
          river: this.materialHelper.speciesCardMaterial.location(LocationType.SpeciesRiversGrid).location(({ y }) => y === type)
        }))
        .filter(({ river }) => river.length < 3)
      if (riversWithLessThan3Cards.length > 0) {
        const lastRiver = riversWithLessThan3Cards[riversWithLessThan3Cards.length - 1]
        const deckTypeShuffled = this.materialHelper.speciesCardMaterial.index(move.indexes[0]).getItem()!.location.y as SpeciesDietType
        if (lastRiver.dietType === deckTypeShuffled) {
          const riverMaterial = this.materialHelper.speciesCardMaterial.location(LocationType.SpeciesRiversGrid)
          return this.replenishRiverMoves(riverMaterial)
        }
      }
    }
    return super.afterItemMove(move, _context)
  }

  private replenishRiverMoves = (riverMaterial: Material<PlayerColor, MaterialType, LocationType>): BiotopesMove[] => {
    const riverCounts = countBy(riverMaterial.getItems<KnownSpeciesCardId>(), (card) => card.location.y as SpeciesDietType)
    const indexesToDraw: number[] = this.materialHelper.herbivoresDeckMaterial
      .limit(3 - (riverCounts[SpeciesDietType.Herbivore] ?? 0))
      .getIndexes()
      .concat(this.materialHelper.insectivoresDeckMaterial.limit(3 - (riverCounts[SpeciesDietType.Insectivore] ?? 0)).getIndexes())
      .concat(this.materialHelper.carnivoreDeckMaterial.limit(3 - (riverCounts[SpeciesDietType.Carnivore] ?? 0)).getIndexes())
    return [this.materialHelper.speciesCardMaterial.index(indexesToDraw).deck().dealAtOnce({ type: LocationType.SpeciesRiversGrid }, indexesToDraw.length)]
  }
}
