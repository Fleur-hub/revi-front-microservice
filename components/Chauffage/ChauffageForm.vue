<template>
    <v-stepper v-model="stepState" elevation="0">
        <v-stepper-items class="text-center">
            <v-stepper-content step="ChauffagePageStep">
                <v-checkbox
                    v-for="(choice, i) in chauffageChoice"
                    :key="i"
                    v-model="choice.model"
                    :label="choice.label"
                    :value="true"
                    required
                >
                </v-checkbox>
                <v-btn
                    :disabled="!isChoiceValid()"
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
            <v-stepper-content :step="chauffageChoice.fioul.step">
                <ChauffageFioulForm @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content :step="chauffageChoice.electrique.step">
                <ChauffageElectriqueForm @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content :step="chauffageChoice.gaz.step">
                <ChauffageGazForm @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content :step="chauffageChoice.bois.step">
                <ChauffageBoisForm :housing-id="0" @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content :step="chauffageChoice.pompeChaleur.step">
                <ChauffagePompeChaleurForm @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content :step="chauffageChoice.solaire.step">
                <ChauffageSolaireForm @done-event="nextStep()" />
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
import ChauffageFioulForm from '~/components/Chauffage/ChauffageFioulForm'
import ChauffageElectriqueForm from '~/components/Chauffage/ChauffageElectriqueForm'
import ChauffageGazForm from '~/components/Chauffage/ChauffageGazForm'
import ChauffageBoisForm from '~/components/Chauffage/ChauffageBoisForm'
import ChauffagePompeChaleurForm from '~/components/Chauffage/ChauffagePompeChaleurForm'
import ChauffageSolaireForm from '~/components/Chauffage/ChauffageSolaireForm'

export default {
    name: 'ChauffageForm',
    components: {
        ChauffageSolaireForm,
        ChauffagePompeChaleurForm,
        ChauffageBoisForm,
        ChauffageGazForm,
        ChauffageElectriqueForm,
        ChauffageFioulForm
    },
    data: () => ({
        stepState: 'ChauffagePageStep',
        remainingStep: [],

        chauffageChoice: {
            bois: {
                label: 'Bois',
                model: false,
                step: 'ChauffageBoisStep'
            },
            electrique: {
                label: 'Electrique',
                model: false,
                step: 'ChauffageElectriqueStep'
            },
            fioul: {
                label: 'Fioul',
                model: false,
                step: 'ChauffageFioulStep'
            },
            gaz: {
                label: 'Gaz',
                model: false,
                step: 'ChauffageGazStep'
            },
            pompeChaleur: {
                label: 'Pompe à chaleur',
                model: false,
                step: 'ChauffagePompeChaleurStep'
            },
            solaire: {
                label: 'Solaire',
                model: false,
                step: 'ChauffageSolaireStep'
            }
        }
    }),
    methods: {
        isChoiceValid() {
            for (const key in this.chauffageChoice) {
                if (this.chauffageChoice[key].model) {
                    return true
                }
            }
            return false
        },
        computeStep() {
            for (const key in this.chauffageChoice) {
                const value = this.chauffageChoice[key]
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
