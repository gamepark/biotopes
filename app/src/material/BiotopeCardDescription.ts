import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { BiotopeCard } from '@gamepark/biotopes/material/BiotopeCard'
import { CardDescription } from '@gamepark/react-game'
import Mountains from '../images/Cards/en/BiotopeCards/Mountains.jpeg'
import MountainsAdapted from '../images/Cards/en/BiotopeCards/Mountains-AdaptedEnvironment.jpeg'
import MountainsPlentiful from '../images/Cards/en/BiotopeCards/Mountains-PlentifulEnvironment.jpeg'
import MountainsPopulous from '../images/Cards/en/BiotopeCards/Mountains-PopulousEnvironment.jpeg'
import MountainsPreserved from '../images/Cards/en/BiotopeCards/Mountains-PreservedEnvironment.jpeg'
import MountainsPropitious from '../images/Cards/en/BiotopeCards/Mountains-PropitiousEnvironment.jpeg'
import Forests from '../images/Cards/en/BiotopeCards/Forests.jpeg'
import ForestsAdapted from '../images/Cards/en/BiotopeCards/Forests-AdaptedEnvironment.jpeg'
import ForestsPlentiful from '../images/Cards/en/BiotopeCards/Forests-PlentifulEnvironment.jpeg'
import ForestsPopulous from '../images/Cards/en/BiotopeCards/Forests-PopulousEnvironment.jpeg'
import ForestsPreserved from '../images/Cards/en/BiotopeCards/Forests-PreservedEnvironment.jpeg'
import ForestsPropitious from '../images/Cards/en/BiotopeCards/Forests-PropitiousEnvironment.jpeg'
import Meadows from '../images/Cards/en/BiotopeCards/Meadows.jpeg'
import MeadowsAdapted from '../images/Cards/en/BiotopeCards/Meadows-AdaptedEnvironment.jpeg'
import MeadowsPlentiful from '../images/Cards/en/BiotopeCards/Meadows-PlentifulEnvironment.jpeg'
import MeadowsPopulous from '../images/Cards/en/BiotopeCards/Meadows-PopulousEnvironment.jpeg'
import MeadowsPreserved from '../images/Cards/en/BiotopeCards/Meadows-PreservedEnvironment.jpeg'
import MeadowsPropitious from '../images/Cards/en/BiotopeCards/Meadows-PropitiousEnvironment.jpeg'
import Wetlands from '../images/Cards/en/BiotopeCards/Wetlands.jpeg'
import WetlandsAdapted from '../images/Cards/en/BiotopeCards/Wetlands-AdaptedEnvironment.jpeg'
import WetlandsPlentiful from '../images/Cards/en/BiotopeCards/Wetlands-PlentifulEnvironment.jpeg'
import WetlandsPopulous from '../images/Cards/en/BiotopeCards/Wetlands-PopulousEnvironment.jpeg'
import WetlandsPreserved from '../images/Cards/en/BiotopeCards/Wetlands-PreservedEnvironment.jpeg'
import WetlandsPropitious from '../images/Cards/en/BiotopeCards/Wetlands-PropitiousEnvironment.jpeg'

class BiotopeCardDescription extends CardDescription<BiotopeCard, MaterialType, LocationType> {
  height = 4.4
  width = 6.7

  images = {
    [BiotopeCard.Mountain]: Mountains,
    [BiotopeCard.MountainAdapted]: MountainsAdapted,
    [BiotopeCard.MountainPlentiful]: MountainsPlentiful,
    [BiotopeCard.MountainPopulous]: MountainsPopulous,
    [BiotopeCard.MountainPreserved]: MountainsPreserved,
    [BiotopeCard.MountainPropitious]: MountainsPropitious,
    [BiotopeCard.Forest]: Forests,
    [BiotopeCard.ForestAdapted]: ForestsAdapted,
    [BiotopeCard.ForestPlentiful]: ForestsPlentiful,
    [BiotopeCard.ForestPopulous]: ForestsPopulous,
    [BiotopeCard.ForestPreserved]: ForestsPreserved,
    [BiotopeCard.ForestPropitious]: ForestsPropitious,
    [BiotopeCard.Meadow]: Meadows,
    [BiotopeCard.MeadowAdapted]: MeadowsAdapted,
    [BiotopeCard.MeadowPlentiful]: MeadowsPlentiful,
    [BiotopeCard.MeadowPopulous]: MeadowsPopulous,
    [BiotopeCard.MeadowPreserved]: MeadowsPreserved,
    [BiotopeCard.MeadowPropitious]: MeadowsPropitious,
    [BiotopeCard.Wetland]: Wetlands,
    [BiotopeCard.WetlandAdapted]: WetlandsAdapted,
    [BiotopeCard.WetlandPlentiful]: WetlandsPlentiful,
    [BiotopeCard.WetlandPopulous]: WetlandsPopulous,
    [BiotopeCard.WetlandPreserved]: WetlandsPreserved,
    [BiotopeCard.WetlandPropitious]: WetlandsPropitious
  }
}

export const biotopeCardDescription = new BiotopeCardDescription()
