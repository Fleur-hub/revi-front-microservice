<template>
    <v-container class="text-left pa-0" :class="emitIsValid()">
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="chauffageElectriqueType"
                :value="chauffageElectriqueValues[0]"
                color="primaryPressed"
                class="field-title"
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
                required
                @click="
                    formData.quantity = 0
                    formData.type = ''
                "
            >
                <template #label>
                    <label class="radio-label">{{
                        chauffageElectriqueValues[0]
                    }}</label>
                </template>
            </v-checkbox>
            <v-expand-transition>
                <v-container
                    v-if="
                        chauffageElectriqueType === chauffageElectriqueValues[0]
                    "
                >
                    <v-container class="field-container ma-0 pa-0">
                        <v-checkbox
                            v-model="formData.type"
                            :value="chauffageChaudiereElectriqueValues[0]"
                            color="primaryPressed"
                            class="field-title"
                            off-icon="mdi-radiobox-blank"
                            on-icon="mdi-radiobox-marked"
                            required
                            @click="formData.quantity = 0"
                        >
                            <template #label>
                                <label class="sub-radio-label">{{
                                    chauffageChaudiereElectriqueValues[0]
                                }}</label>
                            </template>
                        </v-checkbox>
                        <v-container class="pa-0">
                            <v-expand-transition>
                                <v-text-field
                                    v-if="
                                        chauffageChaudiereElectriqueValues[0] ===
                                        formData.type
                                    "
                                    v-model="formData.quantity"
                                    :rules="rulesChauffageElectriqueSurface"
                                    onkeydown="return event.keyCode !== 69"
                                    outlined
                                    required
                                    type="number"
                                ></v-text-field>
                            </v-expand-transition>
                        </v-container>
                    </v-container>
                    <v-container class="field-container ma-0 pa-0">
                        <v-checkbox
                            v-model="formData.type"
                            :value="chauffageChaudiereElectriqueValues[1]"
                            color="primaryPressed"
                            class="field-title"
                            off-icon="mdi-radiobox-blank"
                            on-icon="mdi-radiobox-marked"
                            required
                            @click="formData.quantity = 0"
                        >
                            <template #label>
                                <label class="sub-radio-label">{{
                                    chauffageChaudiereElectriqueValues[1]
                                }}</label>
                            </template>
                        </v-checkbox>
                    </v-container>
                    <v-container class="field-container ma-0 pa-0">
                        <v-checkbox
                            v-model="formData.type"
                            :value="chauffageChaudiereElectriqueValues[2]"
                            color="primaryPressed"
                            class="field-title"
                            off-icon="mdi-radiobox-blank"
                            on-icon="mdi-radiobox-marked"
                            required
                            @click="formData.quantity = 0"
                        >
                            <template #label>
                                <label class="sub-radio-label">{{
                                    chauffageChaudiereElectriqueValues[2]
                                }}</label>
                            </template>
                        </v-checkbox>
                    </v-container>
                    <v-container class="field-container ma-0 pa-0">
                        <v-checkbox
                            v-model="formData.type"
                            :value="chauffageChaudiereElectriqueValues[3]"
                            color="primaryPressed"
                            class="field-title"
                            off-icon="mdi-radiobox-blank"
                            on-icon="mdi-radiobox-marked"
                            required
                            @click="formData.quantity = 0"
                        >
                            <template #label>
                                <label class="sub-radio-label">{{
                                    chauffageChaudiereElectriqueValues[3]
                                }}</label>
                            </template>
                        </v-checkbox>
                    </v-container>
                </v-container>
            </v-expand-transition>
        </v-container>
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="chauffageElectriqueType"
                :value="chauffageElectriqueValues[1]"
                color="primaryPressed"
                class="field-title"
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
                required
                @click="
                    formData.quantity = 0
                    formData.type = chauffageElectriqueValues[1]
                "
            >
                <template #label>
                    <label class="radio-label">{{
                        chauffageElectriqueValues[1]
                    }}</label>
                </template>
            </v-checkbox>
            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="
                            chauffageElectriqueType ===
                            chauffageElectriqueValues[1]
                        "
                        v-model="formData.quantity"
                        :rules="rulesChauffageElectriqueSurface"
                        onkeydown="return event.keyCode !== 69"
                        outlined
                        required
                        type="number"
                    ></v-text-field>
                </v-expand-transition>
            </v-container>
        </v-container>
        <v-container class="pa-0">
            <v-container class="field-container">
                <v-checkbox
                    v-model="chauffageElectriqueType"
                    :value="chauffageElectriqueValues[2]"
                    color="primaryPressed"
                    class="field-title"
                    off-icon="mdi-radiobox-blank"
                    on-icon="mdi-radiobox-marked"
                    required
                    @click="
                        formData.quantity = 0
                        formData.type = chauffageElectriqueValues[2]
                    "
                >
                    <template #label>
                        <label class="radio-label">{{
                            chauffageElectriqueValues[2]
                        }}</label>
                    </template>
                </v-checkbox>
                <v-container>
                    <v-expand-transition>
                        <v-text-field
                            v-if="
                                chauffageElectriqueType ===
                                chauffageElectriqueValues[2]
                            "
                            v-model="formData.quantity"
                            :rules="rulesChauffageElectriqueSurface"
                            onkeydown="return event.keyCode !== 69"
                            outlined
                            required
                            type="number"
                        ></v-text-field>
                    </v-expand-transition>
                </v-container>
            </v-container>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'ChauffageElectriqueForm',
    props: {
        eventKey: {
            type: String,
            default() {
                return 'hello'
            },
            required: true
        }
    },
    data: () => ({
        stepState: 1,
        formData: {
            type: '',
            quantity: 0
        },
        chauffageElectriqueType: '',
        chauffageElectriqueValues: [
            'Chaudière électrique',
            'Plafonds ou planchers chauffants',
            'Radiateurs électriques'
        ],

        chauffageChaudiereElectriqueType: '',
        chauffageChaudiereElectriqueValues: [
            'Murale',
            'Au sol',
            'Ionique',
            'A basse température'
        ],

        requireSurface: [
            'Plafonds ou planchers chauffants',
            'Radiateurs électriques',
            'Murale'
        ],
        chauffageElectriqueSurface: 0,

        rulesChauffageElectriqueSurface: [
            (v) => !!v || 'Veuillez ajouter une surface'
        ]
    }),

    methods: {
        isValid() {
            if (this.formData.type === '') {
                return false
            }
            return this.requireSurface.includes(this.formData.type)
                ? this.formData.quantity > 0
                : true
        },
        emitIsValid() {
            this.$emit('isValid', this.isValid(), this.formData, this.eventKey)
            return ''
        },
        submit() {
            this.$store.commit('reviFormState/setChauffageData', this.formData)
        }
    }
}
</script>

<style lang="scss">
.text-field-container-height {
    height: 36px !important;
}
</style>
