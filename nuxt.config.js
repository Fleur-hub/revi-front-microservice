export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - revi-front-microservice',
        title: 'revi-front-microservice',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    scss: ['~/assets/variables.scss'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/'
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        treeShake: true,
        theme: {
            options: {
                customProperties: true
            },
            dark: true,
            themes: {
                dark: {
                    background: '#f9f9fb',
                    primary: '#5a3fe1',

                    /* Primary */
                    primaryBorder: '#bbb0f5',
                    primaryFocus: '#ac9ff0',
                    primaryCard: '#f0ebff',
                    primaryFont: '#f9f9fb',
                    primaryHoover: '#3817d8',
                    primaryPressed: '#210f7f',
                    primarySecondary: '#f7f4ff',
                    primaryMain: '#5a3fe1',

                    /* Info */
                    infoBorder: '#aab6f4',
                    infoFocus: '#e2e6ff',
                    infoHoover: '#001db8',
                    infoPressed: '#001793',
                    infoSecondary: '#ccd3f8',
                    infoMain: '#0023dd',

                    /* Gray */
                    grayScale10: '#ffffff',
                    grayScale20: '#f5f5f5',
                    grayScale30: '#ededed',
                    grayScale40: '#e0e0e0',
                    grayScale50: '#c2c2c2',
                    grayScale60: '#9e9e9e',
                    grayScale70: '#757575',
                    grayScale80: '#616161',
                    grayScale90: '#424242',
                    grayScale100: '#0a0a0a',

                    /* Success */
                    successBorder: '#b5d0c9',
                    successFocus: '#c7eae1',
                    successHoover: '#1b5f4e',
                    successPressed: '#164c3f',
                    successSecondary: '#d2e2de',
                    successMain: '#21725e',

                    /* Warning */
                    warningBorder: '#ffc107',
                    warningFocus: '#f5efb9',
                    warningHoover: '#fcf8ce',
                    warningPressed: '#baab24',
                    warningSecondary: '#f9f5d5',
                    warningMain: '#e0ce2c',

                    /* Danger */
                    dangerBorder: '#e2b6b6',
                    dangerFocus: '#ffdfdf',
                    dangerHoover: '#8c1f1f',
                    dangerPressed: '#541212',
                    dangerSecondary: '#eed3d3',
                    dangerMain: '#a82525'
                }
            }
        },
        font: {
            family: 'Inter'
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        loaders: {
            scss: { sourceMap: false }
        }
    }
}
