<template>
    <v-container class="container-stepper">
        <p class="stepper-title">Mes informations</p>
        <HousingInformationForm @done-event="nextStep()" />
    </v-container>
</template>

<script>
import HousingInformationForm from '~/components/Information/HousingInformationForm'

export default {
    name: 'HousingPage',
    components: {
        HousingInformationForm
    },
    data: () => ({
        stepState: 'housing'
    }),
    methods: {
        nextStep() {
            const newUrl = this.$route.path.replace('/housing', '/travaux')
            this.$router.push(newUrl)
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
