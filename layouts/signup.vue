<template>
  <div class="signup">
    <vue-announcer />
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
