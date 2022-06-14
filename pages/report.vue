<template>
    <h1>WIP</h1>
</template>

<script>
export default {
    name: 'ReportPage',
    data: () => ({
        isolation: {
            item: {
                title: 'Comble perdues',
                minCost: 1000,
                maxCost: 3000,
                aides: 'Renov'
            }
        },
        chauffage: {
            item: {
                title: 'electrique',
                minCost: 1000,
                maxCost: 3000,
                aides: 'Renov'
            }
        },
        chauffeEau: {
            item: {
                title: 'Monobloc',
                minCost: 1000,
                maxCost: 3000,
                aides: 'Renov'
            }
        },
        ventilation: {
            item: {
                title: 'VMC-simple',
                minCost: 1000,
                maxCost: 3000,
                aides: 'Renov'
            }
        },
        aide: {
            total: 5000,
            renov: 1250,
            serenite: 1250,
            eco: 1250,
            pouce: 1250
        }
    })
}
</script>
