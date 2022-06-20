<template>
    <v-stepper v-model="stepState" class="text-center">
        <v-stepper-items>
            <v-stepper-content step="chauffageSolaireStep">
                <v-radio-group v-model="formData.type">
                    <v-radio
                        :label="
                            chauffageSolaireValues.panneauxSolairesAerovoltaiques
                        "
                        :value="
                            chauffageSolaireValues.panneauxSolairesAerovoltaiques
                        "
                        @click="clearRadioAndField()"
                    >
                    </v-radio>
                    <v-radio
                        :label="
                            chauffageSolaireValues.panneauxSolairesPhotovoltaiques
                        "
                        :value="
                            chauffageSolaireValues.panneauxSolairesPhotovoltaiques
                        "
                        @click="clearRadioAndField()"
                    >
                    </v-radio>
                    <v-radio
                        :label="chauffageSolaireValues.plancherSolaire"
                        :value="chauffageSolaireValues.plancherSolaire"
                        @click="formData.quantity = 0"
                    >
                    </v-radio>
                    <v-container>
                        <v-radio-group
                            v-if="
                                formData.type ===
                                chauffageSolaireValues.plancherSolaire
                            "
                            v-model="plancherSolaireType"
                        >
                            <v-container
                                v-for="(i, type) in plancherSolaireValues"
                                :key="i"
                            >
                                <v-radio
                                    :label="type"
                                    :value="type"
                                    @click="formData.quantity = 0"
                                ></v-radio>
                                <v-text-field
                                    v-if="
                                        formData.type ===
                                            chauffageSolaireValues.plancherSolaire &&
                                        plancherSolaireType === type
                                    "
                                    v-model="formData.quantity"
                                    :rules="rulesChauffageSolaireSurface"
                                    onkeydown="return event.keyCode !== 69"
                                    outlined
                                    required
                                    type="number"
                                ></v-text-field>
                            </v-container>
                        </v-radio-group>
                    </v-container>
                    <v-radio
                        :label="chauffageSolaireValues.systemeSolaireCombine"
                        :value="chauffageSolaireValues.systemeSolaireCombine"
                        @click="clearRadioAndField()"
                    >
                    </v-radio>
                    <v-container>
                        <v-text-field
                            v-if="
                                formData.type ===
                                chauffageSolaireValues.systemeSolaireCombine
                            "
                            v-model="formData.quantity"
                            :rules="rulesChauffageSolaireSurface"
                            onkeydown="return event.keyCode !== 69"
                            outlined
                            required
                            type="number"
                        ></v-text-field>
                    </v-container>
                </v-radio-group>
                <v-container>
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
    name: 'ChauffageSolaireForm',
    data: () => ({
        stepState: 'chauffageSolaireStep',
        formData: {
            type: '',
            quantity: ''
        },
        chauffageSolaireType: '',
        chauffageSolaireValues: {
            systemeSolaireCombine: 'Système solaire combiné (SSC)',
            plancherSolaire: 'Plancher solaire',
            panneauxSolairesAerovoltaiques: 'Panneaux solaires aerovoltaiques',
            panneauxSolairesPhotovoltaiques: 'Panneaux solaires photovoltaiques'
        },

        surface: 0,
        rulesChauffageSolaireSurface: [
            (v) => !!v || 'Veuillez ajouter une surface'
        ],

        plancherSolaireType: '',
        plancherSolaireValues: {
            plancherSolaireDirect: 'Plancher solaire direct (PSD)',
            plancherSolaireCombine: 'Plancher solaire combiné (PSC)'
        }
    }),

    methods: {
        isValid() {
            if (this.formData.type === '') {
                return false
            }
            if (
                this.formData.type ===
                    this.chauffageSolaireValues.plancherSolaire ||
                this.formData.type ===
                    this.chauffageSolaireValues.systemeSolaireCombine
            ) {
                if (this.formData.quantity <= 0) {
                    return false
                }
            }
            return true
        },
        clearRadioAndField() {
            this.formData.quantity = 0
        },
        submit() {
            this.$store.commit('reviFormState/setChauffageData', this.formData)
        }
    }
}
</script>
