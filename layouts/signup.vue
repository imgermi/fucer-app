<template>
  <div class="signup">
    <vue-announcer />
    <ErrorToast />
    <nuxt />
  </div>
</template>

<script>
import ErrorToast from "~/components/ErrorToast.vue";

export default {
  components: {
    ErrorToast,
  },
  errorCaptured(error) {
    this.$store.dispatch("setPaginaError", error.toString());
    return false; // prevent Nuxt from handling the error
  },
};
</script>

<style lang="sass">
@import 'sass/layouts/signup.sass'
</style>
