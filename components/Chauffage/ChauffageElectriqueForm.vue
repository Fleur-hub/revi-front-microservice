<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="chauffageElectriqueStep">
                <v-radio-group
                    v-model="chauffageElectriqueType"
                    @click="
                        chauffageBoisNbCheminees = 0
                        chauffageBoisType = ''
                    "
                >
                    <v-container>
                        <v-radio
                            :label="chauffageElectriqueValues[0]"
                            :value="chauffageElectriqueValues[0]"
                            required
                            @click="chauffageBoisNbCheminees = 0"
                        ></v-radio>
                        <v-radio-group
                            v-model="chauffageChaudiereElectriqueType"
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
                                    @click="chauffageBoisNbCheminees = 0"
                                ></v-radio>
                                <v-container>
                                    <v-text-field
                                        v-if="
                                            chauffageChaudiereElectriqueValues[0] ===
                                                chauffageChaudiereElectriqueType &&
                                            type ===
                                                chauffageChaudiereElectriqueValues[0]
                                        "
                                        v-model="chauffageElectriqueSurface"
                                        :rules="rulesChauffageElectriqueSurface"
                                        onkeydown="return event.keyCode !== 69"
                                        outlined
                                        required
                                        type="number"
                                    ></v-text-field>
                                </v-container>
                            </v-container>
                        </v-radio-group>
                    </v-container>
                    <v-container>
                        <v-radio
                            :label="chauffageElectriqueValues[1]"
                            :value="chauffageElectriqueValues[1]"
                            required
                            @click="chauffageBoisNbCheminees = 0"
                        ></v-radio>
                        <v-container>
                            <v-text-field
                                v-model="rulesChauffageElectriqueSurface"
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
                            @click="chauffageBoisNbCheminees = 0"
                        ></v-radio>
                        <v-container>
                            <v-text-field
                                v-model="rulesChauffageElectriqueSurface"
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
    name: 'ChauffageElectriqueForm',
    data: () => ({
        stepState: 'chauffageElectriqueStep',
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

        chauffageElectriqueSurface: 0,

        rulesChauffageElectriqueSurface: [
            (v) => !!v || 'Veuillez ajouter une surface'
        ]
    }),

    methods: {
        isValid() {
            if (!this.toitureAccessible && !this.toitureNonAccessible) {
                return false
            }

            if (this.toitureAccessible) {
                if (
                    this.toitureAccessibleType === '' ||
                    this.accessibleSurface <= 0
                ) {
                    return false
                }
            }

            if (this.toitureNonAccessible) {
                if (
                    this.toitureNonAccessibleType === '' ||
                    this.nonAccessibleSurface <= 0
                ) {
                    return false
                }
            }
            return true
        }
    }
}
</script>
