<template>
    <IsolationForm @done-event="goToNextStep()" />
</template>

<script>
import IsolationForm from '~/components/Isolation/IsolationForm'

export default {
    name: 'IsolationPage',
    components: { IsolationForm },
    methods: {
        goToNextStep() {
            const nextUrl =
                this.$store.getters['reviFormState/computeNextStep'](
                    'isolation'
                ).next
            this.$router.push(nextUrl)
        }
    }
}
</script>
