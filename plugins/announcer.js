import Vue from "vue";

// Really tell what’s going on in your application to people using screen readers.
import VueAnnouncer from "@vue-a11y/announcer";

Vue.use(VueAnnouncer, {
  complementRoute: "ha cargado",
  politeness: "polite",
});

export default (ctx, inject) => {
  // Hace disponible el announcer en el store
  inject("announcer", Vue.prototype.$announcer);
};
