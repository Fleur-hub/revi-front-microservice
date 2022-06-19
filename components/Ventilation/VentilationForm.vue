<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="ventilationStep">
                <v-radio-group
                    v-model="formData.ventilationType"
                    label=" Votre type de ventilation ?"
                >
                    <v-radio
                        :label="ventilationTypes[0]"
                        :value="ventilationTypes[0]"
                        required
                        @click="
                            formData.ventilationSimpleNumber = ''
                            formData.ventilationDoubleNumber = ''
                        "
                    >
                    </v-radio>
                    <v-container
                        v-if="formData.ventilationType === ventilationTypes[0]"
                    >
                        <v-text-field
                            v-model="formData.ventilationSimpleNumber"
                            :rules="rulesVentilationNumber"
                            label="Nombre de VMC"
                            onkeydown="return event.keyCode !== 69"
                            outlined
                            required
                            type="number"
                        ></v-text-field>
                    </v-container>
                    <v-radio
                        :label="ventilationTypes[1]"
                        :value="ventilationTypes[1]"
                        required
                        @click="
                            formData.ventilationSimpleNumber = ''
                            formData.ventilationDoubleNumber = ''
                        "
                    >
                    </v-radio>
                    <v-container
                        v-if="formData.ventilationType === ventilationTypes[1]"
                    >
                        <v-text-field
                            v-model="formData.ventilationDoubleNumber"
                            :rules="rulesVentilationNumber"
                            label="Nombre de VMC"
                            onkeydown="return event.keyCode !== 69"
                            outlined
                            required
                            type="number"
                        ></v-text-field>
                    </v-container>
                </v-radio-group>
                <v-btn
                    :disabled="!isVentilationValid()"
                    class="mr-4"
                    color="success"
                    @click="
                        submit()
                        $emit('done-event')
                    "
                >
                    Valider
                </v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'VentilationForm',
    data: () => ({
        stepState: 'ventilationStep',
        formData: {
            ventilationType: '',
            ventilationSimpleNumber: 0,
            ventilationDoubleNumber: 0
        },

        ventilationTypes: ['VMC simple-flux', 'VMC double-flux'],

        rulesVentilationNumber: [
            (v) => !!v || 'Veuillez ajouter un nombre de ventilation'
        ]
    }),

    methods: {
        isVentilationValid() {
            return (
                this.ventilationTypes.includes(this.formData.ventilationType) &&
                (/^\d+$/.test(this.formData.ventilationSimpleNumber) ||
                    /^\d+$/.test(this.formData.ventilationDoubleNumber))
            )
        },
        submit() {
            this.$store.commit(
                'reviFormState/setVentilationData',
                this.formData
            )
        }
    }
}
</script>
