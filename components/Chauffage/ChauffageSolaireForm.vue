<template>
    <v-container class="text-left pa-0" :class="emitIsValid()">
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="chauffageSolaireType"
                :value="chauffageSolaireValues.panneauxSolairesAerovoltaiques"
                color="primaryPressed"
                class="field-title"
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
                @click="
                    formData.quantity = 0
                    formData.type =
                        chauffageSolaireValues.panneauxSolairesAerovoltaiques
                "
            >
                <template #label>
                    <label class="radio-label">{{
                        chauffageSolaireValues.panneauxSolairesAerovoltaiques
                    }}</label>
                </template>
            </v-checkbox>
        </v-container>
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="chauffageSolaireType"
                :value="chauffageSolaireValues.panneauxSolairesPhotovoltaiques"
                color="primaryPressed"
                class="field-title"
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
                @click="
                    formData.quantity = 0
                    formData.type =
                        chauffageSolaireValues.panneauxSolairesPhotovoltaiques
                "
            >
                <template #label>
                    <label class="radio-label">{{
                        chauffageSolaireValues.panneauxSolairesPhotovoltaiques
                    }}</label>
                </template>
            </v-checkbox>
        </v-container>
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="chauffageSolaireType"
                :value="chauffageSolaireValues.plancherSolaire"
                color="primaryPressed"
                class="field-title"
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
                @click="
                    formData.quantity = 0
                    formData.type = ''
                "
            >
                <template #label>
                    <label class="radio-label">{{
                        chauffageSolaireValues.plancherSolaire
                    }}</label>
                </template>
            </v-checkbox>
            <v-expand-transition>
                <v-container
                    v-if="
                        chauffageSolaireType ===
                        chauffageSolaireValues.plancherSolaire
                    "
                >
                    <v-container
                        v-for="(type, i) in plancherSolaireValues"
                        :key="i"
                        class="field-container pa-0"
                    >
                        <v-checkbox
                            v-model="formData.type"
                            :value="type"
                            color="primaryPressed"
                            class="field-title"
                            off-icon="mdi-radiobox-blank"
                            on-icon="mdi-radiobox-marked"
                            @click="
                                formData.quantity = 0
                                display()
                            "
                        >
                            <template #label>
                                <label class="sub-radio-label">{{
                                    type
                                }}</label>
                            </template>
                        </v-checkbox>
                        <v-expand-transition>
                            <v-text-field
                                v-if="formData.type === type"
                                v-model="formData.quantity"
                                :rules="rulesChauffageSolaireSurface"
                                onkeydown="return event.keyCode !== 69"
                                outlined
                                required
                                type="number"
                            ></v-text-field>
                        </v-expand-transition>
                    </v-container>
                </v-container>
            </v-expand-transition>
        </v-container>
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="chauffageSolaireType"
                :value="chauffageSolaireValues.systemeSolaireCombine"
                color="primaryPressed"
                class="field-title"
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
                @click="
                    formData.quantity = 0
                    formData.type = chauffageSolaireValues.systemeSolaireCombine
                "
            >
                <template #label>
                    <label class="radio-label">{{
                        chauffageSolaireValues.systemeSolaireCombine
                    }}</label>
                </template>
            </v-checkbox>
            <v-container>
                <v-expand-transition>
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
                </v-expand-transition>
            </v-container>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'ChauffageSolaireForm',
    data: () => ({
        stepState: 1,
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
                this.chauffageSolaireType ===
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
        emitIsValid() {
            this.$emit('isValid', this.isValid(), this.formData)
            return ''
        },
        display() {
        },
        computeStep(direction) {
            if (direction < 0) {
                if (this.stepState > 1) {
                    this.stepState -= 1
                }
            } else if (this.isValid()) {
                if (this.stepState === 1) {
                    this.submit()
                    this.$emit('done-event')
                } else {
                    this.stepState += 1
                }
            }
        },
        submit() {
            this.$store.commit('reviFormState/setChauffageData', this.formData)
        }
    }
}
</script>
