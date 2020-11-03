export default function ({ app }) {
  if (!process.client) return;
  window.onNuxtReady(() => {
    // Actualiza los datos del usuario cada 30 min
    setTimeout(() => {
      if (app.$auth.loggedIn) {
        app.$auth.fetchUser();
      }
    }, 30 * 60000);
  });
}
