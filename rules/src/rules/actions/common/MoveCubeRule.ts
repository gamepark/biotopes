import { PlayerColor } from '../../../PlayerColor'
import { ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../material/MaterialType'
import { LocationType } from '../../../material/LocationType'
import { RuleId } from '../../RuleId'
import { MaterialHelper } from '../../helpers/MaterialHelper'
import { BiotopeType } from '../../../material/BiotopeType'
import { BiotopesMove, isBiotopesMoveItemType } from '../../../BiotopeTypes'
import { Memory } from '../../../Memory'

export class MoveCubeRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor> {
  private readonly materialHelper = new MaterialHelper(this.game)

  public getPlayerMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    const playerBiotopeBoardIndex = this.material(MaterialType.BiotopeBoard).player(this.player).getIndex()
    const alreadyMovedCubeIndex = this.remind<number | undefined>(Memory.AlreadyMovedCubeIndex)
    return this.materialHelper.playerSpeciesCardTableau
      .getIndexes()
      .flatMap<BiotopesMove>((cardIndex) =>
        this.materialHelper.playerCubesOnSpeciesCards
          .index((index) => index !== alreadyMovedCubeIndex)
          .parent((index) => index !== cardIndex)
          .moveItems(
            {
              type: LocationType.CubeSpotOnPlayerSpeciesCard,
              player: this.player,
              parent: cardIndex
            },
            1
          )
          .concat(
            this.materialHelper.playerCubesOnBiotopeBoard
              .index((index) => index !== alreadyMovedCubeIndex)
              .moveItems(
                {
                  type: LocationType.CubeSpotOnPlayerSpeciesCard,
                  player: this.player,
                  parent: cardIndex
                },
                1
              )
          )
      )
      .concat(
        this.materialHelper.playerCubesOnSpeciesCards
          .index((index) => index !== alreadyMovedCubeIndex)
          .moveItems<BiotopeType>(
            (cube) => ({
              type: LocationType.CubeOnBiotopeBoardSpot,
              id: cube.id,
              player: this.player,
              parent: playerBiotopeBoardIndex
            }),
            1
          )
      )
      .concat(this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer))
  }

  public afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): BiotopesMove[] {
    if (
      isBiotopesMoveItemType(MaterialType.Cube)(move) &&
      (move.location.type === LocationType.CubeOnBiotopeBoardSpot || move.location.type === LocationType.CubeSpotOnPlayerSpeciesCard)
    ) {
      this.memorize<number>(Memory.AlreadyMovedCubeIndex, move.itemIndex)
      const newNumberOfCubesToMove = this.memorize<number>(Memory.CubesToMoveNumber, (oldValue) => oldValue - 1)
      if (newNumberOfCubesToMove === 0) {
        return [this.startRule(RuleId.EndOfActionReplenishRiversAndActivateNextPlayer)]
      }
    }
    return super.afterItemMove(move, _context)
  }

  public onRuleEnd(
    _move: RuleMove<PlayerColor, RuleId>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId, PlayerColor>[] {
    this.forget(Memory.CubesToMoveNumber)
    this.forget(Memory.AlreadyMovedCubeIndex)
    return super.onRuleEnd(_move, _context)
  }
}
