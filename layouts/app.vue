<template>
  <div class="app" ref="routerView">
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

<style lang="sass">@import 'sass/layouts/app.sass'</style>