<!--
 * @Description 定位
 * @version 0.0.1
 * @author Leon
 * @Date 2022-07-21 19:29:08
 * @LastEditors Leon
 * @LastEditTime 2022-07-21 20:29:08
-->
<script lang="ts">
import { defineComponent, h, isVue2 } from 'vue-demi'
import {
  locationMapProps,
  IconUrl,
  LocationDataItem
} from './hgj-track-location-map'
// install()
export default defineComponent({
  name: 'hgj-track-location-map',
  props: locationMapProps,
  data: function () {
    return {
      BMap: null, // 百度地图对象
      map: null // 地图实例
    }
  },
  methods: {
    // 加载地图js
    loadScript() {
      const { ak } = this
      if (!window.BMap) {
        window.BMap = {}
        window.BMap._preloader = new Promise((resolve, reject) => {
          window._initBaiduMap = function () {
            resolve(window.BMap)
            window.document.body.removeChild($script)
            window.BMap._preloader = null
            window._initBaiduMap = null
          }
          const $script = document.createElement('script')
          window.document.body.appendChild($script)
          $script.src = `https://api.map.baidu.com/api?v=2.0&ak=${ak}&callback=_initBaiduMap`
        })
        return window.BMap._preloader
      } else if (!window.BMap._preloader) {
        return Promise.resolve(window.BMap)
      } else {
        return window.BMap._preloader
      }
    },
    // 地图初始化
    initMap() {
      const {
        divId,
        point: [lng, lat]
      } = this
      const map = new BMap.Map(divId)
      const point = new BMap.Point(lng, lat)
      map.centerAndZoom(point, 12)
      return map
    },
    // 定位到指定经纬度
    markLocation() {
      console.log('进行标注')
      const {
        locationData: { lat, lng, direction },
        map
      }: { locationData: LocationDataItem; map: any } = this
      const point = new BMap.Point(lng, lat)
      const marker = new BMap.Marker(point)
      // 定义图标
      const customIcon = new BMap.Icon(
        IconUrl.location,
        new BMap.Size(52, 26),
        {
          anchor: new BMap.Size(27, 13)
        }
      )
      marker.setRotation(direction)
      marker.setIcon(customIcon)
      map.panTo(point)
      map.addOverlay(marker)
    },
    initInfoWindow() {
      const {
        locationData: {
          vno,
          updateTime,
          status,
          spd,
          mileage,
          address,
          direction
        },
        map
      }: { locationData: LocationDataItem; map: any } = this
      const opts = {
        width: 330, // 信息窗口宽度
        height: 200 // 信息窗口高度
      }
      const infoWindow = new BMap.InfoWindow(
        `<div class="hgj-map-info-window-box">
    <h3>${vno}</h3>
    <ul>
    <li>
      <span>更新时间</span>
      <span>${updateTime}</span>
    </li>
    <li>
      <span>车辆状态</span>
      <span>${status}</span>
    </li>
    <li>
      <span>总里程</span>
      <span>${mileage}</span>
    </li>
    <li>
      <span>当前车速</span>
      <span>${spd}</span>
    </li>
    <li>
      <span>行驶方向</span>
      <span>${direction}</span>
    </li>
    <li>
      <span>当前位置</span>
      <span>${address}</span>
    </li>
    </ul>
    <div class="map-bottom-tools">
    <span>
     <img src="${IconUrl.truck}"/> 行驶轨迹
    </span>
    <span>
    <img src="${IconUrl.refresh}"/> 刷新位置
    </span>
    </div>
    </div>`,
        opts
      ) // 创建信息窗口对象
      map.openInfoWindow(infoWindow, map.getCenter()) // 打开信息窗口
    },
    showTrack() {
      console.log('显示轨迹')
    },
    refreshLocation() {
      console.log('刷新位置')
    }
  },
  render() {
    const id = this.divId
    if (isVue2) {
      return h('div', {
        attrs: {
          id
        },
        style: this.divStyle
      })
    }
    return h('div', {
      id,
      style: this.divStyle
    })
  },
  async mounted() {
    this.loadScript().then((map) => {
      this.BMap = map
      this.map = this.initMap()
      ///////
      this.markLocation()
      this.initInfoWindow()
      ////////
    })
  }
})
</script>

<style lang="scss">
.hgj-map-info-window-box {
  h3,
  ul,
  li {
    padding: 0;
    margin: 0;
    font-size: 14px;
  }
  h3 {
    border-bottom: 1px solid #f5f5f5;
    padding: 10px;
    padding-top: 0;
  }
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;
      font-size: 12px;
      margin-top: 10px;
      color: #1d2129;
      span:nth-of-type(1) {
        color: #7a8699;
      }
    }
    li:nth-child(1) {
      width: 100%;
    }
    li:last-child {
      width: 100%;
    }
  }
  .map-bottom-tools {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #f5f5f5;
    margin-top: 10px;
    span {
      display: flex;
      align-items: center;
      font-size: 12px;
      margin-top: 15px;
      cursor: pointer;
      img {
        width: 15px;
        margin-right: 5px;
      }
    }
  }
}
</style>
