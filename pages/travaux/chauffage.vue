<template>
    <ChauffageForm @done-event="goToNextPage()" />
</template>

<script>
import ChauffageForm from '~/components/Chauffage/ChauffageForm'

export default {
    name: 'ChauffagePage',
    components: { ChauffageForm },
    methods: {
        goToNextPage() {
            this.$router.push()
        }
    }
}
</script>
