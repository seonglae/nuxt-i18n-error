import colors from 'vuetify/es5/util/colors'
// @ts-check
import dotenv from 'dotenv'
import pkg from './package.json'
import { murmurHash128 } from 'murmurhash-native'

dotenv.config()

const render = {
  csp: { addMeta: true },
  etag: { hash: html => murmurHash128(html) },
  http2: {
    push: true,
    pushAssets: (req, res, publicPath, preloadFiles) =>
      req && res && preloadFiles.map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`)
  }
}

const head = {
  title: process.env.title,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: pkg.description }
  ],
}

const vuetify = {
  defaultAssets: { icons: 'mdi' },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.cyan.lighten1,
        accent: colors.blueGrey.darken3,
        secondary: colors.teal.darken3,
        info: colors.teal.lighten1,
        warning: colors.yellow.base,
        error: colors.deepOrange.accent3,
        success: colors.green.accent2
      }
    }
  }
}

const modules = [
  ['@nuxtjs/axios', { treeshake: true }],
  [
    '@nuxtjs/i18n',
    {
      vueI18nLoader: true,
      defaultLocale: 'ko',
      strategy: 'no_prefix',
      vueI18n: {
        fallbackLocale: 'ko',
        messages: {
          en: {
            apply: 'Apply',
            remove: 'Remove',
            upload: 'Upload',
            cancel: 'Cancel'
          },
          ko: {
            apply: '적용',
            remove: '제거',
            upload: '업로드',
            cancel: '취소'
          }
        }
      },
      locales: [
        { code: 'en', iso: 'en-US' },
        { code: 'ko', iso: 'ko-KR' }
      ]
    }
  ]
]

const build = {
  extractCSS: true,
  sourceMap: true,
  optimizeCSS: true,
  splitChunks: { commons: true, pages: true }
}

/** @type {import('@nuxt/types').NuxtOptions} */
export default {
  modulesDir: ['./node_modules'],
  srcDir: 'src/',
  target: 'server',
  ssr: false,
  vue: { config: { productionTip: false, devtools: false } },
  render,
  loading: { color: '#424242' },
  server: {
    host: '0.0.0.0',
    port: 8000
  },
  modules,
  buildModules: [
    ['@nuxtjs/vuetify', { treeshake: true }],
    '@nuxtjs/composition-api/module'
  ],
  vuetify,
  build,
  head
}
