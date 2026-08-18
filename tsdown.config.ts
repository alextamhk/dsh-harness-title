/**
 * tsdown config for the harness-title plugin, modeled on the dsh-web-ui
 * family's shared `clientBundle` preset (packages ship a node-half lib build
 * plus a browser client bundle served by the DSH web plugin loader).
 *
 * - lib/index.js — ESM node half (host plugin entry), externals resolved at
 *   runtime from node_modules (@deepseek-ai/dsh-settings, schemastery).
 * - lib/client.js — CJS browser bundle wrapped in the __ModuleLoader__.load
 *   ({id, factory}) handoff; platform modules (react, cordis, slots, ...)
 *   resolve through the loader's injected require; everything else inlines.
 * - CSS Modules are compiled by lightningcss inside the bundle: importing
 *   `x.module.css` yields the hashed class map, and the css text auto-injects
 *   a <style data-plugin="harness-title"> tag at factory execution.
 */
import { readFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import { transform } from 'lightningcss'
import type { UserConfig } from 'tsdown'

/** The module specifiers the shell shares into the frozen module table (mirrors shared/web-platform.ts). */
const PLATFORM_MODULES = [
  'react', 'react/jsx-runtime', 'react-dom', 'react-dom/client', '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-web-react',
  '@deepseek-ai/dsh-client-ui-primitives',
  '@deepseek-ai/dsh-client-schema-form',
] as const

/** Externals resolved from the loader module table plus the runtime store exemption. */
const CLIENT_EXTERNALS: readonly string[] = [...PLATFORM_MODULES, '@deepseek-ai/dsh-client-runtime/client']

/** Virtual-id wrapper keeping module CSS away from tsdown's own css pipeline. */
const CSS_VIRTUAL_PREFIX = '\0dsh-css:'
const CSS_VIRTUAL_SUFFIX = '.mjs'

/** The CSS-modules-inline plugin: hashes each module stylesheet into a class map and injects its <style> tag. */
function cssModulesPlugin(id: string) {
  return {
    name: 'dsh-css-modules-inline',
    resolveId(source: string, importer: string | undefined) {
      if (!source.endsWith('.module.css')) return null
      const abs = importer !== undefined ? resolve(importer, '..', source) : source
      return CSS_VIRTUAL_PREFIX + abs + CSS_VIRTUAL_SUFFIX
    },
    async load(virtualId: string) {
      if (!virtualId.startsWith(CSS_VIRTUAL_PREFIX)) return null
      const physical = virtualId.slice(CSS_VIRTUAL_PREFIX.length, -CSS_VIRTUAL_SUFFIX.length)
      this.addWatchFile(physical)
      const source = await readFile(physical)
      const { code, exports: cssExports } = transform({
        filename: physical,
        code: source,
        cssModules: { pattern: '[hash]_[local]' },
        minify: true,
      })
      const classMap: Record<string, string> = {}
      for (const [local, exp] of Object.entries(cssExports ?? {}).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)) {
        classMap[local] = exp.name
      }
      return [
        `const css = ${JSON.stringify(code.toString())};`,
        `const tagId = ${JSON.stringify(`${id}/${basename(physical)}`)};`,
        'if (typeof document !== \'undefined\' && document.querySelector(\'style[data-plugin-css=\' + JSON.stringify(tagId) + \']\') === null) {',
        '  const tag = document.createElement(\'style\');',
        `  tag.dataset.plugin = ${JSON.stringify(id)};`,
        '  tag.dataset.pluginCss = tagId;',
        '  tag.textContent = css;',
        '  document.head.appendChild(tag);',
        '}',
        `export default ${JSON.stringify(classMap)};`,
      ].join('\n')
    },
  }
}

/** Node-half library config: the host plugin entry (ESM, external cordis + settings SDK). */
const libConfig: UserConfig = {
  name: 'harness-title',
  entry: ['src/index.ts'],
  outDir: 'lib',
  format: ['esm'],
  platform: 'node',
  target: 'es2024',
  fixedExtension: false,
  dts: false,
  clean: false,
  external: ['@deepseek-ai/cordis', '@deepseek-ai/dsh-settings', 'schemastery'],
}

/** Browser-half config: the client bundle in the __ModuleLoader__.load handoff format. */
const clientConfig: UserConfig = {
  name: 'harness-title/client',
  entry: { client: 'src/client/index.ts' },
  outDir: 'lib',
  format: 'cjs',
  platform: 'browser',
  dts: false,
  sourcemap: true,
  clean: false,
  external: [...CLIENT_EXTERNALS],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
    'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV ?? 'production'),
    'import.meta.env': JSON.stringify({ MODE: process.env.NODE_ENV ?? 'production' }),
  },
  noExternal: (candidate: string) => (CLIENT_EXTERNALS.includes(candidate) ? undefined : true),
  plugins: [cssModulesPlugin('harness-title')],
  outputOptions: {
    entryFileNames: 'client.js',
    banner: 'window.__ModuleLoader__.load({ id: "harness-title", factory: (require) => {',
    footer: 'return module.exports; } });',
    intro: 'var module = { exports: {} }; var exports = module.exports;',
  },
}

export default [libConfig, clientConfig]
