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
                    @click="stepState = 3"
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
        rulesFirstName: [(v) => !!v || 'Veuillez indiquer votre prénom']
    }),

    methods: {
        isLastNameValid() {
            return this.lastName !== ''
        },
        isFirstNameValid() {
            return this.firstName !== ''
        }
    }
}
</script>
