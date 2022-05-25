<template>
    <v-container>
        <Transition name="slide-fade">
            <v-container v-if="e1 === 1">
                <v-container class="field-container">
                    <v-text-field
                        v-model="adresse"
                        label="Adresse du logement"
                        placeholder="123 rue de la paix 75009 Paris"
                        :rules="rulesAdresse"
                        color="grayScale70"
                        background-color="grayScale10"
                        min="10"
                        outlined
                        required
                    ></v-text-field>
                </v-container>
                <v-btn
                    :disabled="!isAdressValid()"
                    color="primaryMain"
                    class="mr-4"
                    @click="e1 = 2"
                >
                    Valider
                </v-btn>
            </v-container>
        </Transition>
        <Transition name="slide-fade">
            <v-container v-if="e1 === 2">
                <v-radio-group
                    v-model="typeLogement"
                    label="Quel est votre type de bien ?"
                >
                    <v-radio
                        v-for="(type, i) in typeLogementValues"
                        :key="i"
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
                    @click="e1 = 3"
                >
                    Valider
                </v-btn>
            </v-container>
        </Transition>
        <v-container v-if="e1 === 3">
            <v-select
                v-model="copropriete"
                :rules="rulesCopropriete"
                :items="coproprieteValues"
                label="Êtes-vous dans une copropriété ?"
                required
            ></v-select>
            <v-btn color="secondary" @click="e1 = 2"> Retour </v-btn>
            <v-btn
                :disabled="!isCoproprieteValid()"
                color="success"
                class="mr-4"
                @click="e1 = 4"
            >
                Valider
            </v-btn>
        </v-container>
        <v-container v-if="e1 === 4">
            <v-text-field
                v-model="superficie"
                outlined
                type="number"
                :rules="rulesSuperficie"
                label="Quelle est la superficie du bien ?"
                placeholder="Superficie m²"
                required
            ></v-text-field>
            <v-btn color="secondary" @click="e1 = 3"> Retour </v-btn>
            <v-btn
                :disabled="!isSuperficieValid()"
                color="success"
                class="mr-4"
                @click="e1 = 5"
            >
                Valider
            </v-btn>
        </v-container>
        <v-container v-if="e1 === 5">
            <v-select
                v-model="dateConstruction"
                :rules="rulesDateConstruction"
                :items="dateConstructionValues"
                label="Quand a été construit votre logement ?"
            ></v-select>
            <v-btn color="secondary" @click="e1 = 4"> Retour </v-btn>
            <v-btn
                :disabled="!isDateConstructionValid()"
                color="success"
                class="mr-4"
                @click="e1 = 6"
            >
                Valider
            </v-btn>
        </v-container>
        <v-container v-if="e1 === 6">
            <v-text-field
                v-model="budget"
                outlined
                type="number"
                :rules="rulesBudget"
                label="Quel est votre budget pour ces travaux ?"
                placeholder="Budget en €"
                required
            ></v-text-field>
            <v-btn color="secondary" @click="e1 = 5"> Retour </v-btn>
            <v-btn
                :disabled="!isBudgetValid()"
                color="success"
                class="mr-4"
                @click="e1 = 7"
            >
                Valider
            </v-btn>
        </v-container>
        <v-container v-if="e1 === 7">
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
            <v-btn color="secondary" @click="e1 = 6"> Retour </v-btn>
            <v-btn
                :disabled="!isTypeTravauxValid()"
                color="success"
                class="mr-4"
                @click="e1 = 8"
            >
                Valider
            </v-btn>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'ReviStepper',
    data: () => ({
        e1: 1,
        direction: 1,
        adresse: '',
        rulesAdresse: [
            (v) => !!v || "Veuillez rentrer l'adresse de votre logement"
        ],

        typeLogement: '',
        typeLogementValues: ['Maison', 'Appartement'],

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
        dateConstructionValues: [
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
            return this.typeLogementValues.includes(this.typeLogement)
        },
        isCoproprieteValid() {
            return this.coproprieteValues.includes(this.copropriete)
        },
        isSuperficieValid() {
            return this.superficie !== '' && /^\d+$/.test(this.superficie)
        },
        isDateConstructionValid() {
            return this.dateConstructionValues.includes(this.dateConstruction)
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

<style lang="scss">
.slide-fade-enter-active {
    transition: all 0.25s ease-out;
    transition-delay: 0.25s;
}

.slide-fade-leave-active {
    transition: all 0.24s ease-out;
}

.slide-fade-enter {
    opacity: 0;
    transform: translateX(100%);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}

.v-btn--disabled {
    background-color: $grayScale70 !important;
}
</style>
