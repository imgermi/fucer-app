<template>
  <div />
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      toast: null,
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribe(async (mutation, state) => {
      if (!process.client) {
        console.log(state.pagina.error);
        return;
      }
      if ("SET_PAGINA_ERROR" === mutation.type) {
        if (state.pagina.error) {
          const Toasted = await import(
            /* webpackChunkName: "vue-toasted" */ "vue-toasted"
          );
          if (!this.$toasted) {
            Vue.use(Toasted.default);
          }
          this.toast = this.$toasted.error(state.pagina.error, {
            position: "bottom-left",
            duration: 5000,
            keepOnHover: true,
          });
          if (process.client) this.$announcer.set(state.pagina.error);
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
