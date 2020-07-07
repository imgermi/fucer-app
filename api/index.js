import mercadopagoRepository from "~/api/mercadopago";

export default ($axios) => ({
  mercadopago: mercadopagoRepository($axios),
});
