<template>
    <div style="justify-content: center; display: flex">
        <v-stepper v-model="stepState" elevation="0">
            <v-stepper-items>
                <v-stepper-content step="TravauxChoiceStep">
                    <p>Quel(s) travaux souhaitez-vous effectuer ?</p>
                    <v-item-group v-model="selected" multiple>
                        <v-item class="row-item">
                            <v-row>
                                <v-item
                                    v-slot="{ active, toggle }"
                                    :value="navigationTree.chauffage"
                                    class="image-button-item"
                                >
                                    <v-card
                                        :elevation="2"
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
                                                    : travauxChoice.chauffage
                                                          .icon
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
                                <v-item
                                    v-slot="{ active, toggle }"
                                    :value="navigationTree.chauffeEau"
                                    class="image-button-item"
                                >
                                    <v-card
                                        :elevation="2"
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
                                                    : travauxChoice.chauffeEau
                                                          .icon
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
                            </v-row>
                        </v-item>
                        <v-item class="row-item">
                            <v-row>
                                <v-item
                                    v-slot="{ active, toggle }"
                                    :value="navigationTree.isolation"
                                    class="image-button-item"
                                >
                                    <v-card
                                        :elevation="2"
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
                                                    : travauxChoice.isolation
                                                          .icon
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
                                <v-item
                                    v-slot="{ active, toggle }"
                                    :value="navigationTree.ventilation"
                                    class="image-button-item"
                                >
                                    <v-card
                                        :elevation="2"
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
                                                    : travauxChoice.ventilation
                                                          .icon
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
                                            {{
                                                travauxChoice.ventilation.label
                                            }}
                                        </v-card-text>
                                    </v-card>
                                </v-item>
                            </v-row>
                        </v-item>
                        <v-row
                            style="
                                display: flex;
                                justify-content: end;
                                padding-right: 20px;
                            "
                        >
                            <v-btn
                                :disabled="!isChoiceValid()"
                                class="button-margin"
                                color="primaryMain"
                                @click="
                                    commitChoice()
                                    goToNextStep()
                                "
                            >
                                Valider
                            </v-btn>
                        </v-row>
                    </v-item-group>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script>
export default {
    name: 'TravauxPage',
    data: () => ({
        stepState: 'TravauxChoiceStep',
        nextStep: '/travaux',
        remainingStep: [],
        navigationTree: {
            housing: {
                page: '/housing',
                next: '/travaux'
            },
            travaux: {
                page: '/travaux',
                next: '/financialInformation'
            },
            chauffage: {
                page: '/travaux/chauffage',
                next: '/financialInformation'
            },
            chauffeEau: {
                page: '/travaux/chauffeEau',
                next: '/financialInformation'
            },
            isolation: {
                page: '/travaux/isolation',
                next: '/financialInformation'
            },
            ventilation: {
                page: '/travaux/ventilation',
                next: '/financialInformation'
            },
            financial: {
                page: '/financialInformation',
                next: '/personalInformation'
            },
            personal: {
                page: '/personalInformation',
                next: '/report'
            }
        },
        selected: [],
        travauxChoice: {
            chauffage: {
                label: 'Chauffage',
                model: false,
                page: '/travaux/chauffage',
                icon: 'button_img/Icone_travaux_chauffage_NS.png',
                iconSelected: 'button_img/Icone_travaux_chauffage_S.png'
            },
            chauffeEau: {
                label: 'Chauffe-eau',
                model: false,
                page: '/travaux/chauffeEau',
                icon: 'button_img/Icone_travaux_chauffe-eau_NS.png',
                iconSelected: 'button_img/Icone_travaux_chauffe-eau_S.png'
            },
            isolation: {
                label: 'Isolation',
                model: false,
                page: '/travaux/isolation',
                icon: 'button_img/Icone_travaux_isolation_NS.png',
                iconSelected: 'button_img/Icone_travaux_isolation_S.png'
            },
            ventilation: {
                label: 'Ventilation',
                model: false,
                page: '/travaux/ventilation',
                icon: 'button_img/Icone_travaux_ventilation_NS.png',
                iconSelected: 'button_img/Icone_travaux_ventilation_S.png'
            }
        }
    }),
    methods: {
        isChoiceValid() {
            return this.selected.length > 0
        },
        computeNavTree() {
            const list = this.selected.reverse()
            let prev = this.navigationTree.travaux
            let current
            while (list.length !== 0) {
                current = list.pop()
                prev.next = current.page
                prev = current
            }
        },
        commitChoice() {
            this.computeNavTree()
            this.$store.commit('reviFormState/setTravauxChoice', this.selected)
            this.$store.commit(
                'reviFormState/setNavigationTree',
                this.navigationTree
            )
        },
        goToNextStep() {
            const nextUrl =
                this.$store.getters['reviFormState/computeNextStep'](
                    'travaux'
                ).next
            this.$router.push(nextUrl)
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

.button-margin {
    margin: 16px !important;
}

.image-button-item {
    margin-right: 12px;
}

.row-item {
    margin: 12px;
}
</style>
