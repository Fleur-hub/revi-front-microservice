<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="adresseStep">
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
                    @click="stepState = 'typeLogementStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="typeLogementStep">
                <v-radio-group
                    v-model="typeLogement"
                    label="Quel est votre type de bien ?"
                >
                    <v-radio
                        v-for="(type, i) in typeLogements"
                        :key="i"
                        :label="type"
                        :value="type"
                        required
                    >
                    </v-radio>
                </v-radio-group>
                <v-btn color="secondary" @click="stepState = 'adresseStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isTypeLogementValid()"
                    color="success"
                    class="mr-4"
                    @click="stepState = 'coproprieteStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="coproprieteStep">
                <v-select
                    v-model="copropriete"
                    :rules="rulesCopropriete"
                    :items="coproprieteValues"
                    label="Êtes-vous dans une copropriété ?"
                    required
                ></v-select>
                <v-btn
                    color="secondary"
                    @click="stepState = 'typeLogementStep'"
                >
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isCoproprieteValid()"
                    color="success"
                    class="mr-4"
                    @click="stepState = 'superficieStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="superficieStep">
                <v-text-field
                    v-model="superficie"
                    type="number"
                    :rules="rulesSuperficie"
                    label="Quelle est la superficie du bien ?"
                    placeholder="Superficie m²"
                    required
                ></v-text-field>
                <v-btn color="secondary" @click="stepState = 'coproprieteStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isSuperficieValid()"
                    color="success"
                    class="mr-4"
                    @click="stepState = 'dateConstructionStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="dateConstructionStep">
                <v-select
                    v-model="dateConstruction"
                    :rules="rulesDateConstruction"
                    :items="dateConstructions"
                    label="Quand a été construit votre logement ?"
                ></v-select>
                <v-btn color="secondary" @click="stepState = 'superficieStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isDateConstructionValid()"
                    color="success"
                    class="mr-4"
                    @click="stepState = 'budgetStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="budgetStep">
                <v-text-field
                    v-model="budget"
                    type="numbers"
                    :rules="rulesBudget"
                    label="Quel est votre budget pour ces travaux ?"
                    placeholder="Budget en €"
                    required
                ></v-text-field>
                <v-btn
                    color="secondary"
                    @click="stepState = 'dateConstructionStep'"
                >
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isBudgetValid()"
                    color="success"
                    class="mr-4"
                    @click="stepState = 'typeTravauxStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="typeTravauxStep">
                <v-radio-group v-model="typeTravaux">
                    <v-radio
                        v-for="(type, i) in typeTravauxValues"
                        :key="i"
                        :label="type"
                        :value="type"
                        required
                    >
                    </v-radio>
                </v-radio-group>
                <v-btn color="secondary" @click="stepState = 'budgetStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isTypeTravauxValid()"
                    color="success"
                    class="mr-4"
                    @click="stepState = 8"
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
        stepState: 'adresseStep',
        adresse: '',
        rulesAdresse: [
            (v) => !!v || "Veuillez rentrer l'adresse de votre logement"
        ],

        typeLogement: '',
        typeLogements: ['Maison', 'Appartement'],

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
        dateConstructions: [
            'Moins de 2 ans',
            'Entre 2 et 15 ans',
            'Plus de 15 ans'
        ],
        rulesDateConstruction: [
            (v) => !!v || 'Veuillez sélectionner une réponse'
        ],

        budget: '',
        rulesBudget: [(v) => !!v || 'Veuillez ajouter un budget'],

        typeTravaux: '',
        typeTravauxValues: [
            'Isolation',
            'Chauffage',
            'Ventilation',
            'Chauffe-eau'
        ]
    }),

    methods: {
        isAdressValid() {
            return this.adresse !== ''
        },
        isTypeLogementValid() {
            return this.typeLogements.includes(this.typeLogement)
        },
        isCoproprieteValid() {
            return this.coproprieteValues.includes(this.copropriete)
        },
        isSuperficieValid() {
            return this.superficie !== ''
        },
        isDateConstructionValid() {
            return this.dateConstructions.includes(this.dateConstruction)
        },
        isBudgetValid() {
            return this.budget !== ''
        },
        isTypeTravauxValid() {
            return this.typeTravauxValues.includes(this.typeTravaux)
        }
    }
}
</script>
