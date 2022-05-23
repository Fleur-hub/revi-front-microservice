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
            <v-radio
                v-for="(type, i) in toitureAccessibleValues"
                :key="i"
                :label="type"
                :value="type"
                required
            >
            </v-radio>
        </v-radio-group>
        <v-text-field
            v-if="toitureAccessibleType !== ''"
            v-model="accessibleSurface"
            onkeydown="return event.keyCode !== 69"
            required
        ></v-text-field>
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
            <v-radio
                v-for="(type, i) in toitureNonAccessibleValues"
                :key="i"
                :label="type"
                :value="type"
                required
            >
            </v-radio>
        </v-radio-group>
        <v-text-field
            v-if="toitureNonAccessibleType !== ''"
            v-model="nonAccessibleSurface"
            onkeydown="return event.keyCode !== 69"
            required
        ></v-text-field>
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
        nonAccessibleSurface: 0
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
