<template>
  <div>
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
    this.$store.dispatch('setPaginaError', error.toString())
    return false; // prevent Nuxt from handling the error
  },
}
</script>