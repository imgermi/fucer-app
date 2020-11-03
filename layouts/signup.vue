<template>
  <div class="signup">
    <client-only><vue-announcer /></client-only>
    <lazy-error-toast />
    <nuxt />
  </div>
</template>

<script>
export default {
  errorCaptured(error) {
    this.$store.dispatch("setPaginaError", error.toString());
    return false; // prevent Nuxt from handling the error
  },
};
</script>

<style lang="sass">
@import 'sass/layouts/signup.sass'
</style>
