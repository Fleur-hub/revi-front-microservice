<template>
    <v-container class="container-stepper">
        <p class="stepper-title">Votre type de ventilation ?</p>
        <VentilationForm
            class="text-center form-no-left-padding"
            @done-event="goToNextStep()"
        />
    </v-container>
</template>

<script>
import VentilationForm from '~/components/Ventilation/VentilationForm'

export default {
    name: 'VentilationPage',
    components: { VentilationForm },
    methods: {
        goToNextStep() {
            const nextUrl =
                this.$store.getters['reviFormState/computeNextStep'](
                    'ventilation'
                ).next
            this.$router.push(nextUrl)
        }
    }
}
</script>

<style lang="scss">
.form-no-left-padding {
    padding-left: 0 !important;
}
</style>
