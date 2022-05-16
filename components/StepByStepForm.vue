<template>
    <v-stepper v-model="e1">
        <v-stepper-items>
            <v-stepper-content step="1">
                <v-text-field
                    v-model="adresse"
                    :rules="rulesAdresse"
                    label="Adresse du logement"
                    placeholder="123 rue de la paix 75009 Paris"
                    required
                ></v-text-field>
                <v-btn
                    :disabled="!isAdressValid()"
                    color="success"
                    class="mr-4"
                    @click="
                        validate
                        e1 = 2
                    "
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-radio-group v-model="typeLogement">
                    <v-radio
                        v-for="(type, i) in typeLogements"
                        :key="i"
                        :rules="rulesTypeLogement"
                        :label="type"
                        :value="type"
                        required
                    >
                    </v-radio>
                </v-radio-group>
                <v-btn color="secondary" @click="e1 = 1"> Retour </v-btn>
                <v-btn
                    :disabled="!isTypeLogementValid()"
                    color="success"
                    class="mr-4"
                    @click="
                        validate
                        e1 = 3
                    "
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
                <v-select
                    v-model="copropriete"
                    :rules="rulesCopropriete"
                    :items="coproprieteValues"
                    label="Etes-vous dans une copropriété ?"
                    required
                ></v-select>
                <v-btn color="secondary" @click="e1 = 2"> Retour </v-btn>
                <v-btn
                    :disabled="!isCoproprieteValid()"
                    color="success"
                    class="mr-4"
                    @click="
                        validate
                        e1 = 4
                    "
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
                <v-text-field
                    v-model="superficie"
                    type="number"
                    :rules="rulesSuperficie"
                    label="Quelle est la superficie du bien ?"
                    placeholder="Superficie m²"
                    required
                ></v-text-field>
                <v-btn color="secondary" @click="e1 = 3"> Retour </v-btn>
                <v-btn
                    :disabled="!Superficievalid"
                    color="success"
                    class="mr-4"
                    @click="
                        validate
                        e1 = 5
                    "
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="5">
                <v-select
                    v-model="dateConstruction"
                    :rules="rulesDateConstruction"
                    :items="date"
                    label="Quand a été construit votre logement ?"
                ></v-select>
                <v-btn color="secondary" @click="e1 = 4"> Retour </v-btn>
                <v-btn
                    :disabled="!DateConstructionvalid"
                    color="success"
                    class="mr-4"
                    @click="
                        validate
                        e1 = 6
                    "
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="6">
                <v-text-field
                    v-model="budget"
                    type="number"
                    :rules="rulesBudget"
                    label="Quel est votre budget pour ces travaux ?"
                    placeholder="Budget €"
                    required
                ></v-text-field>
                <v-btn color="secondary" @click="e1 = 5"> Retour </v-btn>
                <v-btn
                    :disabled="!Superficievalid"
                    color="success"
                    class="mr-4"
                    @click="
                        validate
                        e1 = 7
                    "
                >
                    Valider
                </v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'StepByStepForm',
    data: () => ({
        e1: 1,
        Coproprietevalid: true,
        Superficievalid: true,
        DateConstructionvalid: true,
        Budgetvalid: true,
        adresse: '',
        rulesAdresse: [
            (v) => !!v || "Veuillez rentrer l'adresse de votre logement"
        ],

        typeLogement: '',
        typeLogements: ['Maison', 'Appartement'],
        rulesTypeLogement: [
            (v) => !!v || 'Veuillez sélectionner un type de logement'
        ],

        copropriete: '',
        coproprieteValues: ['Oui', 'Non'],
        rulesCopropriete: [
            (v) =>
                !!v ||
                "Certains travaux nécessitent l'accord de votre copropriété"
        ],

        superficie: '',
        rulesSuperficie: [
            (v) => !!v || 'Veuillez rentrer la superficie du bien en m²'
        ],

        dateConstruction: '',
        rulesDateConstruction: [
            (v) => !!v || 'Veuillez sélectionner une réponse'
        ],
        date: [
            'Moins de 2 ans',
            'Entre 2 et 15 ans',
            'Plus de 15 ans',
            "J'ignore cette information"
        ],

        budget: '',
        rulesBudget: [(v) => !!v || 'Veuillez sélectionner une réponse']
    }),
    methods: {
        validate() {
            this.$refs.formAdress.validate()
            this.$refs.formLogement.validate()
            this.$refs.formCopropriete.validate()
            this.$refs.formSuperficie.validate()
            this.$refs.formDateConstruction.validate()
            this.$refs.formBudget.validate()
        },
        isAdressValid() {
            return this.adresse !== ''
        },
        isTypeLogementValid() {
            return this.typeLogements.includes(this.typeLogement)
        },
        isCoproprieteValid() {
            return this.coproprieteValues.includes(this.copropriete)
        }
    }
}
</script>
