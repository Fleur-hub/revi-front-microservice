<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card-title> Travaux </v-card-title>
            </v-col>
            <v-col>
                <v-card-title> Coût </v-card-title>
            </v-col>
            <v-col>
                <v-card-title> Aides </v-card-title>
            </v-col>
            <v-col>
                <v-card-title> Valorisation </v-card-title>
            </v-col>
        </v-row>
        <v-container class="panels-container">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header
                        class="panel-header-title panel-header"
                    >
                        {{ isolation.title }}
                        <template #actions>
                            <v-icon color="primary"> $expand </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="panel-header">
                        <v-row
                            v-for="(subTravaux, j) in isolation.items"
                            :key="j"
                        >
                            <v-col>
                                <v-card-text class="panel-title">
                                    {{ subTravaux.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{
                                        subTravaux.minCost +
                                        '-' +
                                        subTravaux.maxCost
                                    }}€
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{ subTravaux.aides }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{ subTravaux.valorization }}
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
        <v-container class="panels-container">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header
                        class="panel-header-title panel-header"
                    >
                        {{ chauffage.title }}
                        <template #actions>
                            <v-icon color="primary"> $expand </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="panel-header">
                        <v-row
                            v-for="(subTravaux, j) in chauffage.items"
                            :key="j"
                        >
                            <v-col>
                                <v-card-text class="panel-title">
                                    {{ subTravaux.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{
                                        subTravaux.minCost +
                                        '-' +
                                        subTravaux.maxCost
                                    }}€
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{ subTravaux.aides }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{ subTravaux.valorization }}
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
        <v-container class="panels-container">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header
                        class="panel-header-title panel-header"
                    >
                        {{ chauffeEau.title }}
                        <template #actions>
                            <v-icon color="primary"> $expand </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="panel-header">
                        <v-row
                            v-for="(subTravaux, j) in chauffeEau.items"
                            :key="j"
                        >
                            <v-col>
                                <v-card-text class="panel-title">
                                    {{ subTravaux.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{
                                        subTravaux.minCost +
                                        '-' +
                                        subTravaux.maxCost
                                    }}€
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{ subTravaux.aides }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{ subTravaux.valorization }}
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
        <v-container class="panels-container">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header
                        class="panel-header-title panel-header"
                    >
                        {{ ventilation.title }}
                        <template #actions>
                            <v-icon color="primary"> $expand </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="panel-header">
                        <v-row
                            v-for="(subTravaux, j) in ventilation.items"
                            :key="j"
                        >
                            <v-col>
                                <v-card-text class="panel-title">
                                    {{ subTravaux.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{
                                        subTravaux.minCost +
                                        '-' +
                                        subTravaux.maxCost
                                    }}€
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{ subTravaux.aides }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{ subTravaux.valorization }}
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
        <v-container class="panels-total-container">
            <v-expansion-panels disabled>
                <v-expansion-panel>
                    <v-expansion-panel-header
                        class="panel-header-title panel-total"
                    >
                        <v-row>
                            <v-col>
                                <v-card-text
                                    class="text-left panel-total-content"
                                >
                                    {{ totalTravaux.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text
                                    class="text-right panel-total-content"
                                >
                                    {{
                                        totalTravaux.minCost +
                                        '-' +
                                        totalTravaux.maxCost
                                    }}€
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-header>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
        <v-container class="panels-total-container">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header
                        class="panel-header-title panel-total"
                    >
                        <v-row>
                            <v-col>
                                <v-card-text
                                    class="text-left panel-total-content"
                                >
                                    {{ aide.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text
                                    class="text-right panel-total-content"
                                >
                                    total : {{ aide.total }}€
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="panel-total">
                        <v-row v-for="(item, j) in aide.items" :key="j">
                            <v-col>
                                <v-card-text
                                    class="text-left panel-total-content"
                                >
                                    {{ item.type }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text
                                    class="text-right panel-total-content"
                                >
                                    {{ item.amount }}€
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'ReportPage',
    data: () => ({
        panelModel: [1],
        isolation: {
            title: 'Isolation',
            items: {
                item: {
                    title: 'Comble perdues',
                    minCost: 1000,
                    maxCost: 3000,
                    aides: 'Renov',
                    valorization: 500
                },
                item2: {
                    title: 'Comble gangé',
                    minCost: 1000,
                    maxCost: 3000,
                    aides: 'Renov',
                    valorization: 500
                }
            }
        },
        chauffage: {
            title: 'Chauffage',
            items: {
                item: {
                    title: 'Electrique',
                    minCost: 1000,
                    maxCost: 3000,
                    aides: 'Renov',
                    valorization: 500
                }
            }
        },
        chauffeEau: {
            title: 'Chauffe-eau',
            items: {
                item: {
                    title: 'Monobloc',
                    minCost: 1000,
                    maxCost: 3000,
                    aides: 'Renov',
                    valorization: 500
                }
            }
        },
        ventilation: {
            title: 'Ventilation',
            items: {
                item: {
                    title: 'VMC simple',
                    minCost: 1000,
                    maxCost: 3000,
                    aides: 'Renov',
                    valorization: 500
                }
            }
        },
        totalTravaux: {
            title: 'Coût des travaux',
            minCost: 1000,
            maxCost: 3000,
            aides: 'Renov',
            valorization: 500
        },
        aide: {
            title: 'Aide',
            total: 5000,
            items: {
                item: {
                    type: 'Renov',
                    amount: 5000
                },
                item2: {
                    type: 'Serenite',
                    amount: 5000
                },
                item3: {
                    type: 'Eco',
                    amount: 5000
                },
                item4: {
                    type: 'Pouce',
                    amount: 5000
                }
            }
        }
    })
}
</script>

<style lang="scss">
.v-card__title {
    color: $grayScale80;
    font-size: 16px !important;
    font-weight: bold;
    padding: 0 !important;
}

.panel-header {
    background-color: $primaryCard;
    color: $primaryMain;
}

.v-expansion-panel-content__wrap {
    padding-left: 8px !important;
}

.panel-header-title {
    color: $primaryPressed !important;
    font-weight: bold !important;
}

.panel-title {
    color: $primaryPressed !important;
}
.theme--dark.v-expansion-panels .v-expansion-panel {
    background-color: rgba(0, 0, 0, 0) !important;
}

button.panel-header-title {
    margin-left: 0 !important;
    margin-top: 0 !important;
}

.panels-container {
    margin: 0 !important;
    padding-left: 0;
    padding-right: 0;
}

.panel-total {
    background-color: $primaryMain;
    color: $primaryCard !important;
}

.panel-total-content {
    font-weight: bold !important;
}

.panels-total-container {
    margin: 0 !important;
    padding-left: 0;
    padding-right: 0;
    padding-top: 40px !important;
}

.panel-total > .v-expansion-panel-content__wrap {
    padding-left: 24px !important;
    padding-right: 48px !important;
}
</style>
