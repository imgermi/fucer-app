<template>
  <header class="secondary-top">
    <div class="container">
      <a
        href="#"
        title="Volver"
        class="cancelar__btn"
        @click.prevent="$router.go(-1)"
        @keyup.enter.prevent="$router.go(-1)"
      >
        <svg width="18" height="34" viewBox="0 0 18 34" fill="none">
          <path
            d="M16 0L0 16L16 32"
            transform="translate(1 1)"
            stroke="#95989A"
          />
        </svg>
      </a>
      <h1 v-if="tituloPaso" class="paso">
        <p v-if="nroPaso" class="paso__nro">Paso {{ nroPaso }}/3</p>
        <span class="paso__titulo">{{ tituloPaso }}</span>
      </h1>
    </div>
  </header>
</template>

<style lang="sass">
@import 'sass/components/secondary-top.sass'
</style>

<script>
export default {
  props: {
    nroPaso: {
      type: String,
      default: "",
    },
    tituloPaso: {
      type: String,
      default: "",
    },
  },
};
</script>
