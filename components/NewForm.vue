<template>
    <validation-observer ref="observer">
        <form @submit.prevent="submit">
            <validation-provider name="adresse">
                <v-text-field
                    v-model="adresse"
                    :rules="rulesAdresse"
                    label="Adresse de votre logement"
                    placeholder="123 rue de la paix 75009 Paris"
                    required
                ></v-text-field>
            </validation-provider>
            <validation-provider name="type-logement">
                <v-radio-group v-model="logement">
                    <v-radio
                        v-for="(typeLogement, i) in typeLogement"
                        :key="i"
                        :label="typeLogement"
                        :value="typeLogement"
                    >
                    </v-radio>
                </v-radio-group>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="copropriete"
                rules="required"
            >
                <v-select
                    v-model="copropriete"
                    :items="items"
                    :error-messages="errors"
                    label="Etes-vous dans une copropriété ?"
                    data-vv-name="select"
                    required
                ></v-select>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="superficie"
                :rules="{
                    required: true,
                    digits: true
                }"
            >
                <v-text-field
                    v-model="superficie"
                    :error-messages="errors"
                    label="Quelle est la superficie du bien ?"
                    placeholder="Superficie m²"
                    required
                ></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="date">
                <v-select
                    v-model="date"
                    :items="construction"
                    :error-messages="errors"
                    label="Quand a été construit votre logement ?"
                    data-vv-name="select"
                ></v-select>
            </validation-provider>
            <validation-provider
                v-slot="{ errors }"
                name="budget"
                :rules="{
                    required: true,
                    digits: true
                }"
            >
                <v-text-field
                    v-model="budget"
                    :error-messages="errors"
                    label="Quel est votre budget pour ces travaux ?"
                    placeholder="Budget €"
                    required
                ></v-text-field>
            </validation-provider>
        </form>
    </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data: () => ({
        adresse: '',
        logement: '',
        superficie: '',
        date: '',
        copropriete: null,
        items: ['Oui', 'Non'],
        construction: [
            'Moins de 2 ans',
            'Entre 2 et 15 ans',
            'Plus de 15 ans',
            'Je ne sais pas'
        ],
        typeLogement: ['Maison', 'Appartement'],
        budget: '',
        rulesAdresse: [
            (value) =>
                !!value || 'Veuillez rentrer l\tadresse de votre logement'
        ]
    }),
    methods: {
        isValid() {
            return this.$refs.observer.valid()
        },
        submit() {
            this.$refs.observer.validate()
        },
        clear() {
            this.adresse = ''
            this.typeLogement = ''
            this.superficie = ''
            this.email = ''
            this.copropriete = null
            this.checkbox = null
            this.$refs.observer.reset()
        }
    }
}
</script>

<codepen-resources lang="json">
{
    "js": ["https://cdn.jsdelivr.net/npm/vee-validate@3.x/dist/vee-validate.js"]
}
</codepen-resources>
