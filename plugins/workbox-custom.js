
// workbox.routing.registerRoute(
//   '^https://fucer\.com\.ar/app/api/normativas/id/(.*)',
//   new workbox.strategies.CacheFirst({
//       cacheName: 'stories',
//       plugins: [
//         new workbox.expiration.Plugin({
//           maxEntries: 50,
//           maxAgeSeconds: 5 * 60, // 5 minutes
//         }),
//         new workbox.cacheableResponse.Plugin({
//           statuses: [0, 200],
//         }),
//       ],
//   }),
//   'GET'
// );

