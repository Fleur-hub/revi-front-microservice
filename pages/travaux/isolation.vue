<template>
    <v-container>
        <p class="stepper-title">Quel(s) type(s) d'isolation ?</p>
        <IsolationForm @done-event="goToNextStep()" />
    </v-container>
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
