<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            :clipped="clipped"
            :mini-variant="miniVariant"
            app
            class="navigation-drawer"
            color="background"
            fixed
            permanent
            overlay-color="primaryMain"
            style="border-right: 2px solid #e6e6e6 !important"
        >
            <v-container>
                <h1 class="title">REVI</h1>
            </v-container>
            <v-list class="navigation-drawer-element" dense>
                <v-list-item-group active-class="active-item" multiple>
                    <v-list-item :to="info.to" color="primaryMain" exact router>
                        <v-list-item-action class="menu-step-item">
                            <img
                                :src="info.icon"
                                alt="info icon"
                                class="icon-class"
                            />
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title
                                style="font-size: 14px !important"
                                v-text="info.title"
                            />
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        :class="{
                            'active-item v-list-item--active': isPathTravaux()
                        }"
                        :to="travaux.to"
                        color="primaryMain"
                        exact
                        router
                    >
                        <v-list-item-action class="menu-step-item">
                            <img
                                :src="travaux.icon"
                                alt="travaux icon"
                                class="icon-class"
                            />
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title
                                style="font-size: 14px !important"
                                v-text="travaux.title"
                            />
                        </v-list-item-content>
                    </v-list-item>
                    <v-expand-transition>
                        <v-container
                            v-show="isPathTravaux()"
                            :class="{ 'sub-choosed-travaux': isPathTravaux() }"
                        >
                            <v-list-item
                                v-for="(item, i) in choosedTravaux"
                                :key="i"
                                :to="item.to"
                                color="primaryMain"
                                exact
                                router
                            >
                                <v-list-item-action class="menu-step-item">
                                    <img
                                        :src="item.icon"
                                        alt="sub travaux icon"
                                        class="icon-class"
                                    />
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title
                                        style="font-size: 14px !important"
                                        v-text="item.title"
                                    />
                                </v-list-item-content>
                            </v-list-item>
                        </v-container>
                    </v-expand-transition>
                    <v-list-item
                        :to="financialInfo.to"
                        color="primaryMain"
                        exact
                        router
                    >
                        <v-list-item-action class="menu-step-item">
                            <img
                                :src="financialInfo.icon"
                                alt="financial info icon"
                                class="icon-class"
                            />
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title
                                style="font-size: 14px !important"
                                v-text="financialInfo.title"
                            />
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item
                        :to="personalInfo.to"
                        color="primaryMain"
                        exact
                        router
                    >
                        <v-list-item-action class="menu-step-item">
                            <img
                                :src="personalInfo.icon"
                                alt="personal info icon"
                                class="icon-class"
                            />
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title
                                style="font-size: 14px !important"
                                v-text="personalInfo.title"
                            />
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item
                        :to="report.to"
                        color="primaryMain"
                        exact
                        router
                    >
                        <v-list-item-action class="menu-step-item">
                            <img
                                :src="report.icon"
                                alt="report icon"
                                class="icon-class"
                            />
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title
                                style="font-size: 14px !important"
                                v-text="report.title"
                            />
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
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
            miniVariant: false,
            right: true,
            rightDrawer: false,
            travauxClass: 'active-item v-list-item--active',
            isTravauxClass: false,
            info: {
                icon: '/icon/Menu_horizontal_icone_informations.svg',
                title: 'Informations',
                to: '/housing',
                class: 'info-icon'
            },
            travaux: {
                icon: '/icon/Menu_horizontal_icone_travaux.svg',
                title: 'Mes travaux',
                to: '/travaux'
            },
            choosedTravaux: {
                isolation: {
                    icon: '/icon/Menu_horizontal_icone_isolation.svg',
                    title: 'Isolation',
                    to: '/travaux/isolation',
                    choosed: true
                },
                chauffage: {
                    icon: '/icon/Menu_horizontal_icone_chauffage.svg',
                    title: 'Chauffage',
                    to: '/travaux/chauffage',
                    choosed: true
                },
                chauffeEau: {
                    icon: '/icon/Menu_horizontal_icone_chauffe-eau.svg',
                    title: 'Chauffe-eau',
                    to: '/travaux/chauffeEau',
                    choosed: true
                },
                ventilation: {
                    icon: '/icon/Menu_horizontal_icone_ventilation.svg',
                    title: 'Ventilation',
                    to: '/travaux/ventilation',
                    choosed: true
                }
            },
            financialInfo: {
                icon: '/icon/Menu_horizontal_icone_aides.svg',
                title: 'Mes aides',
                to: '/financialInformation'
            },
            personalInfo: {
                icon: '/icon/Menu_horizontal_icone_info-perso.svg',
                title: 'Mes infos personnelles',
                to: '/personalInformation'
            },
            report: {
                icon: '/icon/Menu_horizontal_icone_compte-rendu.svg',
                title: 'Mon compte-rendue',
                to: '/report'
            },
            title: 'Vuetify.js'
        }
    },
    methods: {
        isPathTravaux() {
            return this.$route.path.includes('/travaux')
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

.navigation-drawer-element {
    border-top: 2px solid #e6e6e6 !important;
    border-bottom: 2px solid #e6e6e6 !important;
}

.navigation-drawer {
    width: 215px !important;
}

.icon-class {
    height: 20px;
    width: 20px;
}

.active-item {
    background-color: $primarySecondary;
    border-radius: 6px;
}

.active-item > div > img {
    filter: brightness(0) saturate(100%) invert(25%) sepia(50%) saturate(6326%)
        hue-rotate(245deg) brightness(91%) contrast(93%);
}

.menu-step-item {
    margin-right: 8px !important;
}

.sub-choosed-travaux {
    border-left: 2px solid #5a3fe1 !important;
    padding-left: 4px !important;
    margin-left: 24px !important;
}
</style>
