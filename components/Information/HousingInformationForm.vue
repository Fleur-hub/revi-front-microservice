<template>
    <v-stepper v-model="stepState" elevation="0">
        <v-stepper-items>
            <v-stepper-content step="adresseStep">
                <v-container class="field-container">
                    <v-text-field
                        v-model="adresse"
                        :rules="rulesAdresse"
                        label="Adresse du logement"
                        outlined
                        placeholder="123 rue de la paix 75009 Paris"
                        required
                    ></v-text-field>
                </v-container>
                <v-btn
                    :disabled="!isAdressValid()"
                    class="mr-4"
                    color="primaryMain"
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
                    class="mr-4"
                    color="primaryMain"
                    @click="stepState = 'coproprieteStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="coproprieteStep">
                <v-select
                    v-model="copropriete"
                    :items="coproprieteValues"
                    :rules="rulesCopropriete"
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
                    class="mr-4"
                    color="primaryMain"
                    @click="stepState = 'superficieStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="superficieStep">
                <v-text-field
                    v-model="superficie"
                    :rules="rulesSuperficie"
                    label="Quelle est la superficie du bien ?"
                    outlined
                    placeholder="Superficie m²"
                    required
                    type="number"
                ></v-text-field>
                <v-btn color="secondary" @click="stepState = 'coproprieteStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isSuperficieValid()"
                    class="mr-4"
                    color="primaryMain"
                    @click="stepState = 'consomationElectriqueStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="consomationElectriqueStep">
                <v-text-field
                    v-model="consomationElectrique"
                    :rules="rulesConsomationElectrique"
                    label="Quelle est votre consomation electrique annuel ?"
                    outlined
                    placeholder="Consomation Electrique kWh"
                    required
                    type="number"
                ></v-text-field>
                <v-btn color="secondary" @click="stepState = 'superficieStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="consomationElectrique <= 0"
                    class="mr-4"
                    color="primaryMain"
                    @click="stepState = 'dateConstructionStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="dateConstructionStep">
                <v-select
                    v-model="dateConstruction"
                    :items="dateConstructions"
                    :rules="rulesDateConstruction"
                    label="Quand a été construit votre logement ?"
                ></v-select>
                <v-btn
                    color="secondary"
                    @click="stepState = 'consomationElectriqueStep'"
                >
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isDateConstructionValid()"
                    class="mr-4"
                    color="primaryMain"
                    @click="stepState = 'budgetStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="budgetStep">
                <v-text-field
                    v-model="budget"
                    :rules="rulesBudget"
                    label="Quel est votre budget pour ces travaux ?"
                    outlined
                    placeholder="Budget en €"
                    required
                    type="number"
                ></v-text-field>
                <v-btn
                    color="secondary"
                    @click="stepState = 'dateConstructionStep'"
                >
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isBudgetValid()"
                    class="mr-4"
                    color="primaryMain"
                    @click="stepState = 'typeTravauxStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="typeTravauxStep">
                <v-container>
                    <v-checkbox
                        v-model="travauxChauffage"
                        :label="typeTravauxValues.chauffage"
                        :value="true"
                    />
                    <v-checkbox
                        v-model="travauxIsolation"
                        :label="typeTravauxValues.isolation"
                        :value="true"
                    />
                    <v-checkbox
                        v-model="travauxChauffeEau"
                        :label="typeTravauxValues.chauffeEau"
                        :value="true"
                    />
                    <v-checkbox
                        v-model="travauxVentilation"
                        :label="typeTravauxValues.ventilation"
                        :value="true"
                    />
                </v-container>
                <v-btn color="secondary" @click="stepState = 'budgetStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isTypeTravauxValid()"
                    class="mr-4"
                    color="primaryMain"
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
    name: 'HousingInformationForm',
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

        consomationElectrique: 0,
        rulesConsomationElectrique: [
            (v) =>
                !!v ||
                'Veuillez rentrer la consomation electrique annuel du bien en kWh'
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

        typeTravauxValues: {
            isolation: 'Isolation',
            chauffage: 'Chauffage',
            ventilation: 'Ventilation',
            chauffeEau: 'Chauffe-eau'
        },
        travauxIsolation: false,
        travauxChauffage: false,
        travauxVentilation: false,
        travauxChauffeEau: false
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
            return /^\d+$/.test(this.superficie)
        },
        isDateConstructionValid() {
            return this.dateConstructions.includes(this.dateConstruction)
        },
        isBudgetValid() {
            return /^\d+$/.test(this.budget)
        },
        isTypeTravauxValid() {
            return (
                this.travauxVentilation ||
                this.travauxChauffage ||
                this.travauxIsolation ||
                this.travauxChauffeEau
            )
        }
    }
}
</script>

<style lang="scss">
.v-input__slot {
    background-color: $grayScale10 !important;
}

.v-input--radio-group__input {
    background-color: $primaryCard !important;
}

.v-select__selections > * {
    color: $grayScale50;
}
</style>
