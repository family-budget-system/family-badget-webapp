import "@/assets/styles/index.scss"
import "@/assets/styles/tailwind.css"
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {LocaleService} from "@/services/locale.service";
import {i18n} from "@/plugins/i18n";
import {vMaska} from "maska";

async function bootstrap() {
  LocaleService.init();

  const pinia = createPinia()
  const app: any = createApp(App)

  registrationIconsComponentsGlobally(app)
  app.use(i18n)
  app.use(router)
  app.use(pinia)
  app.directive("mask", vMaska)

  app.mount('#app');
}

function registrationIconsComponentsGlobally(app: any) {
  // Registration globally all icons components
  const components = import.meta.glob('./assets/icons/*.vue', { eager: true })
  Object.entries(components).forEach(([path, definition]) => {
    // Get name of component, based on filename
    // "./assets/icons/IzBrainIcon.vue" will become "IzBrainIcon"
    const componentName = (path as any).split('/').pop().replace(/\.\w+$/, '')

    // Register component on this Vue instance
    app.component(componentName, (definition as any).default)
  })
}

bootstrap()
