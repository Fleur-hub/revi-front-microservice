<template>
    <ChauffageForm @done-event="goToNextStep()" />
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
