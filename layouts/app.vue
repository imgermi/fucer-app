<template>
  <div class="app">
    <client-only><vue-announcer /></client-only>
    <SkipLinks />
    <lazy-error-toast />
    <nuxt />
  </div>
</template>

<script>
import SkipLinks from "~/components/SkipLinks.vue";

export default {
  components: {
    SkipLinks,
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
