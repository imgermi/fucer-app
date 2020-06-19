const path = require('path')
const { injectManifest } = require('workbox-build')

export default function nuxtWorkboxExtension() {
  this.nuxt.hook('build:before', async (nuxt) => {
    let cachingExtensions = nuxt.options.pwa.workbox.cachingExtensions || []
    cachingExtensions = Array.isArray(cachingExtensions) ? cachingExtensions : [cachingExtensions]
    nuxt.options.pwa.workbox.cachingExtensions = cachingExtensions.concat(['~/modules/pwa-extension-inject.js'])
  })
  this.nuxt.hook('build:compiled', async () => {
    const swFile = path.resolve(this.options.srcDir, this.options.dir.static || 'static', 'sw.js')
    await injectManifest({
      globDirectory: this.options.srcDir + '/.nuxt/dist/',
      globPatterns: [
        '**/*.{js,css}'
      ],
      swSrc: swFile,
      swDest: swFile,
      modifyURLPrefix: {
        'client/': '/_nuxt/',
        'server/': '/_nuxt/'
      },
      injectionPoint: 'self.__PWA_EXTENSION'
    })
  })
}
