<template>
<div></div>
</template>

<script>
import Vue from 'vue'
export default {
	data () {
		return {
			toast: null,
		}
	},
	created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if ('SET_PAGINA_ERROR' === mutation.type) {
        if (state.pagina.error) {
					import(/* webpackChunkName: "vue-toasted" */ 'vue-toasted')
						.then(Toasted => {
							if (!this.$toasted) {
								Vue.use(Toasted.default)
							}
							this.toast = this.$toasted.error(state.pagina.error, {
								position: 'bottom-left',
								duration: 5000,
								keepOnHover: true
							})
						});
					this.$announcer.set(state.pagina.error)
        } else {
					if (this.toast) {
						this.toast.goAway()
					}
				}
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
}
</script>