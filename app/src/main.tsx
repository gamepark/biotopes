import { BiotopesOptionsSpec } from '@gamepark/biotopes/BiotopesOptions'
import { BiotopesRules } from '@gamepark/biotopes/BiotopesRules'
import { BiotopesSetup } from '@gamepark/biotopes/BiotopesSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="biotopes"
      Rules={BiotopesRules}
      optionsSpec={BiotopesOptionsSpec}
      GameSetup={BiotopesSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
