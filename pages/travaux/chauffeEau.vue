<template>
    <v-container>
        <p class="stepper-title">Quel type de chauffe-eau ?</p>
        <ChauffeEauForm class="text-center" @done-event="goToNextStep()" />
    </v-container>
</template>

<script>
import ChauffeEauForm from '~/components/ChauffeEau/ChauffeEauForm'

export default {
    name: 'ChauffeEauPage',
    components: { ChauffeEauForm },
    methods: {
        goToNextStep() {
            const nextUrl =
                this.$store.getters['reviFormState/computeNextStep'](
                    'chauffeEau'
                ).next
            this.$router.push(nextUrl)
        }
    }
}
</script>
