<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="chauffageElectriqueStep">
                <v-radio-group v-model="chauffageElectriqueType">
                    <v-container>
                        <v-radio
                            :label="chauffageElectriqueValues[0]"
                            :value="chauffageElectriqueValues[0]"
                            required
                            @click="
                                formData.quantity = 0
                                formData.type = ''
                            "
                        ></v-radio>
                        <v-expand-transition>
                            <v-radio-group
                                v-if="
                                    chauffageElectriqueType ===
                                    chauffageElectriqueValues[0]
                                "
                                v-model="formData.type"
                            >
                                <v-container
                                    v-for="(
                                        type, i
                                    ) in chauffageChaudiereElectriqueValues"
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
                                                chauffageChaudiereElectriqueValues[0] ===
                                                    formData.type &&
                                                type ===
                                                    chauffageChaudiereElectriqueValues[0]
                                            "
                                            v-model="formData.quantity"
                                            :rules="
                                                rulesChauffageElectriqueSurface
                                            "
                                            onkeydown="return event.keyCode !== 69"
                                            outlined
                                            required
                                            type="number"
                                        ></v-text-field>
                                    </v-container>
                                </v-container>
                            </v-radio-group>
                        </v-expand-transition>
                    </v-container>
                    <v-container>
                        <v-radio
                            :label="chauffageElectriqueValues[1]"
                            :value="chauffageElectriqueValues[1]"
                            required
                            @click="
                                formData.quantity = 0
                                formData.type = chauffageElectriqueValues[1]
                            "
                        ></v-radio>
                        <v-container
                            v-if="
                                chauffageElectriqueType ===
                                chauffageElectriqueValues[1]
                            "
                        >
                            <v-text-field
                                v-model="formData.quantity"
                                :rules="rulesChauffageElectriqueSurface"
                                onkeydown="return event.keyCode !== 69"
                                outlined
                                required
                                type="number"
                            ></v-text-field>
                        </v-container>
                    </v-container>
                    <v-container>
                        <v-radio
                            :label="chauffageElectriqueValues[2]"
                            :value="chauffageElectriqueValues[2]"
                            required
                            @click="
                                formData.quantity = 0
                                formData.type = chauffageElectriqueValues[2]
                            "
                        ></v-radio>
                        <v-container
                            v-if="
                                chauffageElectriqueType ===
                                chauffageElectriqueValues[2]
                            "
                        >
                            <v-text-field
                                v-model="formData.quantity"
                                :rules="rulesChauffageElectriqueSurface"
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
    name: 'ChauffageElectriqueForm',
    data: () => ({
        stepState: 'chauffageElectriqueStep',
        formData: {
            type: '',
            quantity: 0
        },
        chauffageElectriqueType: '',
        chauffageElectriqueValues: [
            'Chaudière électrique',
            'Plafonds ou planchers chauffants',
            'Radiateurs électriques'
        ],

        chauffageChaudiereElectriqueType: '',
        chauffageChaudiereElectriqueValues: [
            'Murale',
            'Au sol',
            'Ionique',
            'A basse température'
        ],

        requireSurface: [
            'Plafonds ou planchers chauffants',
            'Radiateurs électriques',
            'Murale'
        ],
        chauffageElectriqueSurface: 0,

        rulesChauffageElectriqueSurface: [
            (v) => !!v || 'Veuillez ajouter une surface'
        ]
    }),

    methods: {
        isValid() {
            if (this.formData.type === '') {
                return false
            }
            return this.requireSurface.includes(this.formData.type)
                ? this.formData.quantity > 0
                : true
        },
        submit() {
            this.$store.commit('reviFormState/setChauffageData', this.formData)
        }
    }
}
</script>
