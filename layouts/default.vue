<template>
  <div>
  	<vue-announcer />
  	<skip-links />
  	<lazy-error-toast />
    <nuxt />
  </div>
</template>

<script>
import SkipLinks from '~/components/SkipLinks.vue'

export default {
  components: {
    SkipLinks,
  },
  errorCaptured(error, vm, info) {
    this.$store.dispatch('setPaginaError', error.toString())
    return false; // prevent Nuxt from handling the error
  },
}
</script>