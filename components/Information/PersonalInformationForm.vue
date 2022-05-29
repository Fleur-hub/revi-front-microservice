<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="lastNameStep">
                <v-text-field
                    v-model="lastName"
                    :rules="rulesLastName"
                    label="Nom"
                    outlined
                    required
                ></v-text-field>
                <v-btn
                    :disabled="!isLastNameValid()"
                    class="mr-4"
                    color="success"
                    @click="stepState = 'firstNameStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="firstNameStep">
                <v-text-field
                    v-model="firstName"
                    :rules="rulesFirstName"
                    label="Prénom"
                    outlined
                    required
                ></v-text-field>
                <v-btn color="secondary" @click="stepState = 'lastNameStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isFirstNameValid()"
                    class="mr-4"
                    color="success"
                    @click="stepState = 'addressStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="addressStep">
                <v-text-field
                    v-model.number="address"
                    :rules="rulesAddress"
                    label="Adresse"
                    outlined
                    required
                ></v-text-field>
                <v-btn color="secondary" @click="stepState = 'firstNameStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isAddressValid()"
                    class="mr-4"
                    color="success"
                    @click="stepState = 'personalPhoneStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="personalPhoneStep">
                <v-text-field
                    v-model="personalPhone"
                    :rules="rulesPersonalPhone"
                    label="0123456789"
                    maxlength="10"
                    minlength="10"
                    onkeydown="return event.keyCode !== 69"
                    outlined
                    required
                ></v-text-field>
                <v-btn color="secondary" @click="stepState = 'addressStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isPersonalPhoneValid()"
                    class="mr-4"
                    color="success"
                    @click="stepState = 'eMailStep'"
                >
                    Valider
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="eMailStep">
                <v-text-field
                    v-model="eMail"
                    :rules="rulesEmail"
                    label="adresse@exemple.com"
                    outlined
                    required
                ></v-text-field>
                <v-btn
                    color="secondary"
                    @click="stepState = 'personalPhoneStep'"
                >
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isEmailValid()"
                    class="mr-4"
                    color="success"
                    @click="$emit('done-event')"
                >
                    Valider
                </v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'PersonalInformationForm',
    data: () => ({
        stepState: 'lastNameStep',
        lastName: '',
        rulesLastName: [(v) => !!v || 'Veuillez indiquer votre nom de famille'],

        firstName: '',
        rulesFirstName: [(v) => !!v || 'Veuillez indiquer votre prénom'],

        address: '',
        rulesAddress: [
            (v) => !!v || 'Veuillez indiquer votre adresse personnelle'
        ],

        personalPhone: '',
        rulesPersonalPhone: [
            (v) => !!v || 'Veuillez indiquer votre numéro de téléphone'
        ],

        eMail: '',
        rulesEmail: [(v) => !!v || 'Veuillez indiquer votre adresse e-mail']
    }),

    methods: {
        isLastNameValid() {
            return this.lastName !== ''
        },
        isFirstNameValid() {
            return this.firstName !== ''
        },
        isAddressValid() {
            return this.adresse !== ''
        },
        isPersonalPhoneValid() {
            return (
                /^\d+$/.test(this.personalPhone) &&
                this.personalPhone.length === 10
            )
        },
        isEmailValid() {
            return this.eMail !== ''
        }
    }
}
</script>
