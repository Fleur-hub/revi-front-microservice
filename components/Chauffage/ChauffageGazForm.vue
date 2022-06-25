<template>
    <v-container class="text-left pa-0" :class="emitIsValid()">
        <v-container
            v-for="(type, i) in chauffageGazValues"
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
            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="
                            formData.type === chauffageGazValues[2] &&
                            type === chauffageGazValues[2]
                        "
                        v-model="formData.quantity"
                        :rules="rulesChauffageGazNbRadiateurs"
                        onkeydown="return event.keyCode !== 69"
                        outlined
                        required
                        type="number"
                    ></v-text-field>
                </v-expand-transition>
            </v-container>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'ChauffageGazForm',
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
        chauffageGazType: '',
        chauffageGazValues: [
            'Chaudière à condensation gaz',
            'Chaudière classique gaz',
            'Radiateur au gaz',
            'Poêle au gaz'
        ],

        chauffageGazNbRadiateurs: 0,

        rulesChauffageGazNbRadiateurs: [
            (v) => !!v || 'Veuillez ajouter un nombre de radiateurs'
        ]
    }),

    methods: {
        isValid() {
            if (this.formData.type === '') {
                return false
            } else if (
                this.formData.type === this.chauffageGazValues[2] &&
                this.formData.quantity <= 0
            ) {
                return false
            }
            return true
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
