// Este script se ejecuta después de cargar workbox y antes de registrar el SW

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
workbox.routing.setCatchHandler( async ({event, url}) => {
	// Busca en una caché personalizada como último recurso
	// Estas caché se crea fuera del WorkService (dentro de la app)
	const cachesApp = await Promise.all(
		['fucer-api', 'fucer-cms'].map(c => caches.open(c))
	)
	let cacheMatch;
	for (let i = 0; i < cachesApp.length; i++) {
		const c = cachesApp[i];
		cacheMatch = await c.match(url.pathname)
		if (!cacheMatch) {
			cacheMatch = await c.match(event.request.url)
		}
		if (cacheMatch) {
			return cacheMatch
		}
	}
	return Response.error()
})
