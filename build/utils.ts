/**
 * @Description 构建用得到的工具
 * @version 0.0.1
 * @author Leon
 * @Date 2022-07-21 19:29:08
 * @LastEditors Leon
 * @LastEditTime 2022-07-21 20:29:08
 */
import { spawn } from 'child_process'
import { projectRoot } from './paths'

/**
 * @msg 执行脚本
 */
export const run = (command: string) => {
  return new Promise((resolve) => {
    // 将命令分割 例如：rm -rf 分割为['rm', '-rf'],进行解构[cmd,...args]
    const [cmd, ...args] = command.split(' ')
    const app = spawn(cmd, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true // 默认情况下 linux才支持 rm -rf  windows安装git bash
    })
    // 在进程已结束并且子进程的标准输入输出流已关闭之后，则触发 'close' 事件
    app.on('close', resolve) //
  })
}

/**
 * @msg 自定义每个task的name
 */
export const withTaskName = <T>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })

/**
 * @msg -转驼峰名字
 */
export function transformCamelName(str) {
  const re = /-(\w)/g
  return str.replace(re, function ($0, $1) {
    return $1.toUpperCase()
  })
}
