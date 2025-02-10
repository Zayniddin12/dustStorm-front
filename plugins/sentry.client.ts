import * as Sentry from '@sentry/browser'

import { CONFIG } from '~/config'

export default defineNuxtPlugin(() => {
  if (import.meta.env.VITE_APP_MODE !== 'production') {
    return
  }

  Sentry.init({
    dsn: CONFIG.SENTRY_DNS,
    integrations: [new Sentry.Replay()],
    sampleRate: 0.25,
    tracesSampleRate: 0.5,
  })
})
