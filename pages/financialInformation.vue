<template>
    <FinancialInformationForm
        class="text-center"
        @done-event="goToNextStep()"
    />
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
