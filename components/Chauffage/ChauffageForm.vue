<template>
    <v-card class="mx-auto" elevation="0">
        <v-window v-model="stepState">
            <v-window-item :value="1" class="text-right">
                <v-container
                    v-for="(choice, i) in chauffageChoice"
                    :key="i"
                    class="field-container text-right spaced-container"
                >
                    <v-checkbox
                        v-model="selected"
                        class="field-title"
                        color="primaryPressed"
                        :value="choice"
                        required
                    >
                        <template #label>
                            <label class="radio-label">{{
                                choice.label
                            }}</label>
                        </template>
                    </v-checkbox>
                </v-container>
            </v-window-item>
            <v-window-item
                v-for="(item, i) in selected"
                :key="i"
                :value="item.step"
                class="pa-0"
            >
                <component
                    :is="item.component"
                    :event-key="item.eventKey"
                    @done-event="computeStep(1)"
                    @isValid="setSubFormValid"
                />
            </v-window-item>
        </v-window>
        <v-card-actions style="padding-right: 0">
            <v-container class="buttons-container">
                <v-btn
                    :color="stepState === 1 ? 'grayScale60' : 'secondary'"
                    @click="computeStep(-1)"
                >
                    Retour
                </v-btn>
                <v-btn
                    style="margin-right: 0 !important"
                    :color="isValid() ? 'primaryMain' : 'primaryBorder'"
                    @click="computeStep(1)"
                >
                    Valider
                </v-btn>
            </v-container>
        </v-card-actions>
    </v-card>
</template>

<script>
import ChauffageFioulForm from '~/components/Chauffage/ChauffageFioulForm'
import ChauffageElectriqueForm from '~/components/Chauffage/ChauffageElectriqueForm'
import ChauffageGazForm from '~/components/Chauffage/ChauffageGazForm'
import ChauffageBoisForm from '~/components/Chauffage/ChauffageBoisForm'
import ChauffagePompeChaleurForm from '~/components/Chauffage/ChauffagePompeChaleurForm'
import ChauffageSolaireForm from '~/components/Chauffage/ChauffageSolaireForm'

export default {
    name: 'ChauffageForm',
    components: {
        ChauffageSolaireForm,
        ChauffagePompeChaleurForm,
        ChauffageBoisForm,
        ChauffageGazForm,
        ChauffageElectriqueForm,
        ChauffageFioulForm
    },
    data: () => ({
        stepState: 1,
        selected: [],
        stepInitialized: false,
        subFormIsValid: false,
        chauffageChoice: {
            bois: {
                eventKey: 'bois',
                label: 'Bois',
                step: -1,
                component: ChauffageBoisForm,
                formData: {}
            },
            electrique: {
                eventKey: 'electrique',
                label: 'Electrique',
                step: -1,
                component: ChauffageElectriqueForm,
                formData: {}
            },
            fioul: {
                eventKey: 'fioul',
                label: 'Fioul',
                step: -1,
                component: ChauffageFioulForm,
                formData: {}
            },
            gaz: {
                eventKey: 'gaz',
                label: 'Gaz',
                step: -1,
                component: ChauffageGazForm,
                formData: {}
            },
            pompeChaleur: {
                eventKey: 'pompeChaleur',
                label: 'Pompe à chaleur',
                step: -1,
                component: ChauffagePompeChaleurForm,
                formData: {}
            },
            solaire: {
                eventKey: 'solaire',
                label: 'Solaire',
                step: -1,
                component: ChauffageSolaireForm,
                formData: {}
            }
        }
    }),
    methods: {
        isValid() {
            if (this.stepState === 1) {
                return this.selected.length !== 0 || this.subFormIsValid
            }
            return this.subFormIsValid
        },
        initSteps() {
            let stepIndex = 1
            for (const key in this.selected) {
                const value = this.selected[key]
                value.step = ++stepIndex
            }
        },
        setSubFormValid(isValid, formData, eventKey) {
            this.subFormIsValid = isValid
            this.chauffageChoice[eventKey].formData = formData
        },
        computeStep(direction) {
            if (this.stepState === 1) {
                this.initSteps()
            }
            if (direction < 0) {
                if (this.stepState > 1) {
                    this.stepState -= 1
                }
            } else if (this.isValid()) {
                if (this.stepState === this.selected.length + 1) {
                    this.emitSubForm()
                    this.$emit('done-event')
                } else {
                    this.stepState += 1
                }
            }
        },
        emitSubForm() {
            for (const key in this.chauffageChoice) {
                if (this.chauffageChoice[key].step !== -1)
                    this.$store.commit(
                        'reviFormState/setChauffageData',
                        this.chauffageChoice[key].formData
                    )
            }
        }
    }
}
</script>
