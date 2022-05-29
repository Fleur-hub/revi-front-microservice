<template>
    <v-stepper v-model="stepState" elevation="0">
        <v-stepper-items class="text-center">
            <v-stepper-content step="IsolationPageStep">
                <v-checkbox
                    v-for="(choice, i) in isolationChoice"
                    :key="i"
                    v-model="choice.model"
                    :label="choice.label"
                    :value="true"
                    required
                >
                </v-checkbox>
                <v-btn
                    :disabled="!isChoiceIsolationValid()"
                    class="mr-4"
                    color="primaryMain"
                    @click="
                        computeStep()
                        nextStep()
                    "
                >
                    Valider
                </v-btn>
            </v-stepper-content>
            <v-stepper-content step="IsolationCombleStep">
                <IsolationCombesForm @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content step="IsolationMurStep">
                <IsolationMursForm @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content step="IsolationSolStep">
                <IsolationSolsForm @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content step="IsolationFenetreStep">
                <IsolationFenetresForm @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content step="IsolationToitureStep">
                <IsolationToitureForm @done-event="nextStep()" />
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
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
        stepState: 'IsolationPageStep',
        remainingStep: [],
        isolationChoice: {
            comble: {
                label: 'Isolation des combles',
                model: false
            },
            mur: {
                label: 'Isolation des mur',
                model: false
            },
            sol: {
                label: 'Isolation des sols',
                model: false
            },
            fenetre: {
                label: 'Isolation des fenêtres',
                model: false
            },
            toiture: {
                label: 'Isolation toiture-fenêtre',
                model: false
            }
        }
    }),
    methods: {
        isChoiceIsolationValid() {
            return (
                this.isolationChoice.comble.model ||
                this.isolationChoice.mur.model ||
                this.isolationChoice.sol.model ||
                this.isolationChoice.fenetre.model ||
                this.isolationChoice.toiture.model
            )
        },
        computeStep() {
            if (this.isolationChoice.toiture.model) {
                this.remainingStep.push('IsolationToitureStep')
            }
            if (this.isolationChoice.fenetre.model) {
                this.remainingStep.push('IsolationFenetreStep')
            }
            if (this.isolationChoice.sol.model) {
                this.remainingStep.push('IsolationSolStep')
            }
            if (this.isolationChoice.mur.model) {
                this.remainingStep.push('IsolationMurStep')
            }
            if (this.isolationChoice.comble.model) {
                this.remainingStep.push('IsolationCombleStep')
            }
        },
        nextStep() {
            if (this.remainingStep.length !== 0) {
                this.stepState = this.remainingStep.pop()
            } else {
                this.$emit('done-event')
            }
        }
    }
}
</script>
