if (process.client && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      for (const worker of registrations) {
        worker.addEventListener("installed", (event) => {
          if (
            event.isUpdate &&
            confirm(
              `Hay una nueva versión de la aplicación disponible ¿quiere descargarla?`
            )
          ) {
            window.location.reload();
          }
        });
      }
      return registrations;
    })
    .catch(console.log.bind(console));
}
