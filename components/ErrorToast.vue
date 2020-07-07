<template>
  <div />
</template>

<script>
export default {
  data() {
    return {
      toast: null,
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if ("SET_PAGINA_ERROR" === mutation.type) {
        if (state.pagina.error) {
          this.toast = this.$toast.error(state.pagina.error, {
            position: "bottom-left",
            duration: 5000,
            keepOnHover: true,
          });
          this.$announcer.set(state.pagina.error);
        } else {
          if (this.toast) {
            this.toast.goAway();
          }
        }
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};
</script>
