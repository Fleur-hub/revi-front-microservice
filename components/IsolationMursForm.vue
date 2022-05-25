<template>
    <v-stepper v-model="stepState">
        <v-stepper-items>
            <v-stepper-content step="isolationMursStep">
                <v-container>
                    <v-checkbox
                        v-model="mursInterieur"
                        :label="mursInterieurLabel"
                        :value="true"
                        required
                        @click="clearMursInterieur()"
                    >
                    </v-checkbox>
                    <v-container>
                        <v-text-field
                            v-if="mursInterieur"
                            v-model="mursInterieurSurface"
                            outlined
                            :rules="rulesMursSurface"
                            type="number"
                            onkeydown="return event.keyCode !== 69"
                            required
                        ></v-text-field>
                    </v-container>

                    <v-checkbox
                        v-model="mursExterieur"
                        :label="mursExterieurLabel"
                        :value="true"
                        required
                        @click="clearMursExterieur()"
                    >
                    </v-checkbox>
                    <v-container>
                        <v-text-field
                            v-if="mursExterieur"
                            v-model="mursExterieurSurface"
                            outlined
                            :rules="rulesMursSurface"
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
    name: 'IsolationMursForm',
    data: () => ({
        stepState: 'isolationMursStep',
        mursInterieur: false,
        mursInterieurLabel: 'Murs intérieurs',
        mursExterieur: false,
        mursExterieurLabel: 'Murs extérieurs',

        mursInterieurSurface: 0,
        mursExterieurSurface: 0,

        rulesMursSurface: [(v) => !!v || 'Veuillez ajouter une surface']
    }),

    methods: {
        clearMursInterieur() {
            if (!this.mursInterieur) {
                this.mursInterieurSurface = 0
            }
        },
        clearMursExterieur() {
            if (!this.mursExterieur) {
                this.mursExterieurSurface = 0
            }
        },
        isValid() {
            if (!this.mursInterieur && !this.mursExterieur) {
                return false
            }

            if (this.mursInterieur && this.mursInterieurSurface <= 0) {
                return false
            }

            return !(this.mursExterieur && this.mursExterieurSurface <= 0)
        }
    }
}
</script>
