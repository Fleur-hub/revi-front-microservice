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
                <v-container>
                    <label class="field-title"
                        >Quel est votre type de bien ?</label
                    >
                    <v-item-group v-model="formData.typeLogement">
                        <v-row>
                            <v-col class="top-col">
                                <v-item
                                    v-slot="{ active, toggle }"
                                    value="MAISON"
                                >
                                    <v-card
                                        :elevation="10"
                                        height="200"
                                        width="200"
                                        :class="
                                            active
                                                ? 'img-selected'
                                                : 'img-not-selected'
                                        "
                                        @click="toggle"
                                    >
                                        <v-img
                                            :src="
                                                active
                                                    ? typeLogements[0]
                                                          .iconSelected
                                                    : typeLogements[0].icon
                                            "
                                            class="image-center"
                                        >
                                        </v-img>
                                        <v-card-text
                                            :class="
                                                active
                                                    ? 'text-selected'
                                                    : 'text-not-selected'
                                            "
                                        >
                                            {{ typeLogements[0].label }}
                                        </v-card-text>
                                    </v-card>
                                </v-item>
                            </v-col>
                            <v-col class="top-col">
                                <v-item
                                    v-slot="{ active, toggle }"
                                    value="APPARTEMENT"
                                >
                                    <v-card
                                        :elevation="10"
                                        height="200"
                                        width="200"
                                        :class="
                                            active
                                                ? 'img-selected'
                                                : 'img-not-selected'
                                        "
                                        @click="toggle"
                                    >
                                        <v-img
                                            :src="
                                                active
                                                    ? typeLogements[1]
                                                          .iconSelected
                                                    : typeLogements[1].icon
                                            "
                                            class="image-center"
                                        >
                                        </v-img>
                                        <v-card-text
                                            :class="
                                                active
                                                    ? 'text-selected'
                                                    : 'text-not-selected'
                                            "
                                        >
                                            {{ typeLogements[1].label }}
                                        </v-card-text>
                                    </v-card>
                                </v-item>
                            </v-col>
                        </v-row>
                    </v-item-group>
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
        stepState: 'typeLogementStep',
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
                value: 'MAISON',
                icon: 'button_img/Icone_type-de-bien_maison_NS.png',
                iconSelected: 'button_img/Icone_type-de-bien_maison_S.png'
            },
            {
                label: 'Appartement',
                value: 'APPARTEMENT',
                icon: 'button_img/Icone_type-de-bien_appartement_NS.png',
                iconSelected: 'button_img/Icone_type-de-bien_appartement_S.png'
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
            return (
                this.formData.typeLogement !== '' &&
                this.formData.typeLogement !== undefined
            )
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

<style lang="scss">
.img-selected {
    background-color: $primaryMain !important;
}

.img-not-selected {
    background-color: #fff !important;
}

.image-center {
    height: 100px;
    width: 100px;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.top-col {
    margin-left: 18px;
    margin-top: 18px;
}

.bottom-col {
    margin-left: 18px;
    margin-bottom: 18px;
}

.text-selected {
    color: $grayScale10 !important;
}

.text-not-selected {
    color: $grayScale90 !important;
}

.text-selected,
.text-not-selected {
    font-weight: bold !important;
    font-size: 16px !important;
    padding-top: 35% !important;
    display: flex;
    justify-content: center;
}
</style>
