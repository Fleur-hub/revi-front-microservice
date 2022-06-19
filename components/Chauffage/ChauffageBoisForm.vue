<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="chauffageBoisStep">
                <v-radio-group v-model="chauffageBoisType">
                    <v-container>
                        <v-radio
                            :label="chauffageBoisValues[0]"
                            :value="chauffageBoisValues[0]"
                            required
                            @click="
                                formData.quantity = 1
                                formData.type = ''
                            "
                        ></v-radio>
                        <v-radio-group
                            v-if="chauffageBoisType === chauffageBoisValues[0]"
                            v-model="formData.type"
                        >
                            <v-container
                                v-for="(
                                    type, i
                                ) in chauffageChaudiereBoisValues"
                                :key="i"
                            >
                                <v-radio
                                    :label="type"
                                    :value="type"
                                    required
                                    @click="formData.quantity = 1"
                                ></v-radio>
                            </v-container>
                        </v-radio-group>
                    </v-container>
                    <v-container>
                        <v-radio
                            :label="chauffageBoisValues[1]"
                            :value="chauffageBoisValues[1]"
                            required
                            @click="
                                formData.quantity = 0
                                formData.type = ''
                            "
                        ></v-radio>
                        <v-radio-group
                            v-if="chauffageBoisType === chauffageBoisValues[1]"
                            v-model="formData.type"
                        >
                            <v-container
                                v-for="(type, i) in chauffageInsertBoisValues"
                                :key="i"
                            >
                                <v-radio
                                    :label="type"
                                    :value="type"
                                    required
                                    @click="formData.quantity = 0"
                                ></v-radio>

                                <v-container v-if="formData.type === type">
                                    <v-text-field
                                        v-model="formData.quantity"
                                        :rules="ruleschauffageBoisNbCheminees"
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
                            :label="chauffageBoisValues[2]"
                            :value="chauffageBoisValues[2]"
                            required
                            @click="
                                formData.quantity = 1
                                formData.type = ''
                            "
                        ></v-radio>
                        <v-radio-group
                            v-if="chauffageBoisType === chauffageBoisValues[2]"
                            v-model="formData.type"
                        >
                            <v-container
                                v-for="(type, i) in chauffagePoeleBoisValues"
                                :key="i"
                            >
                                <v-radio
                                    :label="type"
                                    :value="type"
                                    required
                                    @click="formData.quantity = 1"
                                ></v-radio>
                            </v-container>
                        </v-radio-group>
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
    name: 'ChauffageBoisForm',
    data: () => ({
        stepState: 'chauffageBoisStep',
        formData: {
            type: '',
            quantity: 0
        },
        chauffageBoisType: '',
        chauffageBoisValues: [
            'Chaudière à bois',
            'Insert cheminée',
            'Poele à bois'
        ],

        chauffageChaudiereBoisType: '',
        chauffageChaudiereBoisValues: [
            'Modèle à bûches',
            'Modèle à granulés',
            'Modèle à plaquettes de bois',
            'Modèle mixte'
        ],

        chauffageInsertBoisType: '',
        chauffageInsertBoisValues: [
            'Foyer fermé',
            'Insert à bûches',
            'Insert à granulés'
        ],

        chauffagePoeleBoisType: '',
        chauffagePoeleBoisValues: [
            'Poêle à bois suspendu',
            "Poêle à bois d'angle",
            'Poêle à bois à double combustion',
            'Poêle à bois encastrable'
        ],

        chauffageBoisNbCheminees: 0,

        ruleschauffageBoisNbCheminees: [
            (v) => !!v || 'Veuillez ajouter un nombre de cheminées'
        ]
    }),

    methods: {
        isValid() {
            return (
                this.formData.type !== '' &&
                !this.chauffageBoisValues.includes(this.formData.type) &&
                this.formData.quantity > 0
            )
        },
        submit() {
            this.$store.commit('reviFormState/setChauffageData', this.formData)
        }
    }
}
</script>
