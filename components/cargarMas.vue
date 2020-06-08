<template>
	<div v-if="!todas" class="center" v-on:click="cargarMas">
	  <button class="rounded__btn--medium green"><span v-html="mensaje"></span></button>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      pagina: 1,
      mensaje: 'Cargar más'
    }
  },
  computed: {
    ...mapState('normativas',[
      'todas'
    ]),
    ...mapGetters('normativas',[
      'recientes',
    ])
  },
  methods: {
    ...mapActions('normativas',[
      'getRecientes'
    ]),
    async cargarMas () {
      await this.obtenerMasNormativas()
    },
    async obtenerMasNormativas () {
      this.pagina ++
      let oldMensaje = this.mensaje
      this.mensaje = 'Cargando...'
      this.$announcer.set(this.mensaje)
      await this.getRecientes(this.pagina)
      this.mensaje = oldMensaje
      this.$announcer.set('Normativas cargadas')
    }
  }
}
</script>
