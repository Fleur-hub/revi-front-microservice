<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
            v-model="adresse"
            :rules="rulesAdresse"
            label="Adresse de votre logement"
            placeholder="123 rue de la paix 75009 Paris"
            required
        ></v-text-field>
    </v-form>
</template>

<script>
export default {
    data: () => ({
        adresse: '',
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
