<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="chauffageGazStep">
                <v-radio-group
                    v-model="formData.type"
                    @click="
                        formData.quantity = 0
                        formData.type = ''
                    "
                >
                    <v-container
                        v-for="(type, i) in chauffageGazValues"
                        :key="i"
                    >
                        <v-radio
                            :label="type"
                            :value="type"
                            required
                            @click="formData.quantity = 0"
                        ></v-radio>
                        <v-container>
                            <v-text-field
                                v-if="
                                    formData.type === chauffageGazValues[2] &&
                                    type === chauffageGazValues[2]
                                "
                                v-model="formData.quantity"
                                :rules="rulesChauffageGazNbRadiateurs"
                                onkeydown="return event.keyCode !== 69"
                                outlined
                                required
                                type="number"
                            ></v-text-field>
                        </v-container>
                    </v-container>
                </v-radio-group>
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
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'ChauffageGazForm',
    data: () => ({
        stepState: 'chauffageGazStep',
        formData: {
            type: '',
            quantity: 0
        },
        chauffageGazType: '',
        chauffageGazValues: [
            'Chaudière à condensation gaz',
            'Chaudière classique gaz',
            'Radiateur au gaz',
            'Poêle au gaz'
        ],

        chauffageGazNbRadiateurs: 0,

        rulesChauffageGazNbRadiateurs: [
            (v) => !!v || 'Veuillez ajouter un nombre de radiateurs'
        ]
    }),

    methods: {
        isValid() {
            if (this.formData.type === '') {
                return false
            } else if (
                this.formData.type === this.chauffageGazValues[2] &&
                this.formData.quantity <= 0
            ) {
                return false
            }
            return true
        },
        submit() {
            this.$store.commit('reviFormState/setChauffageData', this.formData)
        }
    }
}
</script>
