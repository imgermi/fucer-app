<template>
  <div ref="routerView">
  	<vue-announcer />
    <nuxt/>
  </div>
</template>

<script>
import {moverFocoPagina} from '~/utils/a11y'
export default {
	watch: {
		$route () {
			moverFocoPagina(this)
		}
	},
}
</script>

