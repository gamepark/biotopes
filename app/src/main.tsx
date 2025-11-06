import { BiotopesOptionsSpec } from '@gamepark/biotopes/BiotopesOptions.ts'
import { BiotopesRules } from '@gamepark/biotopes/BiotopesRules.ts'
import { BiotopesSetup } from '@gamepark/biotopes/BiotopesSetup.ts'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material, materialI18n } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="biotopes"
      Rules={BiotopesRules}
      optionsSpec={BiotopesOptionsSpec}
      GameSetup={BiotopesSetup}
      material={Material}
      locators={Locators}
      materialI18n={materialI18n}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
