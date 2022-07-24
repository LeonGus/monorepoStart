/**
 * @Description 导出组件
 * @version 0.0.1
 * @author Leon
 * @Date 2022-07-21 19:29:08
 * @LastEditors Leon
 * @LastEditTime 2022-07-21 20:29:08
 */
import { withInstall } from '@hgj/truck-utils/with-install'

import HgjTrackLocationMap from './src/hgj-track-location-map.vue'
const hgjTrackLocationMap = withInstall(HgjTrackLocationMap)

export { hgjTrackLocationMap }
export default hgjTrackLocationMap
