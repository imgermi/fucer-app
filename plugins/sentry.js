import Vue from "vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn:
      // eslint-disable-next-line no-secrets/no-secrets
      "https://763e54ccc380411ab56392337ce97f97@o392771.ingest.sentry.io/5240921",
    integrations: [new VueIntegration({ Vue, attachProps: true })],
  });
}
