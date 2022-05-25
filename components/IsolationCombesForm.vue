<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="isolationCombesStep">
                <v-container>
                    <v-checkbox
                        v-model="combesPerdues"
                        :label="combesPerduesLabel"
                        :value="true"
                        required
                        @click="clearCombesPerdues()"
                    >
                    </v-checkbox>
                    <v-container>
                        <v-text-field
                            v-if="combesPerdues"
                            v-model="combesPerduesSurface"
                            :rules="rulesCombesSurface"
                            type="number"
                            outlined
                            onkeydown="return event.keyCode !== 69"
                            required
                        ></v-text-field>
                    </v-container>

                    <v-checkbox
                        v-model="combesAmenages"
                        :label="combesAmenagesLabel"
                        :value="true"
                        required
                        @click="clearCombesAmenages()"
                    >
                    </v-checkbox>
                    <v-container>
                        <v-text-field
                            v-if="combesAmenages"
                            v-model="combesAmenagesSurface"
                            outlined
                            :rules="rulesCombesSurface"
                            type="number"
                            onkeydown="return event.keyCode !== 69"
                            required
                        ></v-text-field>
                    </v-container>

                    <v-btn :disabled="!isValid()" color="success" class="mr-4">
                        Valider
                    </v-btn>
                </v-container>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
export default {
    name: 'IsolationCombesForm',
    data: () => ({
        stepState: 'isolationCombesStep',
        combesPerdues: false,
        combesPerduesLabel: 'Combles perdues',
        combesAmenages: false,
        combesAmenagesLabel: 'Combles aménagées',

        combesPerduesSurface: 0,
        combesAmenagesSurface: 0,

        rulesCombesSurface: [(v) => !!v || 'Veuillez ajouter une surface']
    }),

    methods: {
        clearCombesPerdues() {
            if (!this.combesPerdues) {
                this.combesPerduesSurface = 0
            }
        },
        clearCombesAmenages() {
            if (!this.combesAmenages) {
                this.combesAmenagesSurface = 0
            }
        },
        isValid() {
            if (!this.combesPerdues && !this.combesAmenages) {
                return false
            }

            if (this.combesPerdues && this.combesPerduesSurface <= 0) {
                return false
            }

            return !(this.combesAmenages && this.combesAmenagesSurface <= 0)
        }
    }
}
</script>
