<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="isolationFenetresStep">
                <v-checkbox
                    v-model="isolation"
                    :label="chauffeEauTypes[0]"
                    :value="true"
                    required
                    @click="
                        chauffeEauThermodynamiqueType = ''
                        chauffeEauSolaireType = ''
                    "
                >
                </v-checkbox>
                <v-checkbox
                    v-model="refection"
                    :label="chauffeEauTypes[1]"
                    :value="true"
                    required
                    @click="
                        chauffeEauThermodynamiqueType = ''
                        chauffeEauSolaireType = ''
                    "
                >
                </v-checkbox>
                <v-btn
                    :disabled="!(isolation || refection)"
                    color="success"
                    class="mr-4"
                    @click="stepState = computeNextStep()"
                >
                    Valider
                </v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
                <v-radio-group v-model="chauffeEauThermodynamiqueType">
                    <v-radio
                        v-for="(type, i) in chauffeEauThermodynamiqueTypes"
                        :key="i"
                        :label="type"
                        :value="type"
                        required
                    >
                    </v-radio>
                </v-radio-group>
                <v-btn
                    :disabled="chauffeEauThermodynamiqueType === ''"
                    color="success"
                    class="mr-4"
                    @click="stepState = computeNextStep()"
                >
                    Valider
                </v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
                <v-radio-group v-model="chauffeEauSolaireType">
                    <v-radio
                        v-for="(type, i) in chauffeEauSolaireTypes"
                        :key="i"
                        :label="type"
                        :value="type"
                        required
                    >
                    </v-radio>
                </v-radio-group>
                <v-btn
                    :disabled="chauffeEauSolaireType === ''"
                    color="success"
                    class="mr-4"
                    @click="stepState = computeNextStep()"
                >
                    Valider
                </v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'IsolationFenetresForm',
    data: () => ({
        stepState: 'isolationFenetresStep',
        isolation: false,
        refection: false,
        chauffeEauType: '',
        chauffeEauTypes: [
            'Chauffe-eau thermodynamique',
            'Chauffe-eau solaire individuel'
        ],
        rulesChauffeEau: [(v) => !!v || 'Veuillez choisir votre chauffe-eau'],

        chauffeEauThermodynamiqueType: '',
        chauffeEauThermodynamiqueTypes: [
            'Monobloc',
            'Circulation forcée',
            'Système PVT',
            'Capteurs solaires'
        ],

        chauffeEauSolaireType: '',
        chauffeEauSolaireTypes: [
            'Split',
            'Air ambiant',
            'Air extrait',
            'Air extérieur'
        ]
    }),

    methods: {
        computeNextStep() {
            if (this.stepState === 'isolationFenetresStep' && this.isolation) {
                return '2'
            }
            if (this.refection) {
                return '3'
            }
        }
    }
}
</script>
