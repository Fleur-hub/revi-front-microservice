<template>
    <v-container>
        <p class="stepper-title">Quel type de ventilation ?</p>
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
