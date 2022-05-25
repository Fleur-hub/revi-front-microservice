<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="numberPeopleLivingStep">
                <v-text-field
                    v-model="numberPeopleLiving"
                    :rules="rulesNumberPeopleLiving"
                    label="Nombre de personnes dans le logement fiscal "
                    onkeydown="return event.keyCode !== 69"
                    outlined
                    required
                ></v-text-field>
                <v-btn
                    :disabled="!isNumberPeopleLivingValid()"
                    color="success"
                    class="mr-4"
                    @click="stepState = 'taxRevenueStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="taxRevenueStep">
                <v-text-field
                    v-model.number="taxRevenue"
                    :rules="rulesTaxRevenue"
                    label="Revenu fiscal de référence"
                    onkeydown="return event.keyCode !== 69"
                    outlined
                    required
                ></v-text-field>
                <v-btn
                    color="secondary"
                    @click="stepState = 'numberPeopleLivingStep'"
                >
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isTaxRevenueValid()"
                    color="success"
                    class="mr-4"
                    @click="stepState = 'housingPeopleTypeStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="housingPeopleTypeStep">
                <v-radio-group
                    v-model="housingPeopleType"
                    label="Êtes-vous propriétaire ou locataire ?"
                >
                    <v-radio
                        v-for="(type, i) in housingPeopleTypes"
                        :key="i"
                        :label="type"
                        :value="type"
                        required
                    >
                    </v-radio>
                </v-radio-group>
                <v-btn color="secondary" @click="stepState = 'taxRevenueStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isHousingPeopleTypeValid()"
                    color="success"
                    class="mr-4"
                    @click="stepState = 4"
                >
                    Valider
                </v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'FinancialInformationForm',
    data: () => ({
        stepState: 'numberPeopleLivingStep',
        numberPeopleLiving: '',
        rulesNumberPeopleLiving: [
            (v) =>
                !!v ||
                'Veuillez rentrer le nombre de personnes vivant dans le logement'
        ],

        taxRevenue: '',
        rulesTaxRevenue: [
            (v) =>
                !!v ||
                'Veuillez rentrer le revenu fiscal de référence de votre logement'
        ],

        housingPeopleType: '',
        housingPeopleTypes: [
            'Propriétaire occupant',
            'Propriétaire bailleur',
            'Propriétaire d’une résidence secondaire',
            'Locataire'
        ],
        rulesHousingPeopleType: [(v) => !!v || 'Veuillez indiquer votre statut']
    }),

    methods: {
        isNumberPeopleLivingValid() {
            return /^\d+$/.test(this.numberPeopleLiving)
        },
        isTaxRevenueValid() {
            return /^\d+$/.test(this.taxRevenue)
        },
        isHousingPeopleTypeValid() {
            return this.housingPeopleTypes.includes(this.housingPeopleType)
        }
    }
}
</script>
