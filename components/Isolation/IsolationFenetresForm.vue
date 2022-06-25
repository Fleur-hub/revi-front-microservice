<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content
                step="isolationFenetresStep"
                :class="emitIsValid()"
            >
                <v-container>
                    <v-checkbox
                        v-model="isolationSurPlace"
                        :label="isolationSurPlaceLabel"
                        :value="true"
                        required
                        @click="clearIsolationSurPlace()"
                    >
                    </v-checkbox>
                    <v-radio-group
                        v-if="isolationSurPlace"
                        v-model="isolationSurPlaceType"
                    >
                        <v-container
                            v-for="(type, i) in isolationSurPlaceValues"
                            :key="i"
                        >
                            <v-radio
                                :label="type"
                                :value="type"
                                required
                                @click="
                                    isolationSurPlaceNbFenetres = 0
                                    isolationSurPlaceSurface = 0
                                "
                            ></v-radio>
                            <v-container>
                                <v-text-field
                                    v-if="
                                        isolationSurPlaceType ===
                                            isolationSurPlaceValues[0] &&
                                        isolationSurPlaceType === type
                                    "
                                    v-model="isolationSurPlaceNbFenetres"
                                    :rules="rulesFenetresNbFenetres"
                                    onkeydown="return event.keyCode !== 69"
                                    outlined
                                    required
                                    type="number"
                                ></v-text-field>
                                <v-text-field
                                    v-else-if="
                                        isolationSurPlaceType !==
                                            isolationSurPlaceValues[1] &&
                                        isolationSurPlaceType === type
                                    "
                                    v-model="isolationSurPlaceSurface"
                                    :rules="rulesFenetresSurface"
                                    onkeydown="return event.keyCode !== 69"
                                    outlined
                                    required
                                    type="number"
                                ></v-text-field>
                            </v-container>
                        </v-container>
                    </v-radio-group>

                    <v-checkbox
                        v-model="isolationRefection"
                        :label="isolationRefectionLabel"
                        :value="true"
                        required
                        @click="clearIsolationRefection()"
                    >
                    </v-checkbox>
                    <v-radio-group
                        v-if="isolationRefection"
                        v-model="isolationRefectionType"
                    >
                        <v-container
                            v-for="(type, i) in isolationRefectionValues"
                            :key="i"
                        >
                            <v-radio
                                :label="type"
                                :value="type"
                                required
                                @click="isolationRefectionSurface = 0"
                            ></v-radio>
                            <v-container>
                                <v-text-field
                                    v-if="isolationRefectionType === type"
                                    v-model="isolationRefectionSurface"
                                    :rules="rulesFenetresSurface"
                                    onkeydown="return event.keyCode !== 69"
                                    outlined
                                    required
                                    type="number"
                                ></v-text-field>
                            </v-container>
                        </v-container>
                    </v-radio-group>
                </v-container>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'IsolationFentresForm',
    props: {
        eventKey: {
            type: String,
            required: true,
            default() {
                return 'hello'
            }
        }
    },
    data: () => ({
        stepState: 'isolationFenetresStep',
        isolationSurPlace: false,
        isolationSurPlaceLabel: 'Isolation sur modèle en place',
        isolationRefection: false,
        isolationRefectionLabel: 'Isolation par réfection de fenêtre',

        isolationSurPlaceType: '',
        isolationSurPlaceValues: [
            'Joint de calfeutrage',
            'Plastique isolant',
            'Survitrage',
            'Changement vitrage',
            'Volets',
            'Pose volet'
        ],

        isolationRefectionType: '',
        isolationRefectionValues: [
            "Remplacement de l'ouvrant",
            "Pose d'une fenêtre devant une fenêtre existante",
            'Réfection totale de la fenêtre'
        ],

        isolationSurPlaceNbFenetres: 0,
        isolationSurPlaceSurface: 0,
        isolationRefectionSurface: 0,

        rulesFenetresSurface: [(v) => !!v || 'Veuillez ajouter une surface'],
        rulesFenetresNbFenetres: [
            (v) => !!v || 'Veuillez ajouter un nombre de fenêtres'
        ]
    }),

    methods: {
        clearIsolationSurPlace() {
            this.isolationSurPlaceType = ''
            this.isolationSurPlaceNbFenetres = 0
            this.isolationSurPlaceSurface = 0
        },
        clearIsolationRefection() {
            this.isolationRefectionType = ''
            this.isolationRefectionSurface = 0
        },
        isValid() {
            if (!this.isolationRefection && !this.isolationSurPlace) {
                return false
            }

            if (
                this.isolationRefection &&
                (this.isolationRefectionType === '' ||
                    this.isolationRefectionSurface <= 0)
            ) {
                return false
            }

            if (this.isolationSurPlace) {
                if (
                    this.isolationSurPlaceType ===
                        this.isolationSurPlaceValues[0] &&
                    this.isolationSurPlaceNbFenetres <= 0
                ) {
                    return false
                }
                if (
                    this.isolationSurPlaceSurface <= 0 &&
                    this.isolationSurPlaceType !==
                        this.isolationSurPlaceValues[1] &&
                    this.isolationSurPlaceType !==
                        this.isolationSurPlaceValues[0]
                ) {
                    return false
                }
            }
            return true
        },
        submit() {
            let formData
            if (this.isolationSurPlace) {
                formData = {
                    type: this.isolationSurPlaceType,
                    quantity:
                        this.isolationSurPlaceNbFenetres +
                        this.isolationSurPlaceSurface
                }
                this.$store.commit('reviFormState/setIsolationData', formData)
            }
            if (this.isolationRefection) {
                formData = {
                    type: this.isolationRefectionType,
                    quantity: this.isolationRefectionSurface
                }
                this.$store.commit('reviFormState/setIsolationData', formData)
            }
        },
        emitIsValid() {
            const formDatas = {}
            if (this.isolationSurPlace) {
                formDatas.first = {
                    type: this.isolationSurPlaceType,
                    quantity:
                        this.isolationSurPlaceNbFenetres +
                        this.isolationSurPlaceSurface
                }
            }
            if (this.isolationRefection) {
                formDatas.second = {
                    type: this.isolationRefectionType,
                    quantity: this.isolationRefectionSurface
                }
            }
            this.$emit('isValid', this.isValid(), formDatas, this.eventKey)
            return ''
        }
    }
}
</script>
