<template>
    <v-container class="text-left pa-0">
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="isolationSurPlace"
                :value="true"
                color="primaryPressed"
                class="field-title"
                required
                @click="clearIsolationSurPlace()"
            >
                <template #label>
                    <label class="radio-label">{{
                        isolationSurPlaceLabel
                    }}</label>
                </template>
            </v-checkbox>
            <v-container v-if="isolationSurPlace">
                <v-container
                    v-for="(type, i) in isolationSurPlaceValues"
                    :key="i"
                    class="field-container pa-0"
                >
                    <v-checkbox
                        v-model="isolationSurPlaceType"
                        :value="type"
                        color="primaryPressed"
                        class="field-title"
                        off-icon="mdi-radiobox-blank"
                        on-icon="mdi-radiobox-marked"
                        required
                        @click="
                            isolationSurPlaceNbFenetres = 0
                            isolationSurPlaceSurface = 0
                        "
                    >
                        <template #label>
                            <label class="sub-radio-label">{{ type }}</label>
                        </template>
                    </v-checkbox>
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
            </v-container>
        </v-container>
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="isolationRefection"
                :value="true"
                color="primaryPressed"
                class="field-title"
                required
                @click="clearIsolationRefection()"
            >
                <template #label>
                    <label class="radio-label">{{
                        isolationRefectionLabel
                    }}</label>
                </template>
            </v-checkbox>
            <v-container v-if="isolationRefection">
                <v-container
                    v-for="(type, i) in isolationRefectionValues"
                    :key="i"
                    class="field-container pa-0"
                >
                    <v-checkbox
                        v-model="isolationRefectionType"
                        :value="type"
                        color="primaryPressed"
                        class="field-title"
                        off-icon="mdi-radiobox-blank"
                        on-icon="mdi-radiobox-marked"
                        required
                        @click="isolationRefectionSurface = 0"
                    >
                        <template #label>
                            <label class="sub-radio-label">{{ type }}</label>
                        </template>
                    </v-checkbox>
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
            </v-container>
        </v-container>
    </v-container>
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
    mounted() {
        this.$watch(
            (vm) => [
                vm.isolationSurPlace,
                vm.isolationRefection,
                vm.isolationSurPlaceType,
                vm.isolationRefectionType,
                vm.isolationSurPlaceNbFenetres,
                vm.isolationSurPlaceSurface,
                vm.isolationRefectionSurface
            ],
            () => {
                this.emitIsValid()
            },
            {
                immediate: true,
                deep: true
            }
        )
    },
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
