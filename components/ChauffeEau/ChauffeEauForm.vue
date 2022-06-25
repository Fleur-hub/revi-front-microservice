<template>
    <v-container class="text-left">
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="chauffeEauType"
                :value="chauffeEauTypes[0]"
                color="primaryPressed"
                class="field-title"
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
                required
                @click="
                    chauffeEauThermodynamiqueType = ''
                    chauffeEauSolaireType = ''
                "
            >
                <template #label>
                    <label class="radio-label">{{ chauffeEauTypes[0] }}</label>
                </template>
            </v-checkbox>
            <v-expand-transition>
                <v-container
                    v-if="chauffeEauType === chauffeEauTypes[0]"
                    class="field-container"
                >
                    <v-checkbox
                        v-for="(type, i) in chauffeEauThermodynamiqueTypes"
                        :key="i"
                        v-model="chauffeEauThermodynamiqueType"
                        :value="type"
                        color="primaryMain"
                        class="field-title"
                        off-icon="mdi-radiobox-blank"
                        on-icon="mdi-radiobox-marked"
                        required
                    >
                        <template #label>
                            <label class="sub-radio-label">{{ type }}</label>
                        </template>
                    </v-checkbox>
                </v-container>
            </v-expand-transition>
        </v-container>
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="chauffeEauType"
                :value="chauffeEauTypes[1]"
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
                color="primaryPressed"
                class="field-title"
                required
                @click="
                    chauffeEauThermodynamiqueType = ''
                    chauffeEauSolaireType = ''
                "
            >
                <template #label>
                    <label class="radio-label">{{ chauffeEauTypes[1] }}</label>
                </template>
            </v-checkbox>
            <v-expand-transition>
                <v-container
                    v-if="chauffeEauType === chauffeEauTypes[1]"
                    class="field-container"
                >
                    <v-checkbox
                        v-for="(type, i) in chauffeEauSolaireTypes"
                        :key="i"
                        v-model="chauffeEauSolaireType"
                        :value="type"
                        color="primaryMain"
                        class="field-title"
                        off-icon="mdi-radiobox-blank"
                        on-icon="mdi-radiobox-marked"
                        required
                    >
                        <template #label>
                            <label class="sub-radio-label">{{ type }}</label>
                        </template>
                    </v-checkbox>
                </v-container>
            </v-expand-transition>
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
                    :color="
                        isChauffeEauValid() ? 'primaryMain' : 'primaryBorder'
                    "
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
    name: 'ChauffeEauForm',
    data: () => ({
        stepState: 1,
        formData: {},
        chauffeEauType: '',
        chauffeEauTypes: [
            'Chauffe-eau thermodynamique',
            'Chauffe-eau solaire individuel'
        ],

        chauffeEauThermodynamiqueType: '',
        chauffeEauThermodynamiqueTypes: [
            'Monobloc',
            'Circulation forcée',
            'Thermosiphon',
            'Système PVT',
            'Capteurs solaires'
        ],

        chauffeEauSolaireType: '',
        chauffeEauSolaireTypes: [
            'Split',
            'Air ambiant',
            'Air extrait',
            'Air extérieur'
        ]
    }),

    methods: {
        isChauffeEauValid() {
            return (
                this.chauffeEauTypes.includes(this.chauffeEauType) &&
                (this.chauffeEauThermodynamiqueTypes.includes(
                    this.chauffeEauThermodynamiqueType
                ) ||
                    this.chauffeEauSolaireTypes.includes(
                        this.chauffeEauSolaireType
                    ))
            )
        },
        computeStep(direction) {
            if (direction < 0) {
                if (this.stepState > 1) {
                    this.stepState -= 1
                }
            } else if (this.isChauffeEauValid()) {
                if (this.stepState === 1) {
                    this.submit()
                    this.$emit('done-event')
                } else {
                    this.stepState += 1
                }
            }
        },
        submit() {
            this.formData.chauffeEauType = this.chauffeEauType
            this.formData.chauffeEauSubType =
                this.chauffeEauThermodynamiqueType + this.chauffeEauSolaireType
            this.$store.commit('reviFormState/setChauffeEauData', this.formData)
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
