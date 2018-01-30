<template>
 <div>
	  <header class="main__header">
	    <div class="container">
	      <button class="hamburger" type="button">
	        <span class="hamburger-box">
	          <span class="hamburger-inner"></span>
	        </span>
	        <label>{{ title }}</label>
	      </button>
	      <button class="buscar"><nuxt-link to="/buscar" class="rounded__btn--full">Buscar</nuxt-link></button>
	    </div>
	  </header>
	  <nav class="main__nav">
	  	<ul>
	  		<li><nuxt-link to="/inicio">Inicio</nuxt-link></li>
	  		<li><nuxt-link to="/buscar">Buscar</nuxt-link></li>
	  		<li><nuxt-link to="/favoritas">Favoritas</nuxt-link></li>
	  		<li><nuxt-link to="/configuracion">Configuración</nuxt-link></li>
	  		<li><nuxt-link to="/" exact>Cerrar Sesión</nuxt-link></li>
	  	</ul>
	  </nav>
  </div>
</template>


<script>

export default {
  props: ['title']
}
</script>