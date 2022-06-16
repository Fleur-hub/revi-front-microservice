<template>
    <v-stepper v-model="stepState" elevation="0">
        <v-stepper-items>
            <v-stepper-content step="TravauxChoiceStep">
                <v-item-group v-model="selected" multiple>
                    <v-row>
                        <v-col class="top-col">
                            <v-item v-slot="{ active, toggle }">
                                <v-card
                                    :elevation="10"
                                    height="200"
                                    width="200"
                                    :class="
                                        active
                                            ? 'img-selected'
                                            : 'img-not-selected'
                                    "
                                    @click="toggle"
                                >
                                    <v-img
                                        :src="
                                            active
                                                ? travauxChoice.chauffage
                                                      .iconSelected
                                                : travauxChoice.chauffage.icon
                                        "
                                        class="image-center"
                                    >
                                    </v-img>
                                    <v-card-text
                                        :class="
                                            active
                                                ? 'text-selected'
                                                : 'text-not-selected'
                                        "
                                    >
                                        {{ travauxChoice.chauffage.label }}
                                    </v-card-text>
                                </v-card>
                            </v-item>
                        </v-col>
                        <v-col class="top-col">
                            <v-item v-slot="{ active, toggle }">
                                <v-card
                                    :elevation="10"
                                    height="200"
                                    width="200"
                                    :class="
                                        active
                                            ? 'img-selected'
                                            : 'img-not-selected'
                                    "
                                    @click="toggle"
                                >
                                    <v-img
                                        :src="
                                            active
                                                ? travauxChoice.chauffeEau
                                                      .iconSelected
                                                : travauxChoice.chauffeEau.icon
                                        "
                                        width="83"
                                        height="100"
                                        class="image-center"
                                    >
                                    </v-img>
                                    <v-card-text
                                        :class="
                                            active
                                                ? 'text-selected'
                                                : 'text-not-selected'
                                        "
                                    >
                                        {{ travauxChoice.chauffeEau.label }}
                                    </v-card-text>
                                </v-card>
                            </v-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="bottom-col">
                            <v-item v-slot="{ active, toggle }">
                                <v-card
                                    :elevation="10"
                                    height="200"
                                    width="200"
                                    :class="
                                        active
                                            ? 'img-selected'
                                            : 'img-not-selected'
                                    "
                                    @click="toggle"
                                >
                                    <v-img
                                        :src="
                                            active
                                                ? travauxChoice.isolation
                                                      .iconSelected
                                                : travauxChoice.isolation.icon
                                        "
                                        class="image-center"
                                    >
                                    </v-img>
                                    <v-card-text
                                        :class="
                                            active
                                                ? 'text-selected'
                                                : 'text-not-selected'
                                        "
                                    >
                                        {{ travauxChoice.isolation.label }}
                                    </v-card-text>
                                </v-card>
                            </v-item>
                        </v-col>
                        <v-col class="bottom-col">
                            <v-item v-slot="{ active, toggle }">
                                <v-card
                                    :elevation="10"
                                    height="200"
                                    width="200"
                                    :class="
                                        active
                                            ? 'img-selected'
                                            : 'img-not-selected'
                                    "
                                    @click="toggle"
                                >
                                    <v-img
                                        :src="
                                            active
                                                ? travauxChoice.ventilation
                                                      .iconSelected
                                                : travauxChoice.ventilation.icon
                                        "
                                        class="image-center"
                                    >
                                    </v-img>
                                    <v-card-text
                                        :class="
                                            active
                                                ? 'text-selected'
                                                : 'text-not-selected'
                                        "
                                    >
                                        {{ travauxChoice.ventilation.label }}
                                    </v-card-text>
                                </v-card>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-item-group>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
import axios from 'axios'

export default {
    name: 'TravauxPage',
    data: () => ({
        stepState: 'TravauxChoiceStep',
        remainingStep: [],
        selected: [],
        travauxChoice: {
            chauffage: {
                label: 'Chauffage',
                model: false,
                step: 'ChauffageStep',
                icon: 'button_img/Icone_travaux_chauffage_NS.png',
                iconSelected: 'button_img/Icone_travaux_chauffage_S.png'
            },
            chauffeEau: {
                label: 'Chauffe-eau',
                model: false,
                step: 'ChauffeEauStep',
                icon: 'button_img/Icone_travaux_chauffe-eau_NS.png',
                iconSelected: 'button_img/Icone_travaux_chauffe-eau_S.png'
            },
            isolation: {
                label: 'Isolation',
                model: false,
                step: 'IsolationStep',
                icon: 'button_img/Icone_travaux_isolation_NS.png',
                iconSelected: 'button_img/Icone_travaux_isolation_S.png'
            },
            ventilation: {
                label: 'Ventilation',
                model: false,
                step: 'VentilationStep',
                icon: 'button_img/Icone_travaux_ventilation_NS.png',
                iconSelected: 'button_img/Icone_travaux_ventilation_S.png'
            }
        }
    }),
    methods: {
        isChoiceValid() {
            for (const key in this.travauxChoice) {
                if (this.travauxChoice[key].model) {
                    return true
                }
            }
            return false
        },
        computeStep() {
            for (const key in this.travauxChoice) {
                const value = this.travauxChoice[key]
                if (value.model) {
                    this.remainingStep.push(value.step)
                }
            }
            this.remainingStep.push('financialStep')
            this.remainingStep.push('personalStep')
            this.remainingStep = this.remainingStep.reverse()
        },
        nextStep() {
            if (this.remainingStep.length !== 0) {
                this.stepState = this.remainingStep.pop()
            }
        },
        async postCreateTravaux() {
            const response = await axios.post(
                'http://localhost:8080/api/' +
                    this.$store.getters['reviFormState/getHousingId'] +
                    '/travaux/'
            )
            this.$store.commit(
                'reviFormState/setTravauxId',
                response.data.travauxId
            )
        }
    }
}
</script>

<style lang="scss">
.img-selected {
    background-color: $primaryMain !important;
}

.img-not-selected {
    background-color: #fff !important;
}

.image-center {
    height: 100px;
    width: 100px;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.top-col {
    margin-left: 18px;
    margin-top: 18px;
}

.bottom-col {
    margin-left: 18px;
    margin-bottom: 18px;
}

.text-selected {
    color: $grayScale10 !important;
}

.text-not-selected {
    color: $grayScale90 !important;
}

.text-selected,
.text-not-selected {
    font-weight: bold !important;
    font-size: 16px !important;
    padding-top: 35% !important;
    display: flex;
    justify-content: center;
}
</style>
