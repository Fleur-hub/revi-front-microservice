<template>
    <v-stepper v-model="stepState" elevation="0">
        <v-stepper-items>
            <v-stepper-content step="housing">
                <HousingInformationForm @done-event="nextStep()" />
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
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

<style scoped></style>
