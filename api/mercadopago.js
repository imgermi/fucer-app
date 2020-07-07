const resource = "mercadopago";

export default ($axios) => ({
  async getPaymentMethods({ id = null, bin = null }) {
    let params = {};
    if (id) {
      params.id = id;
    }
    if (bin) {
      params.bin = bin;
    }
    if (!params) {
      throw new Error(
        "No se pudo obtener el método de pago, debe definir algún parámetro de búsqueda."
      );
    }
    return $axios.$get(`${resource}/payment-methods`, { params });
  },
  async getIdentificationTypes() {
    return $axios.$get(`${resource}/get-identification-types`);
  },
  async clearSession() {
    return $axios.$get(`${resource}/posts`);
  },
  async createToken() {
    return $axios.$post(`${resource}/card-tokens/`, {});
  },
  async updateToken(
    id,
    {
      card_number,
      security_code,
      expiration_month,
      expiration_year,
      cardholder_name,
      cardholder_id_type,
      cardholder_id_number,
    }
  ) {
    return $axios.$put(`${resource}/card-tokens/${id}`, {
      card_number,
      security_code,
      expiration_month: expiration_month.toString(),
      expiration_year: expiration_year.toString(),
      cardholder_name,
      cardholder_id_type,
      cardholder_id_number,
    });
  },
});
