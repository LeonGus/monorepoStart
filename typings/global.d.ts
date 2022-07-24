declare const BMap
interface Window {
  BMap: typeof BMap
  _initBaiduMap: (() => void) | null
}
