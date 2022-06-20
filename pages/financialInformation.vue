<template>
    <v-container class="container-stepper">
        <p class="stepper-title">Mes aides 💰</p>
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

<style lang="scss">
.container {
    margin: auto;
}

.container-stepper {
    top: 50%;
    transform: translateY(50%);
    margin: auto;
}

.stepper-title {
    color: $grayScale90;
    font-weight: bold;
    font-size: 46px;
}
</style>
