<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="chauffeEauStep">
                <v-radio-group
                    v-model="chauffeEauType"
                    label=" Votre type de chauffe-eau ?"
                >
                    <v-radio
                        :label="chauffeEauTypes[0]"
                        :value="chauffeEauTypes[0]"
                        required
                        @click="
                            chauffeEauThermodynamiqueType = ''
                            chauffeEauSolaireType = ''
                        "
                    >
                    </v-radio>
                    <v-container v-if="chauffeEauType === chauffeEauTypes[0]">
                        <v-radio-group v-model="chauffeEauThermodynamiqueType">
                            <v-radio
                                v-for="(
                                    type, i
                                ) in chauffeEauThermodynamiqueTypes"
                                :key="i"
                                :label="type"
                                :value="type"
                                required
                            >
                            </v-radio>
                        </v-radio-group>
                    </v-container>
                    <v-radio
                        :label="chauffeEauTypes[1]"
                        :value="chauffeEauTypes[1]"
                        required
                        @click="
                            chauffeEauThermodynamiqueType = ''
                            chauffeEauSolaireType = ''
                        "
                    >
                    </v-radio>
                    <v-container v-if="chauffeEauType === chauffeEauTypes[1]">
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
                </v-radio-group>
                <v-btn
                    :disabled="!isChauffeEauValid()"
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
    name: 'ChauffeEauForm',
    data: () => ({
        stepState: 'chauffeEauStep',
        chauffeEauType: '',
        chauffeEauTypes: [
            'Chauffe-eau thermodynamique',
            'Chauffe-eau solaire individuel'
        ],

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
