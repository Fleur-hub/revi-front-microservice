export const state = () => ({
    housingId: null,
    travauxId: null,
    housingData: null,
    travauxData: null,
    chauffageData: null,
    chauffeEauData: null,
    ventilationData: null,
    isolationData: null,
    financialData: null,
    personalData: null,
    reportData: null
})

export const mutations = {
    setHousingId(state, housingId) {
        state.housingId = housingId
    },
    setTravauxId(state, travauxId) {
        state.travauxId = travauxId
    },
    setHousingData(state, housing) {
        state.housingData = housing
    },
    setTravauxData(state, travaux) {
        state.travauxData = travaux
    },
    setChauffageData(state, chauffage) {
        state.chauffageData = chauffage
    },
    setChauffeEauData(state, chauffeEau) {
        state.chauffeEauData = chauffeEau
    },
    setIsolationData(state, isolation) {
        state.isolationData = isolation
    },
    setVentilationData(state, ventilation) {
        state.ventilationData = ventilation
    },
    setFinancialData(state, financial) {
        state.financialData = financial
    },
    setPersonalData(state, personal) {
        state.personalData = personal
    },
    setReportData(state, report) {
        state.reportData = report
    }
}

export const getters = {
    getHousingId(state) {
        return state.housingId
    },
    getTravauxId(state) {
        return state.travauxId
    }
}
