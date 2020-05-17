<template>
  <div>
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