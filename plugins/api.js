import createRepository from "~/api";
export default ({ $axios }, inject) => {
  inject("api", createRepository($axios));
};
