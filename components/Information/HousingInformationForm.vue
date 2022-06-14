<template>
    <v-stepper v-model="stepState" elevation="0">
        <v-stepper-items>
            <v-stepper-content step="adresseStep" class="text-right">
                <v-container class="field-container text-left">
                    <label class="field-title">Adresse du logement</label>
                    <v-text-field
                        v-model="formData.adresse"
                        :rules="rulesAdresse"
                        outlined
                        placeholder="123 rue de la paix 75009 Paris"
                        required
                    ></v-text-field>
                </v-container>
                <v-btn
                    :disabled="!isAdressValid()"
                    class="mr-4"
                    style="margin-right: 0 !important"
                    color="primaryMain"
                    @click="stepState = 'typeLogementStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>
            <v-stepper-content step="typeLogementStep">
                <v-container class="field-container">
                    <label class="field-title"
                        >Quel est votre type de bien ?</label
                    >
                    <v-radio-group v-model="formData.typeLogement">
                        <v-radio
                            v-for="(type, i) in typeLogements"
                            :key="i"
                            :label="type.label"
                            :value="type.value"
                            required
                        >
                        </v-radio>
                    </v-radio-group>
                </v-container>
                <v-container class="buttons-container">
                    <v-btn color="secondary" @click="stepState = 'adresseStep'">
                        Retour
                    </v-btn>
                    <v-btn
                        :disabled="!isTypeLogementValid()"
                        class="mr-4"
                        style="margin-right: 0 !important"
                        color="primaryMain"
                        @click="stepState = 'coproprieteStep'"
                    >
                        Valider
                    </v-btn>
                </v-container>
            </v-stepper-content>

            <v-stepper-content step="coproprieteStep">
                <v-container class="field-container">
                    <label class="field-title"
                        >Êtes-vous dans une copropriété ?</label
                    >
                    <v-select
                        v-model="formData.copropriete"
                        :items="coproprieteValues"
                        :rules="rulesCopropriete"
                        required
                    ></v-select>
                </v-container>
                <v-container class="buttons-container">
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
                </v-container>
            </v-stepper-content>

            <v-stepper-content step="superficieStep">
                <v-container class="field-container">
                    <label class="field-title"
                        >Quelle est la superficie du bien ?</label
                    >
                    <v-text-field
                        v-model="formData.superficie"
                        :rules="rulesSuperficie"
                        outlined
                        placeholder="Superficie m²"
                        required
                        type="number"
                    ></v-text-field>
                </v-container>
                <v-container class="buttons-container">
                    <v-btn
                        color="secondary"
                        @click="stepState = 'coproprieteStep'"
                    >
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
                </v-container>
            </v-stepper-content>

            <v-stepper-content step="consomationElectriqueStep">
                <v-container class="field-container">
                    <label class="field-title"
                        >Quelle est votre consomation electrique annuel ?</label
                    >
                    <v-text-field
                        v-model="formData.consomationElectrique"
                        :rules="rulesConsomationElectrique"
                        outlined
                        placeholder="Consomation Electrique kWh"
                        required
                        type="number"
                    ></v-text-field>
                </v-container>
                <v-container class="buttons-container">
                    <v-btn
                        color="secondary"
                        @click="stepState = 'superficieStep'"
                    >
                        Retour
                    </v-btn>
                    <v-btn
                        :disabled="formData.consomationElectrique <= 0"
                        class="mr-4"
                        color="primaryMain"
                        @click="stepState = 'dateConstructionStep'"
                    >
                        Valider
                    </v-btn>
                </v-container>
            </v-stepper-content>

            <v-stepper-content step="dateConstructionStep">
                <v-container class="field-container">
                    <label class="field-title"
                        >Quand a été construit votre logement ?</label
                    >
                    <v-select
                        v-model="formData.dateConstruction"
                        :items="dateConstructions"
                        :rules="rulesDateConstruction"
                    ></v-select>
                </v-container>
                <v-container class="buttons-container">
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
                </v-container>
            </v-stepper-content>

            <v-stepper-content step="budgetStep">
                <v-container class="field-container">
                    <label class="field-title"
                        >Quel est votre budget pour ces travaux ?</label
                    >
                    <v-text-field
                        v-model="formData.budget"
                        :rules="rulesBudget"
                        outlined
                        placeholder="Budget en €"
                        required
                        type="number"
                    ></v-text-field>
                </v-container>
                <v-container class="buttons-container">
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
                        @click="
                            submit()
                            $emit('done-event')
                        "
                    >
                        Valider
                    </v-btn>
                </v-container>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'HousingInformationForm',
    data: () => ({
        stepState: 'adresseStep',
        formData: {
            adresse: '',
            typeLogement: '',
            copropriete: '',
            superficie: '',
            consomationElectrique: 0,
            dateConstruction: '',
            budget: ''
        },

        rulesAdresse: [
            (v) => !!v || "Veuillez rentrer l'adresse de votre logement"
        ],

        typeLogements: [
            {
                label: 'Maison',
                value: 'MAISON'
            },
            {
                label: 'Appartement',
                value: 'APPARTEMENT'
            }
        ],

        coproprieteValues: [
            {
                text: 'Oui',
                value: true,
                disabled: false
            },
            {
                text: 'Non',
                value: false,
                disabled: false
            }
        ],
        rulesCopropriete: [
            (v) =>
                v !== '' ||
                "Certains travaux nécessitent l'accord de votre copropriété"
        ],

        rulesSuperficie: [
            (v) => !!v || 'Veuillez rentrer la superficie du bien en m²'
        ],

        rulesConsomationElectrique: [
            (v) =>
                !!v ||
                'Veuillez rentrer la consomation electrique annuel du bien en kWh'
        ],

        dateConstructions: [
            {
                text: 'Moins de 2 ans',
                value: 'MOINS_2_ANS',
                disabled: false
            },
            {
                text: 'Entre 2 et 15 ans',
                value: 'ENTRE_2_ET_15',
                disabled: false
            },
            {
                text: 'Plus de 15 ans',
                value: 'PLUS_15_ANS',
                disabled: false
            }
        ],
        rulesDateConstruction: [
            (v) => !!v || 'Veuillez sélectionner une réponse'
        ],

        rulesBudget: [(v) => !!v || 'Veuillez ajouter un budget']
    }),

    methods: {
        isAdressValid() {
            return this.formData.adresse !== ''
        },
        isTypeLogementValid() {
            return this.formData.typeLogement !== ''
        },
        isCoproprieteValid() {
            return this.formData.copropriete !== ''
        },
        isSuperficieValid() {
            return /^\d+$/.test(this.formData.superficie)
        },
        isDateConstructionValid() {
            return this.formData.dateConstruction !== ''
        },
        isBudgetValid() {
            return /^\d+$/.test(this.formData.budget)
        },
        submit() {
            this.$store.commit('reviFormState/setHousingData', this.formData)
            /* const response = await axios.post(
                'http://localhost:8080/api/housing/',
                this.formData
            )
            this.$store.commit('reviFormState/setHousingId', response.data.id)
            */
        }
    }
}
</script>
