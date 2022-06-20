<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="isolationSolsStep">
                <v-container>
                    <v-checkbox
                        v-model="solsLocal"
                        :label="solsLocalLabel"
                        :value="true"
                        required
                        @click="clearSolsLocal()"
                    >
                    </v-checkbox>
                    <v-container>
                        <v-text-field
                            v-if="solsLocal"
                            v-model="solsLocalSurface"
                            :rules="rulesSolsSurface"
                            onkeydown="return event.keyCode !== 69"
                            outlined
                            required
                            type="number"
                        ></v-text-field>
                    </v-container>

                    <v-checkbox
                        v-model="solsTerrePlein"
                        :label="solsTerrePleinLabel"
                        :value="true"
                        required
                        @click="clearSolsTerrePlein()"
                    >
                    </v-checkbox>
                    <v-container>
                        <v-text-field
                            v-if="solsTerrePlein"
                            v-model="solsTerrePleinSurface"
                            :rules="rulesSolsSurface"
                            onkeydown="return event.keyCode !== 69"
                            outlined
                            required
                            type="number"
                        ></v-text-field>
                    </v-container>

                    <v-checkbox
                        v-model="solsSanitaire"
                        :label="solsSanitaireLabel"
                        :value="true"
                        required
                        @click="clearSolsSanitaire()"
                    >
                    </v-checkbox>
                    <v-container>
                        <v-text-field
                            v-if="solsSanitaire"
                            v-model="solsSanitaireSurface"
                            :rules="rulesSolsSurface"
                            onkeydown="return event.keyCode !== 69"
                            outlined
                            required
                            type="number"
                        ></v-text-field>
                    </v-container>

                    <v-checkbox
                        v-model="solsPlancher"
                        :label="solsPlancherLabel"
                        :value="true"
                        required
                        @click="clearSolsPlancher()"
                    >
                    </v-checkbox>
                    <v-container>
                        <v-text-field
                            v-if="solsPlancher"
                            v-model="solsPlancherSurface"
                            :rules="rulesSolsSurface"
                            onkeydown="return event.keyCode !== 69"
                            outlined
                            required
                            type="number"
                        ></v-text-field>
                    </v-container>

                    <v-btn
                        :disabled="!isValid()"
                        class="mr-4"
                        color="success"
                        @click="
                            submit()
                            $emit('done-event')
                        "
                    >
                        Valider
                    </v-btn>
                </v-container>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'IsolationSolsForm',
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
        }
    }
}
</script>
