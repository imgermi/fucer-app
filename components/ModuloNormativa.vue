<template>
  <article class="normativa-module">
    <nuxt-link :to="url">
      <div class="main">
        <h4>{{ titulo }}</h4>
        <p>{{ bajada }}</p>
      </div>
      <div class="extra">
        <small v-if="categoria" :class="`tag normativa-module__tag ${categoriaUri}`">{{ categoria }}</small>
        <time v-if="fecha" :datetime="fecha | fecha('yyyy-MM-dd')">{{ fecha | fecha('dd/MM/yyyy') }}</time>
        <FavoriteStar @click.native.prevent="toggleFavorito(id)" :activa="enFavoritos"/>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
	import FavoriteStar from '~/components/FavoriteStar.vue'
  import { mapActions } from 'vuex'

	export default {
		components: {
			FavoriteStar
		},
    props: [
      'id',
      'titulo',
      'bajada',
      'categoria',
      'categoriaUri',
      'fecha',
      'url'
    ],
    computed: {
      enFavoritos() {
        return this.$store.getters['normativas/enFavoritos'](this.id)
      }
    },
    methods: {
      ...mapActions('normativas', ['toggleFavorito'])
    }
	}
</script>

<style lang="sass">@import 'sass/components/modulo-normativa.sass'</style>