<template>
  <header class="secondary-top">
    <div class="container">
      <nuxt-link :to="{ name: 'index' }" class="logo">
        <img src="~/assets/img/logo-blanco-y-negro.svg">
      </nuxt-link>
      <nuxt-link :to="{ name: 'index' }" class="cancelar__btn">Cancelar</nuxt-link>
    </div>
  </header>
</template>

<style lang="sass">@import 'sass/components/secondary-top.sass'</style>