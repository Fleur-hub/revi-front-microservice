<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="chauffagePompeChaleurStep">
                <v-radio-group
                    v-model="formData.type"
                    @click="
                        formData.quantity = 0
                        formData.type = ''
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
                            @click="formData.quantity = 0"
                        ></v-radio>
                        <v-container>
                            <v-text-field
                                v-if="formData.type === type"
                                v-model="formData.quantity"
                                :rules="rulesChauffagePompeChaleurSurface"
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
    name: 'ChauffagePompeChaleurForm',
    data: () => ({
        stepState: 'chauffagePompeChaleurStep',
        formData: {
            type: '',
            quantity: ''
        },
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
            return this.formData.type !== '' && this.formData.quantity > 0
        },
        submit() {
            this.$store.commit('reviFormState/setChauffageData', this.formData)
        }
    }
}
</script>
