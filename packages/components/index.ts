/**
 * @Description 说点啥
 * @version 0.0.1
 * @author Leon
 * @Date 2022-07-21 19:29:08
 * @LastEditors Leon
 * @LastEditTime 2022-07-21 20:29:08
 */
import HgjTrackLocationMap from './hgj-track-location-map'
const components = [HgjTrackLocationMap]

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  HgjTrackLocationMap
}
