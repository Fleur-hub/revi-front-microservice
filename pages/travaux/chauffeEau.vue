<template>
    <ChauffeEauForm class="text-center" @done-event="goToNextStep()" />
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
