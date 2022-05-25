<template>
    <v-row>
        <v-col class="text-center">
            <h1>Mes informations</h1>
            <HousingInformationForm
                v-if="step === 'HousingInformationForm'"
                ref="HousingInformation"
                @set-travaux-type="setSelectedTravauxType"
            />
            <ChauffeEauForm
                v-if="step === 'Chauffe-eau'"
                ref="ChauffeEauInformation"
                @next-step="nextStep"
            />
            <VentilationForm
                v-if="step === 'Ventilation'"
                ref="VentilationInformation"
                @next-step="nextStep"
            />
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'FormWithStep',
    data: () => ({
        selectedTravauxType: [],
        formStep: [
            'HousingInformationForm',
            'ChauffeEauForm',
            'VentilationForm'
        ],
        remainingStep: [],
        step: 'HousingInformationForm'
    }),
    methods: {
        setSelectedTravauxType(travauxType) {
            this.setSelectedTravauxType = travauxType.reverse()
            this.nextStep()
        },
        nextStep() {
            if (this.remainingStep.length === 0) {
                this.step = 'completed'
            }
            this.step = this.remainingStep.pop()
        }
    }
}
</script>
<style>
h1 {
    color: black;
}
</style>
