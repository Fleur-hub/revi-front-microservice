<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="numberPeopleLivingStep">
                <v-text-field
                    v-model="formData.numberPeopleLiving"
                    :rules="rulesNumberPeopleLiving"
                    label="Nombre de personnes dans le logement fiscal "
                    onkeydown="return event.keyCode !== 69"
                    outlined
                    required
                ></v-text-field>
                <v-btn
                    :disabled="!isNumberPeopleLivingValid()"
                    class="mr-4"
                    color="success"
                    @click="stepState = 'taxRevenueStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="taxRevenueStep">
                <v-text-field
                    v-model.number="formData.taxRevenue"
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
                    class="mr-4"
                    color="success"
                    @click="stepState = 'housingPeopleTypeStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="housingPeopleTypeStep">
                <v-radio-group
                    v-model="formData.housingPeopleType"
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
                    class="mr-4"
                    color="success"
                    @click="
                        submit()
                        $emit('done-event')
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
    name: 'FinancialInformationForm',
    data: () => ({
        stepState: 'housingPeopleTypeStep',
        formData: {
            numberPeopleLiving: '7',
            taxRevenue: '70000',
            housingPeopleType: 'Propriétaire occupant'
        },
        rulesNumberPeopleLiving: [
            (v) =>
                !!v ||
                'Veuillez rentrer le nombre de personnes vivant dans le logement'
        ],
        rulesTaxRevenue: [
            (v) =>
                !!v ||
                'Veuillez rentrer le revenu fiscal de référence de votre logement'
        ],
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
            return /^\d+$/.test(this.formData.numberPeopleLiving)
        },
        isTaxRevenueValid() {
            return /^\d+$/.test(this.formData.taxRevenue)
        },
        isHousingPeopleTypeValid() {
            return this.housingPeopleTypes.includes(
                this.formData.housingPeopleType
            )
        },
        submit() {
            this.$store.commit('reviFormState/setFinancialData', this.formData)
        }
    }
}
</script>
