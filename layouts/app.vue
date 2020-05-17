<template>
  <div class="app">
  	<vue-announcer />
  	<skip-links />
    <nuxt />
  </div>
</template>

<script>
import SkipLinks from '~/components/SkipLinks.vue'

export default {
  components: {
  	SkipLinks
  },
}
</script>

<style lang="sass">@import 'sass/layouts/app.sass'</style>