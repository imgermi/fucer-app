<template>
  <div class="configuracion">
    <Top :title="title" />
    <main id="contenido" class="band datos">
      <div class="container">
        <div class="datos__personales">
          <h2 ref="pageFocusTarget">Datos personales</h2>
          <div class="datos__personales--dato">
            <p>Nombre</p>
            <span>{{ $auth.user.nombre }}</span>
          </div>
          <div class="datos__personales--dato">
            <p>Email</p>
            <span>{{ $auth.user.email }}</span>
          </div>
          <div class="datos__personales--dato">
            <p>Contraseña</p>
            <span>*******</span>
          </div>
          <nuxt-link
            :to="{ name: 'modificar-datos' }"
            tag="button"
            class="rounded__btn--medium"
          >
            Modificar
          </nuxt-link>
        </div>

        <div class="datos__personales">
          <template v-if="$auth.user.suscripcion.tipo === 'mercadopago'">
            <h2>Tarjeta de crédito</h2>
            <div class="datos__personales--dato">
              <p>Número</p>
              <span>{{ metadata.tarjeta }}</span>
            </div>
            <nuxt-link
              :to="{ name: 'modificar-tarjeta' }"
              tag="button"
              class="rounded__btn--medium"
            >
              Modificar
            </nuxt-link>
          </template>

          <template v-if="$auth.user.suscripcion.tipo === 'debito'">
            <h2>Débito automático</h2>
            <div class="datos__personales--dato">
              <p>CBU</p>
              <span>{{ metadata.cbu }}</span>
            </div>
            <nuxt-link
              :to="{ name: 'modificar-debito' }"
              tag="button"
              class="rounded__btn--medium"
            >
              Modificar
            </nuxt-link>
          </template>
        </div>

        <template>
          <div class="datos__plan">
            <h2>Mi plan</h2>
            <div class="datos__plan--dato">
              <span>{{ $auth.user.suscripcion.plan.descripcion }}</span>
              <small>
                {{
                  $auth.user.suscripcion.activa
                    ? "$" + $auth.user.suscripcion.plan.valor
                    : ""
                }}
              </small>
            </div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p v-html="$auth.user.suscripcion.plan.estado" />
          </div>
          <br />
          <nuxt-link
            v-if="$auth.user.suscripcion.tipo !== 'ilimitado'"
            :to="{ name: 'modificar-plan' }"
            tag="button"
            class="rounded__btn--medium"
          >
            Modificar plan
          </nuxt-link>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import Top from "~/components/Top.vue";

export default {
  layout: "app",
  components: {
    Top,
  },
  data() {
    return {
      title: "Configuración",
    };
  },
  computed: {
    metadata() {
      return this.$auth.user.suscripcion.metadata;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!process.client) return;
      vm.$announcer.set(
        `${vm.title} ${vm.$announcer.options.complementRoute}`,
        vm.$announcer.options.politeness
      );
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget);
    });
  },
};
</script>

<style lang="sass">
@import 'sass/pages/configuracion.sass'
</style>
