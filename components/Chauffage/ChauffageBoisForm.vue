<template>
    <v-container class="text-left pa-0" :class="emitIsValid()">
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="chauffageBoisType"
                :value="chauffageBoisValues[0]"
                color="primaryPressed"
                class="field-title"
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
                required
                @click="
                    formData.quantity = 1
                    formData.type = ''
                "
            >
                <template #label>
                    <label class="radio-label">{{
                        chauffageBoisValues[0]
                    }}</label>
                </template>
            </v-checkbox>
            <v-expand-transition>
                <v-container
                    v-if="chauffageBoisType === chauffageBoisValues[0]"
                    class="radio-container ma-0"
                >
                    <v-checkbox
                        v-for="(type, i) in chauffageChaudiereBoisValues"
                        :key="i"
                        v-model="formData.type"
                        color="primaryPressed"
                        class="field-title ma-0"
                        off-icon="mdi-radiobox-blank"
                        on-icon="mdi-radiobox-marked"
                        :value="type"
                        required
                        @click="formData.quantity = 1"
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
                v-model="chauffageBoisType"
                :value="chauffageBoisValues[1]"
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
                        chauffageBoisValues[1]
                    }}</label>
                </template>
            </v-checkbox>
            <v-expand-transition>
                <v-container
                    v-if="chauffageBoisType === chauffageBoisValues[1]"
                    class="ma-0"
                >
                    <div
                        v-for="(type, i) in chauffageInsertBoisValues"
                        :key="i"
                        class="radio-container"
                    >
                        <v-checkbox
                            v-model="formData.type"
                            color="primaryPressed"
                            class="field-title"
                            off-icon="mdi-radiobox-blank"
                            on-icon="mdi-radiobox-marked"
                            :value="type"
                            required
                            @click="formData.quantity = 0"
                        >
                            <template #label>
                                <label class="sub-radio-label">{{
                                    type
                                }}</label>
                            </template>
                        </v-checkbox>
                        <v-expand-transition>
                            <v-container v-if="formData.type === type">
                                <v-text-field
                                    v-model="formData.quantity"
                                    :rules="ruleschauffageBoisNbCheminees"
                                    onkeydown="return event.keyCode !== 69"
                                    outlined
                                    required
                                    type="number"
                                ></v-text-field>
                            </v-container>
                        </v-expand-transition>
                    </div>
                </v-container>
            </v-expand-transition>
        </v-container>
        <v-container class="field-container spaced-container">
            <v-checkbox
                v-model="chauffageBoisType"
                :value="chauffageBoisValues[2]"
                color="primaryPressed"
                class="field-title"
                off-icon="mdi-radiobox-blank"
                on-icon="mdi-radiobox-marked"
                required
                @click="
                    formData.quantity = 1
                    formData.type = ''
                "
            >
                <template #label>
                    <label class="radio-label">{{
                        chauffageBoisValues[2]
                    }}</label>
                </template>
            </v-checkbox>
            <v-expand-transition>
                <v-container
                    v-if="chauffageBoisType === chauffageBoisValues[2]"
                    class="radio-container"
                >
                    <v-checkbox
                        v-for="(type, i) in chauffagePoeleBoisValues"
                        :key="i"
                        v-model="formData.type"
                        :value="type"
                        color="primaryMain"
                        class="field-title"
                        off-icon="mdi-radiobox-blank"
                        on-icon="mdi-radiobox-marked"
                        required
                        @click="formData.quantity = 1"
                    >
                        <template #label>
                            <label class="sub-radio-label">{{ type }}</label>
                        </template>
                    </v-checkbox>
                </v-container>
            </v-expand-transition>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'ChauffageBoisForm',
    props: {
        eventKey: {
            type: String,
            required: true,
            default() {
                return 'hello'
            }
        }
    },
    data: () => ({
        stepState: 1,
        formData: {
            type: '',
            quantity: 0
        },
        chauffageBoisType: '',
        chauffageBoisValues: [
            'Chaudière à bois',
            'Insert cheminée',
            'Poele à bois'
        ],

        chauffageChaudiereBoisType: '',
        chauffageChaudiereBoisValues: [
            'Modèle à bûches',
            'Modèle à granulés',
            'Modèle à plaquettes de bois',
            'Modèle mixte'
        ],

        chauffageInsertBoisType: '',
        chauffageInsertBoisValues: [
            'Foyer fermé',
            'Insert à bûches',
            'Insert à granulés'
        ],

        chauffagePoeleBoisType: '',
        chauffagePoeleBoisValues: [
            'Poêle à bois suspendu',
            "Poêle à bois d'angle",
            'Poêle à bois à double combustion',
            'Poêle à bois encastrable'
        ],

        chauffageBoisNbCheminees: 0,

        ruleschauffageBoisNbCheminees: [
            (v) => !!v || 'Veuillez ajouter un nombre de cheminées'
        ]
    }),

    methods: {
        isValid() {
            return (
                this.formData.type !== '' &&
                !this.chauffageBoisValues.includes(this.formData.type) &&
                this.formData.quantity > 0
            )
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
