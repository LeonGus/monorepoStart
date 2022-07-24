/**
 * @Description 说点啥
 * @version 0.0.1
 * @author Leon
 * @Date 2022-07-21 19:29:08
 * @LastEditors Leon
 * @LastEditTime 2022-07-21 20:29:08
 */
import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    app.component((component as any).name, component)
  }
  return component as SFCWithInstall<T>
}
