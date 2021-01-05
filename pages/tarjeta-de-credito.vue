<template>
  <main id="contenido" class="registro tarjeta-de-credito">
    <SecondaryTop
      ref="pageFocusTarget"
      :nro-paso="nroPaso"
      :titulo-paso="tituloPaso"
    />
    <div class="band form__container">
      <div class="container">
        <mensaje :tipo="mensajeTipo" :texto="mensajeTexto" />

        <form
          method="post"
          class="main__form"
          @submit.prevent="generateCardToken"
        >
          <fieldset ref="cardNumber">
            <label for="cardNumber">Número de la tarjeta</label>
            <TheMask
              id="cardNumber"
              v-model.lazy="cardNumber"
              v-validate="'required'"
              mask="####-####-####-####"
              type="text"
              data-vv-as="número de la tarjeta"
              :class="{ error: errors.has('cardNumber') }"
              data-vv-name="cardNumber"
              placeholder="0000 0000 0000 0000"
              data-checkout="cardNumber"
              onselectstart="return false"
              onpaste="return false"
              oncopy="return false"
              oncut="return false"
              ondrag="return false"
              ondrop="return false"
              autocomplete="off"
            />
            <span v-show="errors.has('cardNumber')" class="error">{{
              errors.first("cardNumber")
            }}</span>
          </fieldset>

          <div class="dos-columnas">
            <fieldset>
              <label for="cardExpiration">Fecha de vencimiento</label>
              <TheMask
                id="cardExpiration"
                ref="cardExpiration"
                v-model="cardExpiration"
                v-validate="'required'"
                mask="##/####"
                type="text"
                data-vv-name="cardExpiration"
                data-vv-as="fecha de vencimiento"
                data-checkout="cardExpiration"
                :class="{
                  error:
                    errors.has('cardExpirationMonth') ||
                    errors.has('cardExpirationYear'),
                }"
                placeholder="12/2020"
                onselectstart="return false"
                onpaste="return false"
                oncopy="return false"
                oncut="return false"
                ondrag="return false"
                ondrop="return false"
                autocomplete="off"
              />
              <span
                v-show="
                  errors.has('cardExpirationMonth') ||
                  errors.has('cardExpirationYear')
                "
                class="error"
                >{{
                  errors.first("cardExpirationMonth") ||
                  errors.first("cardExpirationYear")
                }}</span
              >

              <input
                id="cardExpirationMonth"
                ref="cardExpirationMonth"
                v-model="cardExpirationMonth"
                v-validate="'required'"
                type="hidden"
                data-vv-name="cardExpirationMonth"
                data-vv-as="mes de vencimiento"
                data-checkout="cardExpirationMonth"
              />

              <input
                id="cardExpirationYear"
                ref="cardExpirationYear"
                v-model="cardExpirationYear"
                v-validate="'required'"
                type="hidden"
                data-vv-name="cardExpirationYear"
                data-vv-as="año de vencimiento"
                data-checkout="cardExpirationYear"
                autocomplete="off"
              />
            </fieldset>

            <fieldset v-show="isSecurityCodeRequired">
              <label for="securityCode">Código de seguridad</label>
              <input
                id="securityCode"
                v-model="securityCode"
                v-validate="isSecurityCodeRequired ? 'required' : ''"
                type="text"
                data-vv-name="securityCode"
                data-checkout="securityCode"
                :class="{ error: errors.has('codigo') }"
                data-vv-as="código de seguridad"
                placeholder="123"
                onselectstart="return false"
                onpaste="return false"
                oncopy="return false"
                oncut="return false"
                ondrag="return false"
                ondrop="return false"
                autocomplete="off"
              />
              <span v-show="errors.has('securityCode')" class="error">{{
                errors.first("securityCode")
              }}</span>
            </fieldset>
          </div>

          <fieldset>
            <label for="cardholderName">Nombre impreso en tarjeta</label>
            <input
              id="cardholderName"
              ref="cardholderName"
              v-model="cardholderName"
              v-validate="'required'"
              type="text"
              data-vv-name="cardholderName"
              data-vv-as="nombre impreso en tarjeta"
              :class="{ error: errors.has('cardholderName') }"
              placeholder="Juan Miguel Fernández"
              data-checkout="cardholderName"
            />
            <span v-show="errors.has('cardholderName')" class="error">{{
              errors.first("cardholderName")
            }}</span>
          </fieldset>

          <fieldset>
            <label for="nombre">Tipo de documento</label>
            <div class="styled-select">
              <select
                id="docType"
                ref="docType"
                v-model="docType"
                v-validate="'required'"
                data-vv-name="docType"
                data-checkout="docType"
                data-vv-as="tipo de documento"
                :class="{ error: errors.has('docType') }"
              >
                <option value>Seleccione una opción</option>
                <option
                  v-for="documentType in documentTypes"
                  :key="documentType.id"
                >
                  {{ documentType.name }}
                </option>
              </select>
            </div>
            <span v-show="errors.has('docType')" class="error">{{
              errors.first("docType")
            }}</span>
          </fieldset>

          <fieldset>
            <label for="docNumber">Número de documento</label>
            <input
              id="docNumber"
              ref="docNumber"
              v-model="docNumber"
              v-validate="'required'"
              type="text"
              data-vv-name="docNumber"
              data-vv-as="número de documento"
              data-checkout="docNumber"
              :class="{ error: errors.has('docNumber') }"
              placeholder="39917586"
            />
            <span v-show="errors.has('docNumber')" class="error">{{
              errors.first("docNumber")
            }}</span>
          </fieldset>

          <input
            v-model="paymentMethodId"
            type="hidden"
            name="paymentMethodId"
          />
          <input v-model="cardToken" type="hidden" name="token" />

          <button type="submit" class="rounded__btn--full green">
            {{ txtBtnSubmit }}
          </button>

          <span class="alert-mercadopago"
            >El pago lo va a procesar Mercado Pago</span
          >

          <div class="signup__agregados">
            <p style="margin-top: 10px; font-size: 14px">
              ¿Está teniendo problemas?
              <a href="javascript:location.reload()">Recargue esta vista</a> y
              pruebe de nuevo.
            </p>
            <p style="margin-top: 10px; font-size: 14px">
              Antes de cobrar el plan, vamos a verificar que su tarjeta
              funcione. Por eso, cobraremos un monto mínimo que será reintegrado
              al instante.
            </p>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import SecondaryTop from "~/components/SecondaryTop.vue";
import { TheMask } from "vue-the-mask";
import { mapState, mapActions } from "vuex";
import mensaje from "~/mixins/mensaje";

export default {
  layout: "signup",
  components: {
    SecondaryTop,
    TheMask,
  },
  mixins: [mensaje],
  middleware: "plan-no-ilimitado",

  async fetch() {
    this.documentTypes = await this.$api.mercadopago.getIdentificationTypes();
  },
  fetchOnServer: false,

  data() {
    return {
      documentTypes: [],
      paymentMethodId: "",
      paymentMethodSettings: [],

      cardNumber: "",
      cardholderName: "",
      cardToken: "",
      cardExpirationMonth: "",
      cardExpirationYear: "",
      docType: "",
      docNumber: "",
      securityCode: "",

      title: "Paso 3 - Tarjeta de Crédito",
      nroPaso: "3",
      tituloPaso: "Configure su tarjeta de crédito",
    };
  },

  computed: {
    ...mapState(["pagina"]),
    cardExpiration: {
      set(value) {
        this.cardExpirationMonth = value.slice(0, 2);
        this.cardExpirationYear = value.slice(2);
      },
      get() {
        return this.cardExpirationMonth + "/" + this.cardExpirationYear;
      },
    },
    txtBtnSubmit() {
      return this.pagina.cargando ? "Cargando..." : "Siguiente";
    },
    bin() {
      var bin = this.cardNumber.replace(/[ .-]/g, "").slice(0, 6);
      return bin.length === 6 ? bin : "";
    },
    isSecurityCodeRequired() {
      let founded = this.paymentMethodSettings.find((config) => {
        return (
          this.bin.match(config.bin.pattern) != null &&
          config.security_code.length == 0
        );
      });
      return founded === undefined ? true : false;
    },
  },

  watch: {
    bin: {
      immediate: true,
      handler: async function (newBin) {
        if (!newBin) {
          return;
        }
        try {
          const data = await this.guessingPaymentMethod(newBin);
          if (!data) {
            return;
          }
          this.paymentMethodId = data.id;
          this.paymentMethodSettings = data.settings;
        } catch (e) {
          console.log(e);
        }
      },
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!process.client) return;
      vm.$announcer.set(
        `${vm.title} ${vm.$announcer.options.complementRoute}`,
        vm.$announcer.options.politeness
      );
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget.$el);
    });
  },

  mounted() {
    this.$refs.cardNumber.focus();
  },

  async created() {
    if (
      this.$auth.loggedIn &&
      this.$auth.user.suscripcion.metadata.customer_id
    ) {
      await this.precargarDatos();
    }
  },

  methods: {
    ...mapActions(["setPaginaCargando"]),
    async precargarDatos() {
      let customer = await this.$axios.$get("mercadopago/get-customer-by-id", {
        params: {
          id: this.$auth.user.suscripcion.metadata.customer_id,
        },
      });
      if (!customer.default_card) {
        return;
      }

      let card = customer.cards.find(
        (card) => card.id === customer.default_card
      );
      if (!card) {
        return;
      }

      this.cardExpirationMonth = card.expiration_month;
      this.cardExpirationYear = card.expiration_year;
      this.docNumber = card.cardholder.identification.number;
      this.docType = card.cardholder.identification.type;
      this.cardholderName = card.cardholder.name;
    },

    async guessingPaymentMethod(bin) {
      try {
        let paymentMethods = await this.$api.mercadopago.getPaymentMethods({
          bin,
        });
        if (!paymentMethods[0]) {
          throw new Error("No se encontró el método de pago.");
        }
        return paymentMethods[0];
      } catch (e) {
        console.log(e);
      }
    },

    async generateCardToken() {
      let valida = await this.$validator.validateAll();
      if (!valida) {
        return;
      }

      try {
        let cardToken = await this.$api.mercadopago.createToken();
        if (cardToken) {
          cardToken = await this.$api.mercadopago.updateToken(cardToken.id, {
            card_number: this.cardNumber.replace(/[ .-]/g, ""),
            security_code: this.securityCode,
            expiration_month: this.cardExpirationMonth,
            expiration_year: this.cardExpirationYear,
            cardholder_name: this.cardholderName,
            cardholder_id_type: this.docType,
            cardholder_id_number: this.docNumber,
          });
        }
        if (!cardToken) {
          throw new Error("Hubo un problema, por favor vuelva a intentalo.");
        }
        this.$router.push({
          name: "registrar-suscripcion",
          query: {
            token: cardToken.id,
            paymentMethodId: this.paymentMethodId,
          },
        });
      } catch (error) {
        console.log(error);
        this.setMensaje(error, "error");
      }
    },
  },

  head() {
    return {
      title: this.title,
    };
  },
};
</script>

<style lang="sass">
@import 'sass/pages/tarjeta-de-credito.sass'
</style>
