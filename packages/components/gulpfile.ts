/**
 * @Description 组件构建
 * @version 0.0.1
 * @author Leon
 * @Date 2022-07-21 19:29:08
 * @LastEditors Leon
 * @LastEditTime 2022-07-21 20:29:08
 */
import fs from 'fs'
import { series } from 'gulp'
import { rollup } from 'rollup'
import ts from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import { babel } from '@rollup/plugin-babel'
import vuePlugin from 'rollup-plugin-vue'
import dts from 'rollup-plugin-dts'
import { run, transformCamelName, withTaskName } from '../../build/utils'

// 排除的文件夹
const excludeDir = ['node_modules']

const componentsDir = fs
  .readdirSync(process.cwd())
  .filter((e) => fs.statSync(e).isDirectory() && !excludeDir.includes(e))

// 生成d.ts
const dtsTask = withTaskName('build-dts', async () => {
  const bundle = await rollup({
    input: 'index.ts',
    plugins: [dts()],
    external: ['vue-demi']
  })
  await bundle.write({
    file: 'dist/types/index.d.ts',
    format: 'es'
  })
})

export default series(
  withTaskName('clean', async () =>
    run('pnpm -C packages/components run clean:dist')
  ), // 删除dist目录
  withTaskName(
    'build-hgj-track-location-map',
    generateRollupConfig({
      dirName: 'hgj-track-location-map',
      input: `hgj-track-location-map/index.ts`,
      file: `dist/lib/hgj-track-location-map/index.js`,
      format: 'es',
      extract: 'index.css'
    })
  ),
  withTaskName(
    'buildAll',
    generateRollupConfig({
      dirName: 'truck-components-vue',
      input: `index.ts`,
      file: `dist/lib/index.js`,
      format: 'es',
      extract: 'index.css'
    })
  ),
  dtsTask
)

// 生成rollup打包配置
function generateRollupConfig(opt) {
  return async () => {
    const bundle = await rollup({
      plugins: [
        vuePlugin(),
        postcss({
          extract: opt.extract
        }),
        resolve(),
        ts({
          tsconfigOverride: {
            compilerOptions: {
              outDir: 'dist',
              rootDir:
                '.' /* 指定输出文件目录（用于输出），用于控制输出目录结构 */
            }
          }
        }),
        babel({
          exclude: 'node_modules/**',
          presets: ['@babel/preset-env'],
          babelHelpers: 'bundled',
          extensions: ['.js', '.ts', '.vue']
        })
      ],
      input: opt.input,
      external: ['vue-demi']
    })
    await bundle.write({
      file: opt.file,
      format: opt.format,
      extend: opt.extend,
      name: transformCamelName(opt.dirName),
      globals: {
        'vue-demi': 'VueDemi'
      }
      // plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })]
    })
  }
}
