<template>
    <v-container class="text-left pa-0" :class="emitIsValid()">
        <v-container
            v-for="(type, i) in chauffageFioulValues"
            :key="i"
            class="field-container spaced-container"
        >
            <v-checkbox
                v-model="formData.type"
                :value="type"
                color="primaryPressed"
                class="field-title"
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
            >
                <template #label>
                    <label class="radio-label">{{ type }}</label>
                </template>
            </v-checkbox>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'ChauffageFioulForm',
    data: () => ({
        stepState: 1,
        formData: {
            type: '',
            quantity: 1
        },
        chauffageFioulType: '',
        chauffageFioulValues: [
            'Chaudière à condensation fioul',
            'Chaudière classique fioul'
        ]
    }),

    methods: {
        isValid() {
            return this.formData.type !== ''
        },
        emitIsValid() {
            this.$emit('isValid', this.isValid(), this.formData)
            return ''
        },
        computeStep(direction) {
            if (direction < 0) {
                if (this.stepState > 1) {
                    this.stepState -= 1
                }
            } else if (this.isValid()) {
                if (this.stepState === 1) {
                    this.submit()
                    this.$emit('done-event')
                } else {
                    this.stepState += 1
                }
            }
        },
        submit() {
            this.$store.commit('reviFormState/setChauffageData', this.formData)
        }
    }
}
</script>

<style lang="scss">
.v-messages {
    min-height: 0 !important;
}
</style>
