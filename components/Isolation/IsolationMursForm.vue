<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="isolationMursStep" :class="emitIsValid()">
                <v-container>
                    <v-checkbox
                        v-model="mursInterieur"
                        :label="mursInterieurLabel"
                        :value="true"
                        required
                        @click="clearMursInterieur()"
                    >
                    </v-checkbox>
                    <v-container>
                        <v-text-field
                            v-if="mursInterieur"
                            v-model="mursInterieurSurface"
                            :rules="rulesMursSurface"
                            onkeydown="return event.keyCode !== 69"
                            outlined
                            required
                            type="number"
                        ></v-text-field>
                    </v-container>

                    <v-checkbox
                        v-model="mursExterieur"
                        :label="mursExterieurLabel"
                        :value="true"
                        required
                        @click="clearMursExterieur()"
                    >
                    </v-checkbox>
                    <v-container>
                        <v-text-field
                            v-if="mursExterieur"
                            v-model="mursExterieurSurface"
                            :rules="rulesMursSurface"
                            onkeydown="return event.keyCode !== 69"
                            outlined
                            required
                            type="number"
                        ></v-text-field>
                    </v-container>
                </v-container>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'IsolationMursForm',
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
        stepState: 'isolationMursStep',

        formData: {
            type: '',
            quantity: 0
        },

        mursInterieur: false,
        mursInterieurLabel: 'Murs intérieurs',
        mursExterieur: false,
        mursExterieurLabel: 'Murs extérieurs',

        mursInterieurSurface: 0,
        mursExterieurSurface: 0,

        rulesMursSurface: [(v) => !!v || 'Veuillez ajouter une surface']
    }),

    methods: {
        clearMursInterieur() {
            if (!this.mursInterieur) {
                this.mursInterieurSurface = 0
            }
        },
        clearMursExterieur() {
            if (!this.mursExterieur) {
                this.mursExterieurSurface = 0
            }
        },
        isValid() {
            if (!this.mursInterieur && !this.mursExterieur) {
                return false
            }

            if (this.mursInterieur && this.mursInterieurSurface <= 0) {
                return false
            }

            return !(this.mursExterieur && this.mursExterieurSurface <= 0)
        },
        submit() {
            if (this.mursInterieur) {
                this.$store.commit('reviFormState/setIsolationData', {
                    type: this.mursInterieurLabel,
                    quantity: this.mursInterieurSurface
                })
            }
            if (this.mursExterieur) {
                this.$store.commit('reviFormState/setIsolationData', {
                    type: this.mursExterieurLabel,
                    quantity: this.mursExterieurSurface
                })
            }
        },
        emitIsValid() {
            const formDatas = {}
            if (this.mursExterieur) {
                formDatas.first = {
                    type: this.mursExterieurLabel,
                    quantity: this.mursExterieurSurface
                }
            }
            if (this.mursInterieur) {
                formDatas.second = {
                    type: this.mursInterieurLabel,
                    quantity: this.mursInterieurSurface
                }
            }
            this.$emit('isValid', this.isValid(), formDatas, this.eventKey)
            return ''
        }
    }
}
</script>
