<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="ventilationStep">
                <v-radio-group
                    v-model="ventilationType"
                    label=" Votre type de ventilation ?"
                >
                    <v-radio
                        :label="ventilationTypes[0]"
                        :value="ventilationTypes[0]"
                        required
                        @click="
                            ventilationSimpleNumber = ''
                            ventilationDoubleNumber = ''
                        "
                    >
                    </v-radio>
                    <v-container v-if="ventilationType === ventilationTypes[0]">
                        <v-text-field
                            v-model="ventilationSimpleNumber"
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
                            ventilationSimpleNumber = ''
                            ventilationDoubleNumber = ''
                        "
                    >
                    </v-radio>
                    <v-container v-if="ventilationType === ventilationTypes[1]">
                        <v-text-field
                            v-model="ventilationDoubleNumber"
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
                    @click="$emit('done-event')"
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
        ventilationType: '',
        ventilationTypes: ['VMC simple-flux', 'VMC double-flux'],

        ventilationSimpleNumber: 0,
        ventilationDoubleNumber: 0,

        rulesVentilationNumber: [
            (v) => !!v || 'Veuillez ajouter un nombre de ventilation'
        ]
    }),

    methods: {
        isVentilationValid() {
            return (
                this.ventilationTypes.includes(this.ventilationType) &&
                (/^\d+$/.test(this.ventilationSimpleNumber) ||
                    /^\d+$/.test(this.ventilationDoubleNumber))
            )
        }
    }
}
</script>
