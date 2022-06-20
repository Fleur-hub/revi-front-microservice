<template>
    <v-card class="mx-auto" elevation="0">
        <v-window v-model="stepState">
            <v-window-item :value="1" class="text-right">
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
            </v-window-item>
            <v-window-item :value="2">
                <label class="field-title">Quel est votre type de bien ?</label>
                <v-container
                    style="
                        justify-content: center;
                        display: flex;
                        margin-bottom: 12px;
                    "
                >
                    <v-item-group v-model="formData.typeLogement">
                        <v-row>
                            <v-item
                                v-slot="{ active, toggle }"
                                value="MAISON"
                                class="image-button-item"
                            >
                                <v-card
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
                                                ? typeLogements[0].iconSelected
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
                            <v-item
                                v-slot="{ active, toggle }"
                                value="APPARTEMENT"
                                class="image-button-item"
                            >
                                <v-card
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
                                                ? typeLogements[1].iconSelected
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
                        </v-row>
                    </v-item-group>
                </v-container>
            </v-window-item>

            <v-window-item :value="3">
                <v-container class="field-container">
                    <label class="field-title"
                        >Êtes-vous dans une copropriété ?</label
                    >
                    <v-select
                        v-model="formData.copropriete"
                        :items="coproprieteValues"
                        :rules="rulesCopropriete"
                        outlined
                        required
                    ></v-select>
                </v-container>
            </v-window-item>

            <v-window-item :value="4">
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
            </v-window-item>

            <v-window-item :value="5">
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
            </v-window-item>

            <v-window-item :value="6">
                <v-container class="field-container">
                    <label class="field-title"
                        >Quand a été construit votre logement ?</label
                    >
                    <v-select
                        v-model="formData.dateConstruction"
                        :items="dateConstructions"
                        :rules="rulesDateConstruction"
                        outlined
                    ></v-select>
                </v-container>
            </v-window-item>

            <v-window-item :value="7">
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
            </v-window-item>
        </v-window>
        <v-card-actions style="padding-right: 0">
            <v-container class="buttons-container">
                <v-btn
                    :color="stepState === 1 ? 'grayScale60' : 'secondary'"
                    @click="computeStep(-1)"
                >
                    Retour
                </v-btn>
                <v-btn
                    style="margin-right: 0 !important"
                    :color="isValid() ? 'primaryMain' : 'primaryBorder'"
                    @click="computeStep(1)"
                >
                    Valider
                </v-btn>
            </v-container>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'AdresseStep',
    data: () => ({
        stepState: 1,
        fake: {
            adresse: '',
            typeLogement: '',
            copropriete: '',
            superficie: '',
            consomationElectrique: 0,
            dateConstruction: '',
            budget: ''
        },
        formData: {
            adresse: '120',
            typeLogement: 'MAISON',
            copropriete: true,
            superficie: '150',
            consomationElectrique: 150,
            dateConstruction: 'PLUS_15_ANS',
            budget: '150'
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
        isConsomationValid() {
            return this.formData.consomationElectrique > 0
        },
        isBudgetValid() {
            return /^\d+$/.test(this.formData.budget)
        },
        isValid() {
            switch (this.stepState) {
                case 1:
                    return this.isAdressValid()
                case 2:
                    return this.isTypeLogementValid()
                case 3:
                    return this.isCoproprieteValid()
                case 4:
                    return this.isSuperficieValid()
                case 5:
                    return this.isConsomationValid()
                case 6:
                    return this.isDateConstructionValid()
                case 7:
                    return this.isBudgetValid()
            }
        },
        computeStep(direction) {
            if (direction < 0) {
                if (this.stepState > 1) {
                    this.stepState -= 1
                }
            } else if (this.isValid()) {
                if (this.stepState === 7) {
                    this.submit()
                    this.$emit('done-event')
                } else {
                    this.stepState += 1
                }
            }
        },
        submit() {
            this.$store.commit('reviFormState/setHousingData', this.formData)
        }
    }
}
</script>

<style lang="scss">
.buttons-container {
    display: flex;
    justify-content: flex-end;
    padding-right: 0;
}

.field-container {
    background-color: $primaryCard;
    border-radius: 5px;
    padding: 28px 16px !important;
}

.v-stepper__content {
    padding-left: 0 !important;
}

.theme--dark.v-card {
    background-color: $primaryFont;
    color: #ffffff;
}

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

.v-btn--disabled {
    color: rgba(255, 255, 255, 0.8) !important;
}

.image-button-item {
    margin-top: 24px;
    margin-right: 12px;
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
