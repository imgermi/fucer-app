<template>
  <article class="normativa-module">
    <div class="main">
    	<h4><nuxt-link :to="url">{{ titulo }}</nuxt-link></h4>
    	<p><nuxt-link :to="url">{{ bajada }}</nuxt-link></p>
    </div>
    <div class="extra">
    	<small><nuxt-link :to="url">{{ fecha | fecha('YYYY') }}</nuxt-link></small>
      <FavoriteStar @click.native="cambiarFavorito" :activa="enFavoritos"/>
    </div>
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
      'fecha',
      'url'
    ],
    computed: {
      enFavoritos () {
        if (!this.$store.state.favoritos.normativas.length) {
          return false
        }
        let indiceFavorito = this.$store.state.favoritos.normativas.findIndex(
          favorito => this.id == favorito.id
        )
        return indiceFavorito >= 0 ? true : false
      }
    },
    methods: {
      ...mapActions('favoritos', [
        'agregarFavorito',
        'quitarFavorito'
      ]),
      async cambiarFavorito () {
        if( this.enFavoritos ){
          await this.quitarFavorito(this.id)
        } else {
          await this.agregarFavorito({
            id: this.id,
            titulo: this.titulo,
            bajada: this.bajada,
            fecha: this.fecha,
            url: this.url
          })
        }
      }
    }
	}
</script>

<style lang="sass">@import 'sass/components/modulo-normativa.sass'</style>