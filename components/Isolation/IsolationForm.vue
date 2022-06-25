<template>
    <v-card class="mx-auto" elevation="0">
        <v-window v-model="stepState">
            <v-window-item :value="1" class="text-right">
                <v-container
                    v-for="(choice, i) in isolationChoice"
                    :key="i"
                    class="field-container text-right spaced-container"
                >
                    <v-checkbox
                        v-model="selected"
                        class="field-title"
                        color="primaryPressed"
                        :value="choice"
                        required
                    >
                        <template #label>
                            <label class="radio-label">{{
                                choice.label
                            }}</label>
                        </template>
                    </v-checkbox>
                </v-container>
            </v-window-item>
            <v-window-item
                v-for="(item, i) in selected"
                :key="i"
                :value="item.step"
                class="pa-0"
            >
                <component
                    :is="item.component"
                    @done-event="computeStep(1)"
                    @isValid="setSubFormValid"
                />
            </v-window-item>
        </v-window>
        <v-card-actions style="padding-right: 0">
            <v-container class="buttons-container">
                <v-btn
                    :color="stepState === 1 ? 'grayScale60' : 'secondary'"
                    @click="computeStep(-1)"
                >
                    Retour
                </v-btn>
                <v-btn
                    style="margin-right: 0 !important"
                    :color="isValid() ? 'primaryMain' : 'primaryBorder'"
                    @click="computeStep(1)"
                >
                    Valider
                </v-btn>
            </v-container>
        </v-card-actions>
    </v-card>
</template>

<script>
import IsolationCombesForm from '~/components/Isolation/IsolationComblesForm'
import IsolationMursForm from '~/components/Isolation/IsolationMursForm'
import IsolationSolsForm from '~/components/Isolation/IsolationSolsForm'
import IsolationToitureForm from '~/components/Isolation/IsolationToitureForm'
import IsolationFenetresForm from '~/components/Isolation/IsolationFenetresForm'

export default {
    name: 'IsolationForm',
    components: {
        IsolationToitureForm,
        IsolationSolsForm,
        IsolationMursForm,
        IsolationCombesForm,
        IsolationFenetresForm
    },
    data: () => ({
        stepState: 1,
        selected: [],
        stepInitialized: false,
        subFormIsValid: false,
        formData: {
            type: '',
            quantity: 0
        },
        isolationChoice: {
            comble: {
                label: 'Isolation des combles',
                step: -1,
                component: IsolationCombesForm
            },
            mur: {
                label: 'Isolation des mur',
                step: -1,
                component: IsolationMursForm
            },
            sol: {
                label: 'Isolation des sols',
                step: -1,
                component: IsolationSolsForm
            },
            fenetre: {
                label: 'Isolation des fenêtres',
                step: -1,
                component: IsolationFenetresForm
            },
            toiture: {
                label: 'Isolation toiture-fenêtre',
                step: -1,
                component: IsolationToitureForm
            }
        }
    }),
    methods: {
        isValid() {
            if (this.stepState === 1) {
                return this.selected.length !== 0 || this.subFormIsValid
            }
            return this.subFormIsValid
        },
        initSteps() {
            let stepIndex = 1
            for (const key in this.selected) {
                const value = this.selected[key]
                value.step = ++stepIndex
            }
        },
        setSubFormValid(isValid, formData) {
            this.subFormIsValid = isValid
            this.formData = formData
        },
        computeStep(direction) {
            if (this.stepState === 1) {
                this.initSteps()
            }
            if (direction < 0) {
                if (this.stepState > 1) {
                    this.stepState -= 1
                }
            } else if (this.isValid()) {
                if (this.stepState === this.selected.length + 1) {
                    this.$emit('done-event')
                } else {
                    this.stepState += 1
                }
            }
        }
    }
}
</script>
