<template>
  <header v-if="!$store.getters.usuarioPremium">
  	<nuxt-link :to="{ name: 'modificar-plan' }" class="alerta-plan">
  		<p v-html="$store.getters.mensajeDiasFinSuscripcion"></p>
  	</nuxt-link>
  </header>
</template>

<style lang="sass">@import 'sass/components/alerta.sass'</style>