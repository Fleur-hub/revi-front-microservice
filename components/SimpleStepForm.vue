<template>
    <v-stepper v-model="e1">
        <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1" editable>
                Name of step 1
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2" editable>
                Name of step 2
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3" editable> Name of step 3 </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content step="1">
                <devis-form ref="step1Form" />

                <v-btn text> Cancel </v-btn>

                <v-btn
                    ref="step1Button"
                    color="primary"
                    @click="validate($refs.step1Form, $refs.step1Button, 2)"
                >
                    Continue
                </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
                <devis-form ref="step2Form" />

                <v-btn color="secondary" @click="e1 = 1"> previous </v-btn>

                <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
                <devis-form ref="step3Form" />

                <v-btn color="secondary" @click="e1 = 2"> previous </v-btn>

                <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>
            </v-stepper-content>
        </v-stepper-items>
        <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="form"
        ></v-skeleton-loader>
    </v-stepper>
</template>

<script>
export default {
    name: 'SimpleStepForm',
    data: () => ({
        e1: 1,
        step1Form: null,
        step2Form: null,
        step3Form: null
    }),
    methods: {
        isValid() {
            return false
        }
    }
}
</script>
