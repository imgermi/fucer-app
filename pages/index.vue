<template>
  <div class="index">
    <header>
      <div class="container-bg">
        <a href="/">
          <img src="~/assets/img/landing/fucernet-icon.svg" alt="FucerNet">
        </a>
        <nuxt-link :to="{name: 'login'}" class="index-btn green-light smaller">
          Ingresar
        </nuxt-link>
      </div>
    </header>
    <section class="hero">
      <div class="container">
        <h1 ref="pageFocusTarget">La normativa registral, en una base de datos única en el país</h1>
        <h2>FucerNet es una herramienta digital en la que encontrará, además del Digesto de Normas Técnico Registrales, el texto completo de sus principales Disposiciones complementarias y Circulares aclaratorias, con un breve resumen del contenido de las mismas, y diversos artículos de doctrina y jurisprudencia.</h2>
        <div class="hero-cta">
          <nuxt-link :to="{name: 'seleccione-su-plan'}" class="index-btn green">
            Probar 15 días
          </nuxt-link>
          <nuxt-link :to="{name: 'login'}" class="index-btn green-light">
            Acceder a mi cuenta
          </nuxt-link>
        </div>
        <p>-Dr. Javier Antonio Cornejo (Director de FucerNet) y equipo de colaboradores-</p>
        <img src="~/assets/img/landing/fucernet-mobile-desktop.png" alt="Capturas de pantallas de laptop y celular">
      </div>
    </section>
    <section class="features">
      <div class="container">
        <h3>¿Qué puedo encontrar en FucerNet?</h3>
        <div class="features-list">
          <article>
            <p>Circulares</p>
          </article>
          <article>
            <p>Disposiciones</p>
          </article>
          <article>
            <p>Doctrina</p>
          </article>
          <article>
            <p>Jurisprudencia</p>
          </article>
        </div>
      </div>
    </section>
    <section class="faq">
      <div class="container">
        <h3>Preguntas frecuentes</h3>
        <article class="faq-item">
          <h4>¿Puedo usar FucerNet desde mi tablet o celular?</h4>
          <p>Si, FucerNet funciona en cualquier dispositivo. Además, puede instalarla en su celular o tablet por única vez y ejecutarla en pantalla completa desde un lanzador, como cualquier otra aplicación.</p>
          <p>Abra FucerNet desde su tablet o celular ingresando a net.fucer.com.ar. Luego, localice en su navegador el ícono de "compartir”. Haga click en el mismo y seleccione la opción "Agregar a Inicio”.</p>
          <p>Un ícono de FucerNet va a apararecer en el inicio de su dispositivo y podrá abrirla desde ahí.</p>
        </article>
        <article class="faq-item">
          <h4>¿Cómo puedo abonar FucerNet?</h4>
          <p>FucerNet cuenta con dos medios de pago. Uno de ellos es una tarjeta de crédito, a la cual la aplicación le cobrará de manera mensual y automática el monto de la suscripción (de la misma forma que servicios como Netflix o Spotify).</p>
          <p>Además puede abonar FucerNet vía cobro por débito (CBU).</p>
        </article>
        <article class="faq-item">
          <h4>¿Es seguro poner mi tarjeta de crédito en FucerNet?</h4>
          <p>Todos los pagos son procesados y administrados por Mercado Pago, una de las plataformas de pagos más seguras y populares del país. La información de la tarjeta de crédito que usted agrega en FucerNet es 100% procesada por Mercado Pago, desde Fucer no intervenimos en el proceso. Es decir, no tenemos acceso a la información de su tarjeta de crédito. Adicionalmente, Mercado Pago tiene como requisito que las aplicaciones que utilicen sus servicios cuenten con un certificado de conexión segura SSL. Cuando ingrese a FucerNet desde un navegador, a la izquierda de la URL (net.fucer.com.ar) va a visualizar un candado que indica que la conexión al sitio es segura.</p>
        </article>
      </div>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="footer-cta">
          <h2>Acceda a FucerNet de forma gratuita durante 15 días</h2>
          <p>Nuestro plan mensual tiene un costo de $750 (a partir del 1/7/20) y puede cancelarlo en cualquier momento.</p>
          <nuxt-link :to="{name: 'seleccione-su-plan'}" class="index-btn green">
            Probar 15 días
          </nuxt-link>
        </div>
        <div class="footer-info">
          <div>
            <img src="~/assets/img/logo-fucernet.svg" alt="FucerNet">
            <span>2020 - Fundación Centro de Estudios Registrales</span>
          </div>
          <div class="footer-info_menu">
            <ul>
              <li>
                <nuxt-link :to="{name: 'login'}">
                  Acceder a mi cuenta
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{name: 'seleccione-su-plan'}">
                  Probar 15 días
                </nuxt-link>
              </li>
            </ul>
            <ul>
              <li>
                <a href="mailto:soporte@fucer.com.ar" target="_blank">soporte@fucer.com.ar</a>
              </li>
              <li>
                <a href="https://fucer.com.ar" target="_blank">fucer.com.ar</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  layout: 'signup',
  auth: false,
  data () {
    return {
      title: 'La normativa registral, en una base de datos única en el país',
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$announcer.set(
        `${vm.title} ${vm.$announcer.options.complementRoute}`,
        vm.$announcer.options.politeness
      )
      vm.$utils.moveFocus(vm.$refs.pageFocusTarget)
    })
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'FucerNet es una herramienta digital en la que encontrará el texto completo de las principales Disposiciones complementarias y Circulares aclaratorias del Digesto, con un breve resumen del contenido de las mismas, y diversos artículos de doctrina y jurisprudencia.' }
      ]
    }
  },
}
</script>

<style lang="sass">@import 'sass/pages/index.sass'</style>