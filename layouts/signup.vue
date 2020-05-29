<template>
  <div class="signup">
  	<vue-announcer />
  	<error-toast />
    <nuxt />
  </div>
</template>

<script>
import ErrorToast from '~/components/ErrorToast.vue'

export default {
  components: {
    ErrorToast,
  },
  errorCaptured(error, vm, info) {
    this.$store.dispatch('setPaginaError', error.toString())
    return false; // prevent Nuxt from handling the error
  },
}
</script>

<style lang="sass">@import 'sass/layouts/signup.sass'</style>