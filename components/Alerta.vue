<template>
  <header v-if="$store.getters.esTrial">
  	<div class="alerta-plan">
  		<p v-html="$store.getters.mensajeDiasFinTrial"></p>
  	</div>
  </header>
</template>

<style lang="sass">@import 'sass/components/alerta.sass'</style>