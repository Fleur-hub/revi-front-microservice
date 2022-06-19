<template>
    <v-container v-if="travauxMeta !== null">
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
        <v-container
            v-if="travauxModule.hasIsolation(travauxMeta)"
            class="panels-container"
        >
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header
                        class="panel-header-title panel-header"
                    >
                        {{ travauxMeta.isolation.title }}
                        <template #actions>
                            <v-icon color="primary"> $expand </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="panel-header">
                        <v-row
                            v-for="(subTravaux, j) in travauxMeta.isolation
                                .travauxList"
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
                                        subTravaux.cost.minCost.toLocaleString() +
                                        ' - ' +
                                        subTravaux.cost.maxCost.toLocaleString()
                                    }}€
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{ subTravaux.aideGroup.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text> wip </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
        <v-container
            v-if="travauxModule.hasChauffage(travauxMeta)"
            class="panels-container"
        >
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header
                        class="panel-header-title panel-header"
                    >
                        {{ travauxMeta.chauffage.title }}
                        <template #actions>
                            <v-icon color="primary"> $expand </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="panel-header">
                        <v-row
                            v-for="(subTravaux, j) in travauxMeta.chauffage
                                .travauxList"
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
                                        subTravaux.cost.minCost.toLocaleString() +
                                        ' - ' +
                                        subTravaux.cost.maxCost.toLocaleString()
                                    }}€
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{ subTravaux.aideGroup.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text> wip </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
        <v-container
            v-if="travauxModule.hasChauffeEau(travauxMeta)"
            class="panels-container"
        >
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header
                        class="panel-header-title panel-header"
                    >
                        {{ travauxMeta.chauffeEau.title }}
                        <template #actions>
                            <v-icon color="primary"> $expand </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="panel-header">
                        <v-row
                            v-for="(subTravaux, j) in travauxMeta.chauffeEau
                                .travauxList"
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
                                        subTravaux.cost.minCost.toLocaleString() +
                                        ' - ' +
                                        subTravaux.cost.maxCost.toLocaleString()
                                    }}€
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{ subTravaux.aideGroup.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text> wip </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
        <v-container
            v-if="travauxModule.hasVentilation(travauxMeta)"
            class="panels-container"
        >
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header
                        class="panel-header-title panel-header"
                    >
                        {{ travauxMeta.ventilation.title }}
                        <template #actions>
                            <v-icon color="primary"> $expand </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="panel-header">
                        <v-row
                            v-for="(subTravaux, j) in travauxMeta.ventilation
                                .travauxList"
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
                                        subTravaux.cost.minCost.toLocaleString() +
                                        ' - ' +
                                        subTravaux.cost.maxCost.toLocaleString()
                                    }}€
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text>
                                    {{ subTravaux.aideGroup.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text> wip </v-card-text>
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
                                    {{ travauxMeta.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text
                                    class="text-right panel-total-content"
                                >
                                    {{
                                        travauxMeta.cost.minCost.toLocaleString() +
                                        ' - ' +
                                        travauxMeta.cost.maxCost.toLocaleString()
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
                                    Aides
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text
                                    class="text-right panel-total-content"
                                >
                                    {{
                                        travauxMeta.aideGroup.total.toLocaleString()
                                    }}€
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content
                        v-if="travauxMeta.aideGroup.renov.amount !== 0"
                        class="panel-total"
                    >
                        <v-row>
                            <v-col>
                                <v-card-text class="text-left">
                                    {{ travauxMeta.aideGroup.renov.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text class="text-right">
                                    {{
                                        travauxMeta.aideGroup.renov.amount.toLocaleString()
                                    }}€
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content
                        v-if="travauxMeta.aideGroup.serenite.amount !== 0"
                        class="panel-total"
                    >
                        <v-row>
                            <v-col>
                                <v-card-text class="text-left">
                                    {{ travauxMeta.aideGroup.serenite.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text class="text-right">
                                    {{
                                        travauxMeta.aideGroup.serenite.amount.toLocaleString()
                                    }}€
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content
                        v-if="travauxMeta.aideGroup.zero.amount !== 0"
                        class="panel-total"
                    >
                        <v-row>
                            <v-col>
                                <v-card-text class="text-left">
                                    {{ travauxMeta.aideGroup.zero.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text class="text-right">
                                    {{
                                        travauxMeta.aideGroup.zero.amount.toLocaleString()
                                    }}€
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content
                        v-if="travauxMeta.aideGroup.pouce.amount !== 0"
                        class="panel-total"
                    >
                        <v-row>
                            <v-col>
                                <v-card-text class="text-left">
                                    {{ travauxMeta.aideGroup.pouce.title }}
                                </v-card-text>
                            </v-col>
                            <v-col>
                                <v-card-text class="text-right">
                                    {{
                                        travauxMeta.aideGroup.pouce.amount.toLocaleString()
                                    }}€
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
import * as tm from '~/store/TravauxModule'

export default {
    name: 'ReportComponent',
    data: () => ({
        panelModel: [1],
        travauxModule: tm,
        travauxMeta: null
    }),
    mounted() {
        this.getReportData()
    },
    methods: {
        getReportData() {
            this.travauxMeta =
                this.$store.getters['reviFormState/getTravauxMeta']
        }
    }
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
    padding-bottom: 0 !important;
}
</style>
