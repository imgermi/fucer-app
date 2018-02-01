<template>
	<div class="center" v-on:click="cargarMas">
	  <button class="rounded__btn--medium"><span v-html="mensaje"></span></button>
	</div>
</template>

<script>
export default {
  data () {
    mensaje: 'Cargar más'
  },
  methods: {
    cargarMas: function (event) {
      this.mensaje = 'Usted está utilizando la versión básica. <a href=''>Actualice su plan</a> para acceder a todas las normativas.'
    }
  }
}
</script>
