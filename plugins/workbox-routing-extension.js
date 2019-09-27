// Este script se ejecuta después de cargar workbox y antes de registrar el SW

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
workbox.routing.setCatchHandler( async ({event}) => {
	// Busca en una caché personalizada como último recurso
	// Esta caché se crea fuera del WorkService (dentro de la app)
	const cache = await caches.open('fucer-favoritos')
	const cachedResponse = await cache.match(event.request)
	return cachedResponse || Response.error()
})
