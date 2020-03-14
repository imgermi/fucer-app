<template>
	<div v-if="!normativasTodas" class="center" v-on:click="cargarMas">
	  <button class="rounded__btn--medium green"><span v-html="mensaje"></span></button>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data () {
    return {
      pagina: 1,
      mensaje: 'Cargar más'
    }
  },
  computed: {
    ...mapState('inicio',[
      'normativasMasNuevas',
      'normativasTodas'
    ])
  },
  methods: {
    ...mapActions('inicio',[
      'getNormativasMasNuevas'
    ]),
    async cargarMas () {
      await this.obtenerMasNormativas()
    },
    async obtenerMasNormativas () {
      this.pagina ++
      let oldMensaje = this.mensaje
      this.mensaje = 'Cargando...'
      await this.getNormativasMasNuevas(this.pagina)
      this.mensaje = oldMensaje
    }
  }
}
</script>
