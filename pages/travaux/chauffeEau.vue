<template>
    <v-container class="container-stepper">
        <p class="stepper-title">Votre type de chauffe-eau ?</p>
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

<style lang="scss">
.form-no-left-padding {
    padding-left: 0 !important;
}

.container-stepper {
    top: 0;
    transform: translateY(0);
    margin: auto;
}

.v-main__wrap {
    top: 10%;
}
</style>
