<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="chauffageStep">
                <v-radio-group
                    v-model="chauffeEauType"
                    :rules="rulesChauffeEau"
                    label=" Votre type de chauffe-eau ?"
                >
                    <v-radio
                        v-for="(type, i) in chauffeEauTypes"
                        :key="i"
                        :label="type"
                        :value="type"
                        required
                        @click="
                            chauffeEauThermodynamiqueType = ''
                            chauffeEauSolaireType = ''
                        "
                    >
                    </v-radio>
                </v-radio-group>
                <v-btn
                    :disabled="!isChauffeEauValid()"
                    color="success"
                    class="mr-4"
                    @click="stepState = 2"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-container v-if="chauffeEauType === chauffeEauTypes[0]">
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

            <v-container v-else-if="chauffeEauType === chauffeEauTypes[1]">
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
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'ChauffageForm',
    data: () => ({
        stepState: 'chauffageStep',
        chauffageType: '',
        chauffageTypes: [
            'Fioul',
            'Electrique',
            'Gaz',
            'Bois',
            'Pompe à chaleur',
            'Solaire'
        ],
        rulesChauffage: [(v) => !!v || 'Veuillez choisir votre chauffage'],

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
