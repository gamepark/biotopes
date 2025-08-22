import { LocationType } from '@gamepark/biotopes/material/LocationType'
import { MaterialType } from '@gamepark/biotopes/material/MaterialType'
import { BiotopeCard } from '@gamepark/biotopes/material/BiotopeCard'
import { CardDescription } from '@gamepark/react-game'
import Mountains from '../images/Cards/en/BiotopeCards/Mountains.jpg'
import MountainsAdapted from '../images/Cards/en/BiotopeCards/Mountains-AdaptedEnvironment.jpg'
import MountainsPlentiful from '../images/Cards/en/BiotopeCards/Mountains-PlentifulEnvironment.jpg'
import MountainsPopulous from '../images/Cards/en/BiotopeCards/Mountains-PopulousEnvironment.jpg'
import MountainsPreserved from '../images/Cards/en/BiotopeCards/Mountains-PreservedEnvironment.jpg'
import MountainsPropitious from '../images/Cards/en/BiotopeCards/Mountains-PropitiousEnvironment.jpg'
import Forests from '../images/Cards/en/BiotopeCards/Forests.jpg'
import ForestsAdapted from '../images/Cards/en/BiotopeCards/Forests-AdaptedEnvironment.jpg'
import ForestsPlentiful from '../images/Cards/en/BiotopeCards/Forests-PlentifulEnvironment.jpg'
import ForestsPopulous from '../images/Cards/en/BiotopeCards/Forests-PopulousEnvironment.jpg'
import ForestsPreserved from '../images/Cards/en/BiotopeCards/Forests-PreservedEnvironment.jpg'
import ForestsPropitious from '../images/Cards/en/BiotopeCards/Forests-PropitiousEnvironment.jpg'
import Meadows from '../images/Cards/en/BiotopeCards/Meadows.jpg'
import MeadowsAdapted from '../images/Cards/en/BiotopeCards/Meadows-AdaptedEnvironment.jpg'
import MeadowsPlentiful from '../images/Cards/en/BiotopeCards/Meadows-PlentifulEnvironment.jpg'
import MeadowsPopulous from '../images/Cards/en/BiotopeCards/Meadows-PopulousEnvironment.jpg'
import MeadowsPreserved from '../images/Cards/en/BiotopeCards/Meadows-PreservedEnvironment.jpg'
import MeadowsPropitious from '../images/Cards/en/BiotopeCards/Meadows-PropitiousEnvironment.jpg'
import Wetlands from '../images/Cards/en/BiotopeCards/Wetlands.jpg'
import WetlandsAdapted from '../images/Cards/en/BiotopeCards/Wetlands-AdaptedEnvironment.jpg'
import WetlandsPlentiful from '../images/Cards/en/BiotopeCards/Wetlands-PlentifulEnvironment.jpg'
import WetlandsPopulous from '../images/Cards/en/BiotopeCards/Wetlands-PopulousEnvironment.jpg'
import WetlandsPreserved from '../images/Cards/en/BiotopeCards/Wetlands-PreservedEnvironment.jpg'
import WetlandsPropitious from '../images/Cards/en/BiotopeCards/Wetlands-PropitiousEnvironment.jpg'

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
