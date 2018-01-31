<template>
	<div class="center" v-on:click="cargarMas">
	  <button class="rounded__btn--medium" id="cargarMas">Cargar mas</button>
	</div>
</template>

<script>
export default {
  methods: {
    cargarMas: function (event) {
      document.querySelector('#cargarMas').innerHTML = "Usted está utilizando la versión básica. <a href=''>Actualice su plan</a> para acceder a todas las normativas.";
    }
  }
}
</script>