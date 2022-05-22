<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="ventilationStep">
                <v-radio-group
                    v-model="ventilationType"
                    :rules="rulesVentilation"
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
                            type="number"
                            label="Nombre de VMC"
                            onkeydown="return event.keyCode !== 69"
                            required
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
                            type="number"
                            label="Nombre de VMC"
                            onkeydown="return event.keyCode !== 69"
                            required
                        ></v-text-field>
                    </v-container>
                </v-radio-group>
                <v-btn
                    :disabled="!isVentilationValid()"
                    color="success"
                    class="mr-4"
                    @click="stepState = 2"
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
        rulesVentilation: [(v) => !!v || 'Veuillez choisir votre ventilation'],

        ventilationSimpleNumber: '',

        ventilationDoubleNumber: ''
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
