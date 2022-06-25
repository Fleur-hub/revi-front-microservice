<template>
    <v-container class="container-stepper">
        <p class="stepper-title">Mes informations personnelles</p>
        <PersonalInformationForm
            class="text-center"
            @done-event="goToNextStep()"
        />
    </v-container>
</template>

<script>
import PersonalInformationForm from '~/components/Information/PersonalInformationForm'

export default {
    name: 'PersonalInformationPage',
    components: { PersonalInformationForm },
    methods: {
        goToNextStep() {
            const nextUrl =
                this.$store.getters['reviFormState/computeNextStep'](
                    'personal'
                ).next
            this.$router.push(nextUrl)
        }
    }
}
</script>
