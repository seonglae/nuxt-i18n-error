// @ts-check
import { defineNuxtPlugin } from '@nuxtjs/composition-api'
/**
 * @type {import('@nuxt/types').Middleware}
 */
export default defineNuxtPlugin(({ i18n }) => {
  // Lang Check
  for (const locale of i18n.locales)
    if (locale instanceof Object && navigator.language.includes(locale.code)) i18n.setLocale(locale.code)
    else if (navigator.language.includes(String(locale))) i18n.setLocale(String(locale))
})
