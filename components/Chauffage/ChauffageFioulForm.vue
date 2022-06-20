<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="chauffageFioulStep">
                <v-radio-group
                    v-model="formData.type"
                    @click="formData.type = ''"
                >
                    <v-container
                        v-for="(type, i) in chauffageFioulValues"
                        :key="i"
                    >
                        <v-radio :label="type" :value="type" required></v-radio>
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
    name: 'ChauffageFioulForm',
    data: () => ({
        stepState: 'chauffageFioulStep',
        formData: {
            type: '',
            quantity: 1
        },
        chauffageFioulType: '',
        chauffageFioulValues: [
            'Chaudière à condensation fioul',
            'Chaudière classique fioul'
        ]
    }),

    methods: {
        isValid() {
            return this.formData.type !== ''
        },
        submit() {
            this.$store.commit('reviFormState/setChauffageData', this.formData)
        }
    }
}
</script>
