<template>
    <v-container>
        <v-checkbox
            v-model="toitureAccessible"
            :label="toitureAccessibleLabel"
            :value="true"
            required
            @click="clearRadioAndField()"
        >
        </v-checkbox>
        <v-radio-group v-if="toitureAccessible" v-model="toitureAccessibleType">
            <v-container
                v-for="(type, i) in toitureNonAccessibleValues"
                :key="i"
            >
                <v-radio :label="type" :value="type" required> </v-radio>
                <v-container>
                    <v-text-field
                        v-if="toitureAccessibleType === type"
                        v-model="accessibleSurface"
                        outlined
                        type="number"
                        :rules="rulesToitureSurface"
                        onkeydown="return event.keyCode !== 69"
                        required
                    ></v-text-field>
                </v-container>
            </v-container>
        </v-radio-group>

        <v-checkbox
            v-model="toitureNonAccessible"
            :label="toitureNonAccessibleLabel"
            :value="true"
            required
            @click="clearRadioAndField()"
        >
        </v-checkbox>
        <v-radio-group
            v-if="toitureNonAccessible"
            v-model="toitureNonAccessibleType"
        >
            <v-container
                v-for="(type, i) in toitureNonAccessibleValues"
                :key="i"
            >
                <v-radio :label="type" :value="type" required> </v-radio>
                <v-container>
                    <v-text-field
                        v-if="toitureNonAccessibleType === type"
                        v-model="nonAccessibleSurface"
                        outlined
                        type="number"
                        :rules="rulesToitureSurface"
                        onkeydown="return event.keyCode !== 69"
                        required
                    ></v-text-field>
                </v-container>
            </v-container>
        </v-radio-group>

        <v-btn :disabled="!isValid()" color="success" class="mr-4">
            Valider
        </v-btn>
    </v-container>
</template>

<script>
export default {
    name: 'IsolationToitureForm',
    data: () => ({
        toitureAccessible: false,
        toitureAccessibleLabel: 'Accessible',
        toitureNonAccessible: false,
        toitureNonAccessibleLabel: 'Non Accessible',

        toitureAccessibleType: '',
        toitureAccessibleValues: [
            'Bitume ou caoutchouc',
            'Végetalisation',
            'Gravier'
        ],

        toitureNonAccessibleType: '',
        toitureNonAccessibleValues: [
            'Bois',
            'Carrelage',
            'Dalle gravillonée',
            'Végetalisation',
            'Béton',
            'Pierre naturelle'
        ],

        accessibleSurface: 0,
        nonAccessibleSurface: 0,

        rulesToitureSurface: [(v) => !!v || 'Veuillez ajouter une surface']
    }),

    methods: {
        computeNextStep() {
            if (this.stepState === 'isolationToitureStep' && this.isolation) {
                return '2'
            }
            if (this.refection) {
                return '3'
            }
        },
        clearRadioAndField() {
            if (!this.toitureAccessible) {
                this.toitureAccessibleType = ''
                this.accessibleSurface = 0
            }

            if (!this.toitureNonAccessible) {
                this.toitureNonAccessibleType = ''
                this.nonAccessibleSurface = 0
            }
        },
        isValid() {
            if (!this.toitureAccessible && !this.toitureNonAccessible) {
                return false
            }

            if (this.toitureAccessible) {
                if (
                    this.toitureAccessibleType === '' ||
                    this.accessibleSurface <= 0
                ) {
                    return false
                }
            }

            if (this.toitureNonAccessible) {
                if (
                    this.toitureNonAccessibleType === '' ||
                    this.nonAccessibleSurface <= 0
                ) {
                    return false
                }
            }
            return true
        }
    }
}
</script>
