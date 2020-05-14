import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

Sentry.init({
  dsn: 'https://763e54ccc380411ab56392337ce97f97@o392771.ingest.sentry.io/5240921',
  integrations: [new VueIntegration({ Vue, attachProps: true })],
});
