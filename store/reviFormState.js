import * as tm from '~/store/TravauxModule'

export const state = () => ({
    housingId: null,
    travauxId: null,
    housingData: null,
    travauxChoice: null,
    travauxMeta: new tm.TravauxMeta(),
    chauffageData: null,
    chauffeEauData: null,
    ventilationData: null,
    isolationData: null,
    financialData: null,
    personalData: null,
    reportData: null,
    navigationTree: {
        item: {
            page: '/',
            next: '/'
        }
    }
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
    setTravauxChoice(state, travaux) {
        state.travauxChoice = travaux
    },
    setNavigationTree(state, navTree) {
        state.navigationTree = navTree
    },
    setChauffageData(state, chauffage) {
        state.chauffageData = chauffage
    },
    setChauffeEauData(state, chauffeEau) {
        const cost = tm.computeChauffeEauCost(chauffeEau)
        const travaux = new tm.Travaux(
            chauffeEau.chauffeEauSubType,
            cost,
            chauffeEau,
            tm.computeChauffeEauAideGroupe
        )
        tm.addTravaux(state.travauxMeta.chauffeEau, travaux)
    },
    setIsolationData(state, isolation) {
        state.isolationData = isolation
    },
    setVentilationData(state, ventilation) {
        const cost = tm.computeVentilationCost(ventilation)
        const travaux = new tm.Travaux(
            ventilation.ventilationType,
            cost,
            ventilation,
            tm.computeVentilationAideGroup
        )
        tm.addTravaux(state.travauxMeta.ventilation, travaux)
    },
    setFinancialData(state, financial) {
        state.financialData = financial
        tm.computeMetaAideGroup(
            state.travauxMeta,
            state.housingData,
            state.financialData
        )
        tm.computeMetaCost(state.travauxMeta)
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
    },
    computeNextStep: (state) => (step) => {
        const result = state.navigationTree[step]
        if (result === undefined) {
            return '/'
        }
        return result
    },
    getTravauxMeta(state) {
        return state.travauxMeta
    }
}
