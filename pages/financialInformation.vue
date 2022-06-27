<template>
    <v-container>
        <p class="stepper-title">Mes aides</p>
        <FinancialInformationForm
            class="text-center"
            @done-event="goToNextStep()"
        />
    </v-container>
</template>

<script>
import FinancialInformationForm from '~/components/Information/FinancialInformationForm'

export default {
    name: 'FinancialInfoPage',
    components: { FinancialInformationForm },
    methods: {
        goToNextStep() {
            const nextUrl =
                this.$store.getters['reviFormState/computeNextStep'](
                    'financial'
                ).next
            this.$router.push(nextUrl)
        }
    }
}
</script>
