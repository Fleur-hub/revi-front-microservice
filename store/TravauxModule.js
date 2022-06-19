export class TravauxMeta {
    title = 'Coût des travaux'
    cost
    aideGroup
    isolation = new TravauxGroup('Isolation')
    chauffage = new TravauxGroup('Chauffage')
    chauffeEau = new TravauxGroup('Chauffe-eau')
    ventilation = new TravauxGroup('Ventilation')
}

export function computeMetaAideGroup(travauxMeta, housingData, financialData) {
    const list = []
    list.push(...travauxMeta.isolation.travauxList)
    list.push(...travauxMeta.chauffage.travauxList)
    list.push(...travauxMeta.chauffeEau.travauxList)
    list.push(...travauxMeta.ventilation.travauxList)
    for (let i = 0; i < list.length; ++i) {
        computeAideGroup(list[i], housingData, financialData)
    }
    travauxMeta.aideGroup = sumAideGroupFromTravaux(...list)
    return travauxMeta.aideGroup
}

export function computeMetaCost(travauxMeta) {
    const isolationCost = sumCost(travauxMeta.isolation)
    const chauffageCost = sumCost(travauxMeta.chauffage)
    const chauffeEauCost = sumCost(travauxMeta.chauffeEau)
    const ventilationCost = sumCost(travauxMeta.ventilation)

    const min =
        isolationCost.minCost +
        chauffageCost.minCost +
        chauffeEauCost.minCost +
        ventilationCost.minCost
    const max =
        isolationCost.maxCost +
        chauffageCost.maxCost +
        chauffeEauCost.maxCost +
        ventilationCost.maxCost

    travauxMeta.cost = new Cost(min, max)

    return travauxMeta.cost
}

export function hasIsolation(travauxMeta) {
    return travauxMeta.isolation.travauxList.length !== 0
}

export function hasChauffage(travauxMeta) {
    return travauxMeta.chauffage.travauxList.length !== 0
}

export function hasChauffeEau(travauxMeta) {
    return travauxMeta.chauffeEau.travauxList.length !== 0
}

export function hasVentilation(travauxMeta) {
    return travauxMeta.ventilation.travauxList.length !== 0
}

export function addIsolation(travauxMeta, travaux) {
    addTravaux(travauxMeta.isolation, travaux)
}

export function addChauffage(travauxMeta, travaux) {
    addTravaux(travauxMeta.chauffage, travaux)
}

export function addChauffeEau(travauxMeta, travaux) {
    addTravaux(travauxMeta.chauffeEau, travaux)
}

export function addVentilation(travauxMeta, travaux) {
    addTravaux(travauxMeta.ventilation, travaux)
}

export class TravauxGroup {
    title
    travauxList = []
    constructor(title) {
        this.title = title
    }
}

export function addTravaux(travauxGroup, travaux) {
    travauxGroup.travauxList.push(travaux)
}

export function sumCost(travauxGroup) {
    let min = 0
    let max = 0
    for (let i = 0; i < travauxGroup.travauxList.length; ++i) {
        min += travauxGroup.travauxList[i].cost.minCost
        max += travauxGroup.travauxList[i].cost.maxCost
    }
    return new Cost(min, max)
}

export function isEmpty(travauxGroup) {
    return travauxGroup.travauxList.length === 0
}

export class Travaux {
    title
    data
    cost
    aideGroup
    aideGroupFunction
    constructor(title, cost, data, aideGroupFunction) {
        this.title = title
        this.cost = cost
        this.data = data
        this.aideGroupFunction = aideGroupFunction
    }
}

export function getAideGroup(travaux) {
    return travaux.aideGroup
}

export function computeAideGroup(travaux, housingData, financialData) {
    travaux.aideGroup = travaux.aideGroupFunction(
        housingData,
        financialData,
        travaux
    )
}

export class AideGroup {
    title = ''
    renov = createRenov(0)
    serenite = createSerenite(0)
    zero = createZero(0)
    pouce = createPouce(0)
    total

    constructor(renov, serenite, zero, pouce) {
        this.renov = renov
        this.serenite = serenite
        this.zero = zero
        this.pouce = pouce
        this.total =
            Math.max(renov.amount, serenite.amount) + zero.amount + pouce.amount
        computeTitle(this)
    }
}

export function computeTitle(aideGroup) {
    const titleList = []
    if (aideGroup.renov.amount !== 0) {
        titleList.push(aideGroup.renov.title)
    }
    if (aideGroup.serenite.amount !== 0) {
        titleList.push(aideGroup.serenite.title)
    }
    if (aideGroup.zero.amount !== 0) {
        titleList.push(aideGroup.zero.title)
    }
    if (aideGroup.pouce.amount !== 0) {
        titleList.push(aideGroup.pouce.title)
    }
    aideGroup.title = titleList.join('/')
}

export function getNonEmpty(aideGroup) {
    const result = {}
    if (aideGroup.renov.amount !== 0) {
        result.renov = aideGroup.renov
    }
    if (aideGroup.renov.amount !== 0) {
        result.renov = aideGroup.renov
    }
    if (aideGroup.renov.amount !== 0) {
        result.renov = aideGroup.renov
    }
    if (aideGroup.renov.amount !== 0) {
        result.renov = aideGroup.renov
    }
    return result
}

export function sumAideGroupFromTravaux(...travauxList) {
    let renovAmount = 0
    let sereniteAmount = 0
    let zeroAmount = 0
    let pouceAmount = 0

    for (let i = 0; i < travauxList.length; ++i) {
        renovAmount += travauxList[i].aideGroup.renov.amount
        sereniteAmount += travauxList[i].aideGroup.serenite.amount
        zeroAmount += travauxList[i].aideGroup.zero.amount
        pouceAmount += travauxList[i].aideGroup.pouce.amount
    }
    const renov = createRenov(renovAmount)
    const serenite = createSerenite(sereniteAmount)
    const zero = createZero(zeroAmount)
    const pouce = createPouce(pouceAmount)
    return new AideGroup(renov, serenite, zero, pouce)
}

export class Aide {
    constructor(amount, title) {
        this.title = title
        this.amount = amount
    }
}

export function createRenov(amount) {
    return new Aide(amount, 'Ma Prime Renov')
}

export function createSerenite(amount) {
    return new Aide(amount, 'Ma Prime Renov Sérénité')
}

export function createZero(amount) {
    return new Aide(amount, 'Eco-ptêt à taux zero')
}

export function createPouce(amount) {
    return new Aide(amount, 'Coup de pouce énergie')
}

export class Cost {
    constructor(minCost, maxCost) {
        this.minCost = minCost
        this.maxCost = maxCost
    }
}

const fiscalType = {
    TRES_ELEVES: 40,
    INTERMEDIAIRES: 60,
    MODESTE: 75,
    TRES_MODESTE: 90
}

const matriceFiscal = [
    [21123, 31003, 37232, 43472, 49736, 6253],
    [25714, 37739, 45326, 52925, 60546, 7613],
    [38184, 56130, 67585, 79041, 90496, 11455]
]

export function computeFiscalFactor(financialData) {
    let matriceIndex = financialData.numberPeopleLiving - 1
    if (financialData.numberPeopleLiving > 5) {
        matriceIndex = 4
    }
    const personnesSup = financialData.numberPeopleLiving - (matriceIndex + 1)
    const tresModeste =
        matriceFiscal[0][matriceIndex] + matriceFiscal[0][5] * personnesSup
    const modeste =
        matriceFiscal[1][matriceIndex] + matriceFiscal[1][5] * personnesSup
    const intermediaire =
        matriceFiscal[2][matriceIndex] + matriceFiscal[2][5] * personnesSup

    if (financialData.taxRevenue < tresModeste) {
        return fiscalType.TRES_MODESTE
    }
    if (financialData.taxRevenue < modeste) {
        return fiscalType.MODESTE
    }
    if (financialData.taxRevenue < intermediaire) {
        return fiscalType.INTERMEDIAIRES
    }
    return fiscalType.TRES_ELEVES
}

export function computeRenov(housingData, cost, financialData) {
    if (housingData.dateConstruction !== 'PLUS_15_ANS') {
        return createRenov(0)
    }
    const factor = computeFiscalFactor(financialData)
    return createRenov((cost.minCost * factor) / 100)
}

export function computeRenovSerenite(housingData, cost, financialData) {
    if (housingData.dateConstruction !== 'PLUS_15_ANS') {
        return createSerenite(0)
    }
    const factor = computeFiscalFactor(financialData)
    const aide = (cost.minCost * factor) / 100
    if (factor === fiscalType.MODESTE || factor === fiscalType.TRES_MODESTE) {
        return createSerenite(Math.min(aide, 10500))
    }
    return createSerenite(0)
}

// VENTILATION

export function computeVentilationAideGroup(
    housingData,
    financialData,
    ventilation
) {
    const serenite = computeRenovSerenite(
        housingData,
        ventilation.cost,
        financialData
    )
    const renov = computeRenov(housingData, ventilation.cost, financialData)
    return new AideGroup(renov, serenite, createZero(0), createPouce(0))
}

export function computeVentilationCost(ventilationData) {
    const minCost =
        ventilationData.ventilationSimpleNumber * 600 +
        ventilationData.ventilationDoubleNumber * 3000
    const maxCost =
        ventilationData.ventilationSimpleNumber * 3000 +
        ventilationData.ventilationDoubleNumber * 8000
    return new Cost(minCost, maxCost)
}

// CHAUFFE-EAU

export function computeChauffeEauCost(chauffeEauData) {
    switch (chauffeEauData.chauffeEauSubType) {
        case 'Monobloc': {
            return new Cost(1400, 4000)
        }
        case 'Thermosiphon': {
            return new Cost(2000, 8000)
        }
        case 'Circulation forcée': {
            return new Cost(2500, 5500)
        }
        case 'Système PVT': {
            return new Cost(7000, 9000)
        }
        case 'Capteurs solaires': {
            return new Cost(1500, 3500)
        }
        case 'Split': {
            return new Cost(1500, 3000)
        }
        case 'Air ambiant': {
            return new Cost(2000, 4000)
        }
        case 'Air extrait': {
            return new Cost(3000, 4500)
        }
        case 'Air extérieur': {
            return new Cost(2500, 3500)
        }
        default: {
            return new Cost(0, 0)
        }
    }
}

export function computeChauffeEauAideGroupe(
    housingData,
    financialData,
    chauffeEau
) {
    const excludeSubType = [
        'Monobloc',
        'Circulation forcée',
        'Thermosiphon',
        'Système PVT'
    ]
    const serenite = computeRenovSerenite(
        housingData,
        chauffeEau.cost,
        financialData
    )
    let renov
    if (!excludeSubType.includes(chauffeEau.title)) {
        renov = computeRenov(housingData, chauffeEau.cost, financialData)
    } else {
        renov = createRenov(0)
    }
    return new AideGroup(renov, serenite, createZero(0), createPouce(0))
}

// CHAUFFAGE
