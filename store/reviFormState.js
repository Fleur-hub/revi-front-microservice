export const state = () => ({
    formStep: '',
    housingState: {
        adresse: '',
        typeLogement: '',
        copropriete: '',
        superficie: '',
        dateConstruction: '',
        budget: '',
        typeTravaux: {}
    }
})

export const mutations = {
    setStep(state, step) {
        state.formStep = step
    }
}
