<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="lastNameStep">
                <v-text-field
                    v-model="lastName"
                    :rules="rulesLastName"
                    label="Nom"
                    required
                ></v-text-field>
                <v-btn
                    :disabled="!isLastNameValid()"
                    color="success"
                    class="mr-4"
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
                    required
                ></v-text-field>
                <v-btn color="secondary" @click="stepState = 'lastNameStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isFirstNameValid()"
                    color="success"
                    class="mr-4"
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
                    onkeydown="return event.keyCode !== 69"
                    maxlength="10"
                    minlength="10"
                    required
                ></v-text-field>
                <v-btn color="secondary" @click="stepState = 'firstNameStep'">
                    Retour
                </v-btn>
                <v-btn
                    :disabled="!isPersonalPhoneValid()"
                    color="success"
                    class="mr-4"
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
                    color="success"
                    class="mr-4"
                    @click="stepState = 5"
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

        personalPhone: '',
        rulesPersonalPhone: [
            (v) => !!v || 'Veuillez indiquer un numéro de téléphone valide'
        ],

        eMail: '',
        rulesEmail: [
            (v) => !!v || 'Veuillez indiquer une adresse e-mail valide'
        ]
    }),

    methods: {
        isLastNameValid() {
            return this.lastName !== ''
        },
        isFirstNameValid() {
            return this.firstName !== ''
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
