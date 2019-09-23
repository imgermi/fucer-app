// Este plugin se levanta después de @nuxt/auth
export default async function ({ app }) {
  if (app.$auth.loggedIn) {

  }
}