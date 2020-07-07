<template>
  <div class="app">
    <vue-announcer />
    <SkipLinks />
    <ErrorToast />
    <nuxt />
  </div>
</template>

<script>
import SkipLinks from "~/components/SkipLinks.vue";
import ErrorToast from "~/components/ErrorToast.vue";

export default {
  components: {
    SkipLinks,
    ErrorToast,
  },
  errorCaptured(error) {
    this.$store.dispatch("setPaginaError", error.toString());
    return false; // prevent Nuxt from handling the error
  },
};
</script>

<style lang="sass">
@import 'sass/layouts/app.sass'
</style>
