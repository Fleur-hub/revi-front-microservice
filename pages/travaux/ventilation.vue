<template>
    <VentilationForm class="text-center" @done-event="goToNextStep()" />
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
