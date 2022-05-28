<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="chauffageGazStep">
                <v-radio-group
                    v-model="chauffageGazType"
                    @click="
                        chauffageGazNbRadiateurs = 0
                        chauffageGazType = ''
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
                            @click="chauffageGazNbRadiateurs = 0"
                        ></v-radio>
                        <v-container>
                            <v-text-field
                                v-if="
                                    chauffageGazType ===
                                        chauffageGazValues[2] &&
                                    type === chauffageGazValues[2]
                                "
                                v-model="chauffageGazNbRadiateurs"
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
    name: 'ChauffageGazForm',
    data: () => ({
        stepState: 'chauffageGazStep',
        chauffageGazType: '',
        chauffageGazValues: [
            'Chaudière à condensation',
            'Chaudière classique',
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
            if (this.chauffageGazType === '') {
                return false
            } else if (
                this.chauffageGazType === this.chauffageGazValues[2] &&
                this.chauffageGazNbRadiateurs <= 0
            ) {
                return false
            }
            return true
        }
    }
}
</script>
