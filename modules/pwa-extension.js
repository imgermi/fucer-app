const { getManifest } = require('workbox-build')

export default function nuxtWorkboxExtension() {
  this.nuxt.hook('build:before', async (nuxt, buildOptions) => {
    const { manifestEntries } = await getManifest({
      globDirectory: this.options.srcDir + '/.nuxt/dist/client',
      globPatterns: [
        '**/*.{js,css}'
      ],
      modifyURLPrefix: {
        '': '/_nuxt/'
      },
    })
    const preCaching = nuxt.options.pwa.workbox.preCaching || []
    nuxt.options.pwa.workbox.preCaching = preCaching.concat(manifestEntries)
  })
}