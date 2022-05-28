<template>
    <HousingInformationForm class="text-center" />
</template>

<script>
import HousingInformationForm from '~/components/Information/HousingInformationForm'

export default {
    name: 'ReviForm',
    components: { HousingInformationForm },
    data: () => ({
        stepState: '',
        travauxChoisi: {}
    })
}
</script>
