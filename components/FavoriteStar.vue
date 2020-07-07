<template>
  <svg
    :class="'star-icon' + (activa ? ' active' : '')"
    viewBox="-2389.974 1622.188 21.814 20.747"
  >
    <path
      id="star-2"
      class="star"
      d="M10.37,1.318l3.2,6.493L20.74,8.852l-5.185,5.054,1.224,7.137L10.37,17.674,3.961,21.043l1.224-7.137L0,8.852,7.166,7.811Z"
      transform="translate(-2389.436 1621.435)"
    />
  </svg>
</template>

<script>
export default {
  props: {
    activa: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="sass">
@import 'sass/components/favorite-star.sass'
</style>
