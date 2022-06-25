<template>
    <v-card class="mx-auto" elevation="0">
        <v-window v-model="stepState" class="field-container text-left">
            <v-window-item :value="1">
                <label class="field-title"
                    >Nombre de personnes dans le logement fiscal
                </label>
                <v-text-field
                    v-model="formData.numberPeopleLiving"
                    :rules="rulesNumberPeopleLiving"
                    onkeydown="return event.keyCode !== 69"
                    outlined
                    required
                ></v-text-field>
            </v-window-item>
            <v-window-item :value="2">
                <label class="field-title">Revenu fiscal de référence</label>
                <v-text-field
                    v-model.number="formData.taxRevenue"
                    :rules="rulesTaxRevenue"
                    onkeydown="return event.keyCode !== 69"
                    outlined
                    required
                ></v-text-field>
            </v-window-item>
            <v-window-item :value="3">
                <label class="field-title"
                    >Quel propriétaire êtes-vous ?
                </label>
                <v-radio-group v-model="formData.housingPeopleType">
                    <v-radio
                        v-for="(type, i) in housingPeopleTypes"
                        :key="i"
                        :label="type"
                        :value="type"
                        required
                    >
                    </v-radio>
                </v-radio-group>
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
    name: 'FinancialInformationForm',
    data: () => ({
        stepState: 1,
        formData: {
            numberPeopleLiving: '',
            taxRevenue: '',
            housingPeopleType: ''
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
        isValid() {
            switch (this.stepState) {
                case 1:
                    return this.isNumberPeopleLivingValid()
                case 2:
                    return this.isTaxRevenueValid()
                case 3:
                    return this.isHousingPeopleTypeValid()
            }
        },
        computeStep(direction) {
            if (direction < 0) {
                if (this.stepState > 1) {
                    this.stepState -= 1
                }
            } else if (this.isValid()) {
                if (this.stepState === 3) {
                    this.submit()
                    this.$emit('done-event')
                } else {
                    this.stepState += 1
                }
            }
        },
        submit() {
            this.$store.commit('reviFormState/setFinancialData', this.formData)
        }
    }
}
</script>
