export const state = () => ({
    formStep: '',
    housingId: null,
    page: {
        housing: 'revi',
        chauffage: '/travaux/chauffage',
        chauffeEau: '/travaux/chauffeEau',
        isolation: 'travaux/isolation',
        ventilation: 'travaux/ventilation',
        financialInformation: '/financialInformation',
        personalInformation: '/personalInformation',
        report: '/report'
    },
    choosedTravaux: {
        chauffage: false,
        chauffeEau: false,
        isolation: false,
        ventilation: false
    }
})

export const mutations = {
    setStep(state, step) {
        state.formStep = step
    },
    buildWorkflow(state, payload) {
        if (payload.chauffage) {
            state.choosedTravaux.chauffage = true
        }
        if (payload.chauffeEau) {
            state.choosedTravaux.chauffeEau = true
        }
        if (payload.isolation) {
            state.choosedTravaux.isolation = true
        }
        if (payload.ventilation) {
            state.choosedTravaux.ventilation = true
        }
    }
}
