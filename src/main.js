import { createApp } from 'vue'
import App from './App.vue'
// Vuetify
// import 'vuetify/styles'

// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'


// const { vuetify } = createVuetify({
//   components,
//   directives
// })

const app = createApp(App)
app.mount('#app')

// console.log(app.config);
app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('v-') // (return true)
  }