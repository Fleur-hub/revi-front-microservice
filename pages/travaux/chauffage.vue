<template>
    <v-container class="container-stepper">
        <p class="stepper-title">Quel type de chauffage ?</p>
        <ChauffageForm @done-event="goToNextStep()" />
    </v-container>
</template>

<script>
import ChauffageForm from '~/components/Chauffage/ChauffageForm'

export default {
    name: 'ChauffagePage',
    components: { ChauffageForm },
    methods: {
        goToNextStep() {
            const nextUrl =
                this.$store.getters['reviFormState/computeNextStep'](
                    'chauffage'
                ).next
            this.$router.push(nextUrl)
        }
    }
}
</script>
