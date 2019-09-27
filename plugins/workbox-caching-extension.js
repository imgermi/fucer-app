// Este script se ejecuta una vez que workbox está disponible

workbox.addEventListener('installed', event => {
	if (event.isUpdate) {
	  if (confirm(`Hay una nueva versión de la aplicación disponible ¿quiere descargarla?`)) {
	    window.location.reload();
	  }
	}
});