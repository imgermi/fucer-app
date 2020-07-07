if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const worker of registrations) {
      worker.addEventListener("installed", (event) => {
        if (event.isUpdate) {
          if (
            confirm(
              `Hay una nueva versión de la aplicación disponible ¿quiere descargarla?`
            )
          ) {
            window.location.reload();
          }
        }
      });
    }
  });
}
