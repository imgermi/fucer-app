<template>
  <article class="normativa-module">
  	<h4><nuxt-link :to=" { name: 'normativa' }">Resolución MJ y DH Nº 238/2003 (Concursos)</nuxt-link></h4>
  	<p><nuxt-link :to=" { name: 'normativa' }">The entire starfleet couldn’t destroy the whole planet. Not for long…</nuxt-link></p>
  	<small><nuxt-link :to=" { name: 'normativa' }">2001</nuxt-link></small>
    <FavoriteStar/>
  </article>
</template>

<script>
	import FavoriteStar from '~/components/FavoriteStar.vue'

	export default {
		components: {
			FavoriteStar
		}
	}
</script>