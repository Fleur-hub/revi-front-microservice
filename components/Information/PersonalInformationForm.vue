<template>
    <v-card class="mx-auto" elevation="0">
        <v-window v-model="stepState" class="field-container text-left">
            <v-window-item :value="1">
                <label class="field-title">Nom</label>
                <v-text-field
                    v-model="formData.lastName"
                    :rules="rulesLastName"
                    outlined
                    required
                ></v-text-field>
            </v-window-item>

            <v-window-item :value="2">
                <label class="field-title">Prénom</label>
                <v-text-field
                    v-model="formData.firstName"
                    :rules="rulesFirstName"
                    outlined
                    required
                ></v-text-field>
            </v-window-item>

            <v-window-item :value="3">
                <label class="field-title">Adresse</label>
                <v-text-field
                    v-model.number="formData.address"
                    :rules="rulesAddress"
                    outlined
                    required
                ></v-text-field>
            </v-window-item>

            <v-window-item :value="4">
                <label class="field-title">Téléphone</label>
                <v-text-field
                    v-model="formData.personalPhone"
                    :rules="rulesPersonalPhone"
                    maxlength="10"
                    minlength="10"
                    onkeydown="return event.keyCode !== 69"
                    outlined
                    required
                ></v-text-field>
            </v-window-item>

            <v-window-item :value="5">
                <label class="field-title">Adresse mail</label>
                <v-text-field
                    v-model="formData.email"
                    :rules="rulesEmail"
                    outlined
                    required
                ></v-text-field>
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
    name: 'PersonalInformationForm',
    data: () => ({
        stepState: 'emailStep',
        formData: {
            lastName: 'z',
            firstName: 'z',
            address: 'z',
            personalPhone: '0101101001',
            email: 'z'
        },

        rulesLastName: [(v) => !!v || 'Veuillez indiquer votre nom de famille'],

        rulesFirstName: [(v) => !!v || 'Veuillez indiquer votre prénom'],

        rulesAddress: [
            (v) => !!v || 'Veuillez indiquer votre adresse personnelle'
        ],

        rulesPersonalPhone: [
            (v) => !!v || 'Veuillez indiquer votre numéro de téléphone'
        ],

        rulesEmail: [(v) => !!v || 'Veuillez indiquer votre adresse e-mail']
    }),

    methods: {
        isLastNameValid() {
            return this.formData.lastName !== ''
        },
        isFirstNameValid() {
            return this.formData.firstName !== ''
        },
        isAddressValid() {
            return this.formData.adresse !== ''
        },
        isPersonalPhoneValid() {
            return (
                /^\d+$/.test(this.formData.personalPhone) &&
                this.formData.personalPhone.length === 10
            )
        },
        isEmailValid() {
            return this.formData.email !== ''
        },
        isValid() {
            switch (this.stepState) {
                case 1:
                    return this.isLastNameValid()
                case 2:
                    return this.isFirstNameValid()
                case 3:
                    return this.isAddressValid()
                case 4:
                    return this.isPersonalPhoneValid()
                case 5:
                    return this.isEmailValid()
            }
        },
        computeStep(direction) {
            if (direction < 0) {
                if (this.stepState > 1) {
                    this.stepState -= 1
                }
            } else if (this.isValid()) {
                if (this.stepState === 5) {
                    this.submit()
                    this.$emit('done-event')
                } else {
                    this.stepState += 1
                }
            }
        },
        submit() {
            this.$store.commit('reviFormState/setPersonalData', this.formData)
        }
    }
}
</script>
