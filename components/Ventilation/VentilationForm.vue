<template>
    <v-container class="text-left">
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="formData.ventilationType"
                :value="ventilationTypes[0]"
                color="primaryPressed"
                class="field-title"
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
                required
                @click="
                    formData.ventilationSimpleNumber = ''
                    formData.ventilationDoubleNumber = ''
                "
            >
                <template #label>
                    <label class="radio-label">{{ ventilationTypes[0] }}</label>
                </template>
            </v-checkbox>

            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="formData.ventilationType === ventilationTypes[0]"
                        v-model="formData.ventilationSimpleNumber"
                        :rules="rulesVentilationNumber"
                        label="Nombre de VMC"
                        onkeydown="return event.keyCode !== 69"
                        color="grayScale70"
                        outlined
                        required
                        type="number"
                    ></v-text-field>
                </v-expand-transition>
            </v-container>
        </v-container>
        <v-container class="field-container">
            <v-checkbox
                v-model="formData.ventilationType"
                :value="ventilationTypes[1]"
                class="field-title"
                required
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
                color="primaryPressed"
                @click="
                    formData.ventilationSimpleNumber = ''
                    formData.ventilationDoubleNumber = ''
                "
            >
                <template #label>
                    <label class="radio-label">{{ ventilationTypes[1] }}</label>
                </template>
            </v-checkbox>
            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="formData.ventilationType === ventilationTypes[1]"
                        v-model="formData.ventilationDoubleNumber"
                        :rules="rulesVentilationNumber"
                        label="Nombre de VMC"
                        onkeydown="return event.keyCode !== 69"
                        outlined
                        required
                        type="number"
                    ></v-text-field>
                </v-expand-transition>
            </v-container>
        </v-container>
        <v-card-actions style="padding-right: 0">
            <v-container class="buttons-container">
                <v-btn
                    :color="stepState === 1 ? 'grayScale60' : 'secondary'"
                    @click="computeStep(-1)"
                >
                    Retour
                </v-btn>
                <v-btn
                    style="margin-right: 0 !important"
                    :color="isValid() ? 'primaryMain' : 'primaryBorder'"
                    @click="computeStep(1)"
                >
                    Valider
                </v-btn>
            </v-container>
        </v-card-actions>
    </v-container>
</template>

<script>
export default {
    name: 'VentilationForm',
    data: () => ({
        stepState: 1,
        formData: {
            ventilationType: '',
            ventilationSimpleNumber: 0,
            ventilationDoubleNumber: 0
        },

        ventilationTypes: ['VMC simple-flux', 'VMC double-flux'],

        rulesVentilationNumber: [
            (v) => !!v || 'Veuillez ajouter un nombre de ventilation'
        ]
    }),

    methods: {
        isVentilationValid() {
            return (
                this.ventilationTypes.includes(this.formData.ventilationType) &&
                (/^\d+$/.test(this.formData.ventilationSimpleNumber) ||
                    /^\d+$/.test(this.formData.ventilationDoubleNumber))
            )
        },
        isValid() {
            switch (this.stepState) {
                case 1:
                    return this.isVentilationValid()
            }
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
            this.$store.commit(
                'reviFormState/setVentilationData',
                this.formData
            )
        }
    }
}
</script>
<style lang="scss">
.radio-label {
    color: $primaryPressed !important;
}
.spaced-container {
    margin-bottom: 24px !important;
}

.mdi-radiobox-blank {
    color: $grayScale70 !important;
}
</style>
