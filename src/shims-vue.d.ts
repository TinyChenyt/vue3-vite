/* eslint-disable */
declare module '*.vue' {
    declare module '@kangc/v-md-editor/lib/theme/vuepress.js'
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }

declare module 'qs'