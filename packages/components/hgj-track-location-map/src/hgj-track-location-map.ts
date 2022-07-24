/**
 * @Description 说点啥
 * @version 0.0.1
 * @author Leon
 * @Date 2022-07-21 19:29:08
 * @LastEditors Leon
 * @LastEditTime 2022-07-21 20:29:08
 */
import { PropType, ExtractPropTypes } from 'vue-demi'

export enum IconUrl {
  location = 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
  truck = 'https://filecdn.hgj.com/trucking/hgj-trucking-common-web/hgjTrackLocationMap/icon_track.png',
  refresh = 'https://filecdn.hgj.com/trucking/hgj-trucking-common-web/hgjTrackLocationMap/icon_update_location.png'
}

export type LocationDataItem = {
  lat: number
  lng: number
  vno: string
  address: string
  spd: string
  mileage: string
  direction: number
  status: string
  updateTime: string
}

export type LocationMapProps = ExtractPropTypes<typeof locationMapProps>

export const locationMapProps = {
  ak: {
    type: String,
    default: ''
  },
  // 地图中心
  point: {
    type: Array as PropType<number[]>,
    default: () => [120.741345, 31.261196]
  },
  // 地图缩放级别
  zoom: {
    type: Number,
    default: 13
  },
  // 地图容器样式
  divStyle: {
    type: Object as PropType<CSSStyleDeclaration>,
    default: () => ({
      width: '800px',
      height: '800px'
    })
  },
  // 地图容器id
  divId: {
    type: String,
    default: 'hgj-track-location-map'
  },
  locationData: {
    type: Object as PropType<LocationDataItem>,
    default: () => ({})
  }
}
