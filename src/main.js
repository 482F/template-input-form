import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './assets/sass/style.scss'

const app = createApp(App)
app.use(vuetify)

loadFonts()

// @atoms 以下のコンポーネントをグローバルで登録
const components = import.meta.globEager('./components/atoms/*.vue')
Object.entries(components)
  .map(([path, { default: component }]) => [
    path.match(/[^/]+(?=\.vue)/)[0],
    component,
  ])
  .forEach(([name, component]) =>
    app.component(name, component)
  )

app.mount('#app')
