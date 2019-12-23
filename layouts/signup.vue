<template>
  <div class="signup" ref="routerView">
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

<style lang="sass">@import 'sass/layouts/signup.sass'</style>