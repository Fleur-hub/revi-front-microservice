<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="isolationStep">
                <v-checkbox
                    v-model="firstChoice"
                    :label="chauffeEauTypes[0]"
                    :value="chauffeEauTypes[0]"
                    required
                    @click="
                        chauffeEauThermodynamiqueType = ''
                        chauffeEauSolaireType = ''
                    "
                >
                </v-checkbox>
                <v-container v-if="firstChoice">
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
                </v-container>
                <v-checkbox
                    v-model="secondeChoice"
                    :label="chauffeEauTypes[1]"
                    :value="chauffeEauTypes[1]"
                    required
                    @click="
                        chauffeEauThermodynamiqueType = ''
                        chauffeEauSolaireType = ''
                    "
                >
                </v-checkbox>
                <v-container v-if="secondeChoice">
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
                </v-container>
                <v-btn
                    :disabled="!isChauffeEauValid()"
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
    name: 'IsolationForm',
    data: () => ({
        stepState: 'isolationStep',
        firstChoice: false,
        secondeChoice: false,
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
        isChauffeEauValid() {
            return (
                this.chauffeEauTypes.includes(this.chauffeEauType) &&
                (this.chauffeEauThermodynamiqueTypes.includes(
                    this.chauffeEauThermodynamiqueType
                ) ||
                    this.chauffeEauSolaireTypes.includes(
                        this.chauffeEauSolaireType
                    ))
            )
        }
    }
}
</script>
