<template>
 <div>
 	<div class="alerta-plan">
 		<p>Está utilizando el plan básico. Acceda a normativas ilimitadas</p>
 	</div>
	  <header>
	    <div class="container">
	      <button class="hamburger" type="button">
	        <span class="hamburger-box">
	          <span class="hamburger-inner"></span>
	        </span>
	      </button>
	      <button><nuxt-link to="/buscar">Buscar</nuxt-link></button>
	    </div>
	  </header>
	  <nav>
	  	<ul>
	  		<li><nuxt-link to="/inicio">Inicio</nuxt-link></li>
	  		<li><nuxt-link to="/buscar">Buscar</nuxt-link></li>
	  		<li><nuxt-link to="/favoritas">Favoritas</nuxt-link></li>
	  		<li><nuxt-link to="/configuracion">Configuración</nuxt-link></li>
	  		<li><nuxt-link to="/">Cerrar Sesión</nuxt-link></li>
	  	</ul>
	  </nav>
  </div>
</template>


