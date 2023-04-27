// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [vue({
    template: {
      compilerOptions: {
        // i am ignorning my custom '<container>' tag
        // isCustomElement: (tag) => ['Merch'].includes(tag)
        isCustomElement: (tag) => {
          return tag.startsWith('v-') // (return true)
        }
      }
    }
  })]
}
