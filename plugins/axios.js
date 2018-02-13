export default function ({ app, $axios }) {
  if (app.$auth.token) {
    $axios.setToken(app.$auth.token, 'Bearer')
  }
}
