<template>
    <v-stepper v-model="stepState" elevation="0">
        <v-stepper-items>
            <v-stepper-content step="housing">
                <HousingInformationForm
                    @done-event="stepState = 'TravauxChoiceStep'"
                />
            </v-stepper-content>
            <v-stepper-content step="TravauxChoiceStep">
                <v-checkbox
                    v-for="(choice, i) in travauxChoisi"
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
            <v-stepper-content :step="travauxChoisi.chauffage.step">
                <ChauffageForm class="text-center" @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content :step="travauxChoisi.chauffeEau.step">
                <ChauffeEauForm class="text-center" @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content :step="travauxChoisi.isolation.step">
                <IsolationForm class="text-center" @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content :step="travauxChoisi.ventilation.step">
                <VentilationForm class="text-center" @done-event="nextStep()" />
            </v-stepper-content>
            <v-stepper-content step="financialStep">
                <FinancialInformationForm
                    class="text-center"
                    @done-event="nextStep()"
                />
            </v-stepper-content>
            <v-stepper-content step="personalStep">
                <PersonalInformationForm
                    class="text-center"
                    @done-event="nextStep()"
                />
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
import axios from 'axios'
import HousingInformationForm from '~/components/Information/HousingInformationForm'
import ChauffageForm from '~/components/Chauffage/ChauffageForm'
import ChauffeEauForm from '~/components/ChauffeEau/ChauffeEauForm'
import IsolationForm from '~/components/Isolation/IsolationForm'
import VentilationForm from '~/components/Ventilation/VentilationForm'
import FinancialInformationForm from '~/components/Information/FinancialInformationForm'
import PersonalInformationForm from '~/components/Information/PersonalInformationForm'

export default {
    name: 'ReviForm',
    components: {
        PersonalInformationForm,
        FinancialInformationForm,
        VentilationForm,
        IsolationForm,
        ChauffeEauForm,
        ChauffageForm,
        HousingInformationForm
    },
    data: () => ({
        stepState: 'housing',
        remainingStep: [],

        travauxChoisi: {
            chauffage: {
                label: 'Chauffage',
                model: false,
                step: 'ChauffageStep'
            },
            chauffeEau: {
                label: 'Chauffe-eau',
                model: false,
                step: 'ChauffeEauStep'
            },
            isolation: {
                label: 'Isolation',
                model: false,
                step: 'IsolationStep'
            },
            ventilation: {
                label: 'Ventilation',
                model: false,
                step: 'VentilationStep'
            }
        }
    }),
    methods: {
        isChoiceValid() {
            for (const key in this.travauxChoisi) {
                if (this.travauxChoisi[key].model) {
                    return true
                }
            }
            return false
        },
        computeStep() {
            for (const key in this.travauxChoisi) {
                const value = this.travauxChoisi[key]
                if (value.model) {
                    this.remainingStep.push(value.step)
                }
            }
            this.remainingStep.push('financialStep')
            this.remainingStep.push('personalStep')
            this.remainingStep = this.remainingStep.reverse()
        },
        nextStep() {
            if (this.remainingStep.length !== 0) {
                this.stepState = this.remainingStep.pop()
            }
        },
        async postCreateTravaux() {
            const response = await axios.post(
                'http://localhost:8080/api/' +
                    this.$store.getters['reviFormState/getHousingId'] +
                    '/travaux/'
            )
            this.$store.commit(
                'reviFormState/setTravauxId',
                response.data.travauxId
            )
        }
    }
}
</script>
