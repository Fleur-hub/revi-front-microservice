<template>
    <v-container class="text-left pa-0" :class="emitIsValid()">
        <v-container
            v-for="(type, i) in chauffagePompeChaleurValues"
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
                @click="formData.quantity = 0"
            >
                <template #label>
                    <label class="radio-label">{{ type }}</label>
                </template>
            </v-checkbox>
            <v-container>
                <v-expand-transition>
                    <v-text-field
                        v-if="formData.type === type"
                        v-model="formData.quantity"
                        :rules="rulesChauffagePompeChaleurSurface"
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
    name: 'ChauffagePompeChaleurForm',
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
        chauffagePompeChaleurType: '',
        chauffagePompeChaleurValues: [
            'Pompe à chaleur Sol/Eau',
            'Pompe à chaleur Sol/Air',
            'Pompe à chaleur Air/Air',
            'Pompe à chaleur Air/Eau',
            'Pompe à chaleur Eau/Eau'
        ],

        chauffagePompeChaleurSurface: 0,

        rulesChauffagePompeChaleurSurface: [
            (v) => !!v || 'Veuillez ajouter une surface'
        ]
    }),

    methods: {
        isValid() {
            return this.formData.type !== '' && this.formData.quantity > 0
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
