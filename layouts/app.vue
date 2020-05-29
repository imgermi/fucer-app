<template>
  <div class="app">
  	<vue-announcer />
  	<skip-links />
  	<error-toast />
    <nuxt />
  </div>
</template>

<script>
import SkipLinks from '~/components/SkipLinks.vue'
import ErrorToast from '~/components/ErrorToast.vue'

export default {
  components: {
    SkipLinks,
    ErrorToast,
  },
  errorCaptured(error, vm, info) {
    console.log("error intercepted");
    console.log(error, vm, info);
    return false; // prevent Nuxt from handling the error
  },
}
</script>

<style lang="sass">@import 'sass/layouts/app.sass'</style>