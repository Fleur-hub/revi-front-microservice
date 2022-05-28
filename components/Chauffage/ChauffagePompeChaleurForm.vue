<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="chauffagePompeChaleurStep">
                <v-radio-group
                    v-model="chauffagePompeChaleurType"
                    @click="
                        chauffagePompeChaleurSurface = 0
                        chauffagePompeChaleurType = ''
                    "
                >
                    <v-container
                        v-for="(type, i) in chauffagePompeChaleurValues"
                        :key="i"
                    >
                        <v-radio
                            :label="type"
                            :value="type"
                            required
                            @click="chauffagePompeChaleurSurface = 0"
                        ></v-radio>
                        <v-container>
                            <v-text-field
                                v-if="chauffagePompeChaleurType === type"
                                v-model="chauffagePompeChaleurSurface"
                                :rules="rulesChauffageSurface"
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
    name: 'ChauffagePompeChaleurForm',
    data: () => ({
        stepState: 'chauffagePompeChaleurStep',
        chauffagePompeChaleurType: '',
        chauffagePompeChaleurValues: [
            'Pompe à chaleur Sol/Eau',
            'Pompe à chaleur Sol/Air',
            'Pompe à chaleur Air/Air',
            'Pompe à chaleur Air/Eau',
            'Pompe à chaleur Eau/Eau'
        ],

        chauffagePompeChaleurSurface: 0,

        rulesChauffagePompeChaleurSurface: [
            (v) => !!v || 'Veuillez ajouter une surface'
        ]
    }),

    methods: {
        isValid() {
            return (
                this.chauffagePompeChaleurType !== '' &&
                this.chauffagePompeChaleurSurface > 0
            )
        }
    }
}
</script>
