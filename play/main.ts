/**
 * @Description 说点啥
 * @version 0.0.1
 * @author Leon
 * @Date 2022-07-21 19:29:08
 * @LastEditors Leon
 * @LastEditTime 2022-07-21 20:29:08
 */
import { createApp } from 'vue'
import App from './App.vue'
import HgjTrackLocationMap from '@hgj/truck-components-vue/hgj-track-location-map'
const app = createApp(App)
app.use(HgjTrackLocationMap)
app.mount('#play')
