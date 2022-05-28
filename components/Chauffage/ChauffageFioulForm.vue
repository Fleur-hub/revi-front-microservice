<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="chauffageFioulStep">
                <v-radio-group
                    v-model="chauffageFioulType"
                    @click="chauffageFioulType = ''"
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
    name: 'ChauffageFioulForm',
    data: () => ({
        stepState: 'chauffageFioulStep',
        chauffageFioulType: '',
        chauffageFioulValues: [
            'Chaudière à condensation',
            'Chaudière classique'
        ]
    }),

    methods: {
        isValid() {
            return this.chauffageFioulType !== ''
        }
    }
}
</script>
