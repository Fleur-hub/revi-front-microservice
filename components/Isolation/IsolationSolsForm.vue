<template>
    <v-container class="text-left pa-0">
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="solsLocal"
                :value="true"
                color="primaryPressed"
                class="field-title"
                required
                @click="clearSolsLocal()"
            >
                <template #label>
                    <label class="radio-label">{{ solsLocalLabel }}</label>
                </template>
            </v-checkbox>
            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="solsLocal"
                        v-model="solsLocalSurface"
                        :rules="rulesSolsSurface"
                        onkeydown="return event.keyCode !== 69"
                        outlined
                        required
                        type="number"
                    ></v-text-field>
                </v-expand-transition>
            </v-container>
        </v-container>
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="solsTerrePlein"
                :value="true"
                color="primaryPressed"
                class="field-title"
                required
                @click="clearSolsTerrePlein()"
            >
                <template #label>
                    <label class="radio-label">{{ solsTerrePleinLabel }}</label>
                </template>
            </v-checkbox>
            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="solsTerrePlein"
                        v-model="solsTerrePleinSurface"
                        :rules="rulesSolsSurface"
                        onkeydown="return event.keyCode !== 69"
                        outlined
                        required
                        type="number"
                    ></v-text-field>
                </v-expand-transition>
            </v-container>
        </v-container>
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="solsSanitaire"
                :value="true"
                color="primaryPressed"
                class="field-title"
                required
                @click="clearSolsSanitaire()"
            >
                <template #label>
                    <label class="radio-label">{{ solsSanitaireLabel }}</label>
                </template>
            </v-checkbox>
            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="solsSanitaire"
                        v-model="solsSanitaireSurface"
                        :rules="rulesSolsSurface"
                        onkeydown="return event.keyCode !== 69"
                        outlined
                        required
                        type="number"
                    ></v-text-field>
                </v-expand-transition>
            </v-container>
        </v-container>
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="solsPlancher"
                :value="true"
                color="primaryPressed"
                class="field-title"
                required
                @click="clearSolsPlancher()"
            >
                <template #label>
                    <label class="radio-label">{{ solsPlancherLabel }}</label>
                </template>
            </v-checkbox>
            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="solsPlancher"
                        v-model="solsPlancherSurface"
                        :rules="rulesSolsSurface"
                        onkeydown="return event.keyCode !== 69"
                        outlined
                        required
                        type="number"
                    ></v-text-field>
                </v-expand-transition>
            </v-container>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'IsolationSolsForm',
    props: {
        eventKey: {
            type: String,
            required: true,
            default() {
                return 'hello'
            }
        }
    },
    data: () => ({
        stepState: 'isolationSolsStep',

        solsLocal: false,
        solsLocalLabel: 'Local chauffé',
        solsTerrePlein: false,
        solsTerrePleinLabel: 'Terre-plein',
        solsSanitaire: false,
        solsSanitaireLabel: 'Vide sanitaire non accessible',
        solsPlancher: false,
        solsPlancherLabel: 'Plancher en étage',

        solsLocalSurface: 0,
        solsTerrePleinSurface: 0,
        solsSanitaireSurface: 0,
        solsPlancherSurface: 0,

        rulesSolsSurface: [(v) => !!v || 'Veuillez ajouter une surface']
    }),
    mounted() {
        this.$watch(
            (vm) => [
                vm.solsLocal,
                vm.solsTerrePlein,
                vm.solsSanitaire,
                vm.solsPlancher,
                vm.solsLocalSurface,
                vm.solsTerrePleinSurface,
                vm.solsSanitaireSurface,
                vm.solsPlancherSurface
            ],
            () => {
                this.emitIsValid()
            },
            {
                immediate: true,
                deep: true
            }
        )
    },
    methods: {
        clearSolsLocal() {
            if (!this.solsLocal) {
                this.solsLocalSurface = 0
            }
        },
        clearSolsTerrePlein() {
            if (!this.solsTerrePlein) {
                this.solsTerrePleinSurface = 0
            }
        },
        clearSolsSanitaire() {
            if (!this.solsSanitaire) {
                this.solsSanitaireSurface = 0
            }
        },
        clearSolsPlancher() {
            if (!this.solsPlancher) {
                this.solsPlancherSurface = 0
            }
        },
        isValid() {
            if (
                !this.solsLocal &&
                !this.solsTerrePlein &&
                !this.solsSanitaire &&
                !this.solsPlancher
            ) {
                return false
            }

            if (this.solsLocal && this.solsLocalSurface <= 0) {
                return false
            }

            if (this.solsTerrePlein && this.solsTerrePleinSurface <= 0) {
                return false
            }

            if (this.solsSanitaire && this.solsSanitaireSurface <= 0) {
                return false
            }

            return !(this.solsPlancher && this.solsPlancherSurface <= 0)
        },
        submit() {
            if (this.solsLocal) {
                this.$store.commit('reviFormState/setIsolationData', {
                    type: this.solsLocalLabel,
                    quantity: this.solsLocalSurface
                })
            }
            if (this.solsTerrePlein) {
                this.$store.commit('reviFormState/setIsolationData', {
                    type: this.solsTerrePleinLabel,
                    quantity: this.solsTerrePleinSurface
                })
            }
            if (this.solsSanitaire) {
                this.$store.commit('reviFormState/setIsolationData', {
                    type: this.solsSanitaireLabel,
                    quantity: this.solsSanitaireSurface
                })
            }
            if (this.solsPlancher) {
                this.$store.commit('reviFormState/setIsolationData', {
                    type: this.solsPlancherLabel,
                    quantity: this.solsPlancherSurface
                })
            }
        },
        emitIsValid() {
            const formDatas = {}
            if (this.solsLocal) {
                formDatas.first = {
                    type: this.solsLocalLabel,
                    quantity: this.solsLocalSurface
                }
            }
            if (this.solsTerrePlein) {
                formDatas.second = {
                    type: this.solsTerrePleinLabel,
                    quantity: this.solsTerrePleinSurface
                }
            }
            if (this.solsSanitaire) {
                formDatas.third = {
                    type: this.solsSanitaireLabel,
                    quantity: this.solsSanitaireSurface
                }
            }
            if (this.solsPlancher) {
                formDatas.fourth = {
                    type: this.solsPlancherLabel,
                    quantity: this.solsPlancherSurface
                }
            }
            this.$emit('isValid', this.isValid(), formDatas, this.eventKey)
            return ''
        }
    }
}
</script>
