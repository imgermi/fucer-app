<template>
  <article class="normativa-module">
    <nuxt-link :to="url">
      <div class="main">
        <h4>{{ titulo }}</h4>
        <p>{{ bajada }}</p>
      </div>
      <div class="extra">
        <small v-if="categoria" :class="`tag normativa-module__tag ${categoriaUri}`">{{ categoria }}</small>
        <small>{{ fecha | fecha('DD/MM/YY') }}</small>
        <FavoriteStar @click.native="cambiarFavorito" :activa="enFavoritos"/>
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