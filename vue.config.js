module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
    ? '/metronome/'
    : '/',
	filenameHashing: false,
	css: {
		sourceMap: true,
		loaderOptions: {
		sass: {
			additionalData: `@import "~@/assets/styles/sass/style.sass"`
		},
	},
	},
	pwa: {
		name: 'Metronome',
		themeColor: '#4DBA87',
		msTileColor: '#000000',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black-translucent',
	
		manifestOptions: {
			display: 'standalone',
			background_color: '#212529',
			theme_color: '#212529',
			orientation: 'portrait'
		},
	
		workboxPluginMode: 'GenerateSW',
		workboxOptions: {

		}
	}

}
