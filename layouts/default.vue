<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            :clipped="clipped"
            :mini-variant="miniVariant"
            app
            color="background"
            fixed
            overlay-color="primaryMain"
            permanent
        >
            <v-container>
                <h1 class="title">REVI</h1>
            </v-container>
            <v-list class="navigation-drawer">
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :to="item.to"
                    color="primaryMain"
                    exact
                    router
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>
        <v-footer :absolute="!fixed" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [
                {
                    icon: 'mdi-apps',
                    title: 'Informations',
                    to: '/'
                },
                {
                    icon: 'mdi-form-select',
                    title: 'Mes travaux',
                    to: '/revi'
                },
                {
                    icon: 'mdi-form-select',
                    title: 'Isolation',
                    to: '/travaux/isolation'
                },
                {
                    icon: 'mdi-form-select',
                    title: 'Chauffage',
                    to: '/travaux/chauffage'
                },
                {
                    icon: 'mdi-form-select',
                    title: 'Chauffe-eau',
                    to: '/travaux/chauffeEau'
                },
                {
                    icon: 'mdi-form-select',
                    title: 'Ventilation',
                    to: '/travaux/ventilation'
                },
                {
                    icon: 'mdi-form-select',
                    title: 'Mes aides',
                    to: '/financialInformation'
                },
                {
                    icon: 'mdi-form-select',
                    title: 'Mes information personnelles',
                    to: '/personalInformation'
                },
                {
                    icon: 'mdi-form-select',
                    title: 'Mon compte-rendue',
                    to: '/'
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js'
        }
    }
}
</script>

<style lang="scss">
.v-list-item > * {
    color: $grayScale70 !important;
}

.v-list-item__action > * {
    color: $grayScale70 !important;
}

.v-list-item--active * {
    color: $primaryMain !important;
}

.title {
    color: $grayScale100;
}

.navigation-drawer {
    border: 1px !important;
    border-color: #9e9e9e;
}
</style>
