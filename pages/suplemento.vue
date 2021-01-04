<template>
  <div>
    <Alerta />
    <Top :title="title" />
    <main id="contenido" class="band">
      <div class="container">
        <div class="normativas-container">
          <article class="normativa-module">
            <div class="main">
              <h4 ref="pageFocusTarget">
                <a
                  href="https://mailchi.mp/32734d9eecba/suplemento-registral-fucernet-1433885"
                  target="_blank"
                  >Suplemento Registral Nro. 7</a
                >
              </h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Diciembre 2020</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4 ref="pageFocusTarget">
                <a
                  href="https://mailchi.mp/ce04acf5b705/suplemento-registral-fucernet-1427873"
                  target="_blank"
                  >Suplemento Registral Nro. 6</a
                >
              </h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Noviembre 2020</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4 ref="pageFocusTarget">
                <a
                  href="https://mailchi.mp/7b2d16ad0e57/suplemento-registral-fucernet-1423553"
                  target="_blank"
                  >Suplemento Registral Nro. 5</a
                >
              </h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Octubre 2020</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4>
                <a
                  href="https://mailchi.mp/4a67d2c33823/suplemento-registral-fucernet-1418633"
                  target="_blank"
                  >Suplemento Registral Nro. 4</a
                >
              </h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Septiembre 2020</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4>
                <a
                  href="https://mailchi.mp/6a047cb47e87/suplemento-registral-fucernet-1413805?e=4e780d1ef6"
                  target="_blank"
                  >Suplemento Registral Nro. 3</a
                >
              </h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Agosto 2020</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4>
                <a
                  href="https://mailchi.mp/848c1b889499/suplemento-registral-fucernet-1408397?e=4e780d1ef6"
                  target="_blank"
                  >Suplemento Registral Nro. 2</a
                >
              </h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Julio 2020</a></small>
            </div>
          </article>
          <article class="normativa-module">
            <div class="main">
              <h4>
                <a
                  href="https://mailchi.mp/41711b1ab3dd/suplemento-registral-fucernet?e=4e780d1ef6"
                  target="_blank"
                  >Suplemento Registral Nro. 1</a
                >
              </h4>
              <!-- <p><a href="">bajada</a></p> -->
            </div>
            <div class="extra">
              <small><a>Junio 2020</a></small>
            </div>
          </article>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Top from "~/components/Top.vue";
import Alerta from "~/components/Alerta.vue";

export default {
  layout: "app",
  auth: false,
  components: {
    Top,
    Alerta,
  },
  data() {
    return {
      title: "Suplemento Registral",
    };
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

  head() {
    return {
      title: this.title,
    };
  },
};
</script>
