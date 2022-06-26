<template>
    <v-container class="text-left pa-0">
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="toitureAccessible"
                :value="true"
                color="primaryPressed"
                class="field-title"
                required
                @click="clearRadioAndField()"
            >
                <template #label>
                    <label class="radio-label">{{
                        toitureAccessibleLabel
                    }}</label>
                </template>
            </v-checkbox>
            <v-container v-if="toitureAccessible">
                <v-container
                    v-for="(type, i) in toitureAccessibleValues"
                    :key="i"
                    class="field-container pa-0"
                >
                    <v-checkbox
                        v-model="toitureAccessibleType"
                        :value="type"
                        color="primaryPressed"
                        class="field-title"
                        off-icon="mdi-radiobox-blank"
                        on-icon="mdi-radiobox-marked"
                        required
                        @click="accessibleSurface = 0"
                    >
                        <template #label>
                            <label class="sub-radio-label">{{ type }}</label>
                        </template>
                    </v-checkbox>
                    <v-container>
                        <v-text-field
                            v-if="toitureAccessibleType === type"
                            v-model="accessibleSurface"
                            :rules="rulesToitureSurface"
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
                v-model="toitureNonAccessible"
                :value="true"
                color="primaryPressed"
                class="field-title"
                required
                @click="clearRadioAndField()"
            >
                <template #label>
                    <label class="radio-label">{{
                        toitureNonAccessibleLabel
                    }}</label>
                </template>
            </v-checkbox>
            <v-container v-if="toitureNonAccessible">
                <v-container
                    v-for="(type, i) in toitureNonAccessibleValues"
                    :key="i"
                    class="field-container pa-0"
                >
                    <v-checkbox
                        v-model="toitureNonAccessibleType"
                        :value="type"
                        color="primaryPressed"
                        class="field-title"
                        off-icon="mdi-radiobox-blank"
                        on-icon="mdi-radiobox-marked"
                        required
                        @click="nonAccessibleSurface = 0"
                    >
                        <template #label>
                            <label class="sub-radio-label">{{ type }}</label>
                        </template>
                    </v-checkbox>
                    <v-container>
                        <v-text-field
                            v-if="toitureNonAccessibleType === type"
                            v-model="nonAccessibleSurface"
                            :rules="rulesToitureSurface"
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
    name: 'IsolationToitureForm',
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
        stepState: 'isolationToituresStep',
        toitureAccessible: false,
        toitureAccessibleLabel: 'Accessible',
        toitureNonAccessible: false,
        toitureNonAccessibleLabel: 'Non Accessible',

        toitureAccessibleType: '',
        toitureAccessibleValues: [
            'Bitume ou caoutchouc',
            'Toiture accessible Végetalisation',
            'Gravier'
        ],

        toitureNonAccessibleType: '',
        toitureNonAccessibleValues: [
            'Bois',
            'Carrelage',
            'Dalle gravillonée',
            'Toiture non-accessible Végetalisation',
            'Béton',
            'Pierre naturelle'
        ],

        accessibleSurface: 0,
        nonAccessibleSurface: 0,

        rulesToitureSurface: [(v) => !!v || 'Veuillez ajouter une surface']
    }),

    watch: {
        accessibleSurface() {
            this.emitIsValid()
        },
        nonAccessibleSurface() {
            this.emitIsValid()
        },
        toitureAccessibleType() {
            this.emitIsValid()
        },
        toitureNonAccessibleType() {
            this.emitIsValid()
        },
        toitureAccessible() {
            this.emitIsValid()
        },
        toitureNonAccessible() {
            this.emitIsValid()
        }
    },

    methods: {
        clearRadioAndField() {
            if (!this.toitureAccessible) {
                this.toitureAccessibleType = ''
                this.accessibleSurface = 0
            }

            if (!this.toitureNonAccessible) {
                this.toitureNonAccessibleType = ''
                this.nonAccessibleSurface = 0
            }
        },
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
        },
        submit() {
            if (this.toitureAccessible) {
                this.$store.commit('reviFormState/setIsolationData', {
                    type: this.toitureAccessibleType,
                    quantity: this.accessibleSurface
                })
            }
            if (this.toitureNonAccessible) {
                this.$store.commit('reviFormState/setIsolationData', {
                    type: this.toitureNonAccessibleType,
                    quantity: this.nonAccessibleSurface
                })
            }
        },
        emitIsValid() {
            const formDatas = {}
            if (this.toitureAccessible) {
                formDatas.first = {
                    type: this.toitureAccessibleLabel,
                    quantity: this.accessibleSurface
                }
            }
            if (this.toitureNonAccessible) {
                formDatas.second = {
                    type: this.toitureNonAccessibleType,
                    quantity: this.nonAccessibleSurface
                }
            }
            this.$emit('isValid', this.isValid(), formDatas, this.eventKey)
            return ''
        }
    }
}
</script>
