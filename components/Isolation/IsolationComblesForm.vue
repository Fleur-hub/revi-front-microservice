<template>
    <v-container class="text-left pa-0">
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="combesPerdues"
                :value="true"
                color="primaryPressed"
                class="field-title"
                required
                @click="clearCombesPerdues()"
            >
                <template #label>
                    <label class="radio-label">{{ combesPerduesLabel }}</label>
                </template>
            </v-checkbox>
            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="combesPerdues"
                        v-model="combesPerduesSurface"
                        :rules="rulesCombesSurface"
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
                v-model="combesAmenages"
                :value="true"
                color="primaryPressed"
                class="field-title"
                required
                @click="clearCombesAmenages()"
            >
                <template #label>
                    <label class="radio-label">{{ combesAmenagesLabel }}</label>
                </template>
            </v-checkbox>
            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="combesAmenages"
                        v-model="combesAmenagesSurface"
                        :rules="rulesCombesSurface"
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
    name: 'IsolationCombesForm',
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
        stepState: 'isolationCombesStep',

        combesPerdues: false,
        combesPerduesLabel: 'Combles perdues',
        combesAmenages: false,
        combesAmenagesLabel: 'Combles aménagées',

        combesPerduesSurface: 0,
        combesAmenagesSurface: 0,

        rulesCombesSurface: [(v) => !!v || 'Veuillez ajouter une surface']
    }),
    mounted() {
        this.$watch(
            (vm) => [
                vm.combesPerdues,
                vm.combesAmenages,
                vm.combesPerduesSurface,
                vm.combesAmenagesSurface
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
        clearCombesPerdues() {
            if (!this.combesPerdues) {
                this.combesPerduesSurface = 0
            }
        },
        clearCombesAmenages() {
            if (!this.combesAmenages) {
                this.combesAmenagesSurface = 0
            }
        },
        isValid() {
            if (!this.combesPerdues && !this.combesAmenages) {
                return false
            }

            if (this.combesPerdues && this.combesPerduesSurface <= 0) {
                return false
            }

            return !(this.combesAmenages && this.combesAmenagesSurface <= 0)
        },
        submit() {
            if (this.combesPerdues) {
                this.$store.commit('reviFormState/setIsolationData', {
                    type: this.combesPerduesLabel,
                    quantity: this.combesPerduesSurface
                })
            }
            if (this.combesAmenages) {
                this.$store.commit('reviFormState/setIsolationData', {
                    type: this.combesAmenagesLabel,
                    quantity: this.combesAmenagesSurface
                })
            }
        },
        emitIsValid() {
            const formDatas = {}
            if (this.combesPerdues) {
                formDatas.first = {
                    type: this.combesPerduesLabel,
                    quantity: this.combesPerduesSurface
                }
            }
            if (this.combesAmenages) {
                formDatas.second = {
                    type: this.combesAmenagesLabel,
                    quantity: this.combesAmenagesSurface
                }
            }
            this.$emit('isValid', this.isValid(), formDatas, this.eventKey)
            return ''
        }
    }
}
</script>
