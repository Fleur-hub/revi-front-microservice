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
            <v-stepper-content :step="isolationChoice.comble.step">
                <IsolationCombesForm @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content :step="isolationChoice.mur.step">
                <IsolationMursForm @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content :step="isolationChoice.sol.step">
                <IsolationSolsForm @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content :step="isolationChoice.fenetre.step">
                <IsolationFenetresForm @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content :step="isolationChoice.toiture.step">
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
                model: false,
                step: 'IsolationCombleStep'
            },
            mur: {
                label: 'Isolation des mur',
                model: false,
                step: 'IsolationMurStep'
            },
            sol: {
                label: 'Isolation des sols',
                model: false,
                step: 'IsolationSolStep'
            },
            fenetre: {
                label: 'Isolation des fenêtres',
                model: false,
                step: 'IsolationFenetreStep'
            },
            toiture: {
                label: 'Isolation toiture-fenêtre',
                model: false,
                step: 'IsolationToitureStep'
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
            for (const key in this.isolationChoice) {
                const value = this.isolationChoice[key]
                if (value.model) {
                    this.remainingStep.push(value.step)
                }
            }
            this.remainingStep = this.remainingStep.reverse()
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
