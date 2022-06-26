<template>
    <v-container class="text-left pa-0">
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="mursInterieur"
                :value="true"
                color="primaryPressed"
                class="field-title"
                required
                @click="clearMursInterieur()"
            >
                <template #label>
                    <label class="radio-label">{{ mursInterieurLabel }}</label>
                </template>
            </v-checkbox>
            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="mursInterieur"
                        v-model="mursInterieurSurface"
                        :rules="rulesMursSurface"
                        onkeydown="return event.keyCode !== 69"
                        outlined
                        required
                        type="number"
                    ></v-text-field>
                </v-expand-transition>
            </v-container>
        </v-container>
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="mursExterieur"
                :value="true"
                color="primaryPressed"
                class="field-title"
                required
                @click="clearMursExterieur()"
            >
                <template #label>
                    <label class="radio-label">{{ mursExterieurLabel }}</label>
                </template>
            </v-checkbox>
            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="mursExterieur"
                        v-model="mursExterieurSurface"
                        :rules="rulesMursSurface"
                        onkeydown="return event.keyCode !== 69"
                        outlined
                        required
                        type="number"
                    ></v-text-field>
                </v-expand-transition>
            </v-container>
        </v-container>
    </v-container>
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
        mursInterieur: false,
        mursInterieurLabel: 'Murs intérieurs',
        mursExterieur: false,
        mursExterieurLabel: 'Murs extérieurs',

        mursInterieurSurface: 0,
        mursExterieurSurface: 0,

        rulesMursSurface: [(v) => !!v || 'Veuillez ajouter une surface']
    }),

    mounted() {
        this.$watch(
            (vm) => [
                vm.mursInterieur,
                vm.mursExterieur,
                vm.mursInterieurSurface,
                vm.mursExterieurSurface
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
