<template>
  <article class="normativa-module">
  	<h4><nuxt-link :to="url">{{ titulo }}</nuxt-link></h4>
  	<p><nuxt-link :to="url">{{ bajada }}</nuxt-link></p>
  	<small><nuxt-link :to="url">{{ fecha | fecha('YYYY') }}</nuxt-link></small>
    <FavoriteStar/>
  </article>
</template>

<script>
	import FavoriteStar from '~/components/FavoriteStar.vue'

	export default {
		components: {
			FavoriteStar
		},
        props: [
            'titulo',
            'bajada',
            'fecha',
            'url'
        ]
	}
</script>

<style lang="sass">@import 'sass/components/modulo-normativa.sass'</style>