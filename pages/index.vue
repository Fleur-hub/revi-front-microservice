<!-- eslint-disable -->
<template>
    <v-app>
        <v-img class="v-overlay" src="/topIndexBackground.png" />
        <v-app-bar
            class="top-app-bar"
            color="grayScale10"
            absolute
            elevation="0"
        >
            <v-app-bar-title>
                <img
                    src="/reviLogo.svg"
                    alt="revi logo icon"
                    height="55"
                    width="55"
                />
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn class="top-text" text> Notre simulateur </v-btn>
            <v-btn class="top-text" text> Qu’est ce que la rénovation ? </v-btn>
            <v-btn class="top-text" text> A propos de nous </v-btn>
            <v-btn class="top-text" text> Nos partenaires </v-btn>
            <v-btn
                class="btn-style"
                color="primaryMain"
                style="margin-top: 0 !important"
            >
                Contactez nous
            </v-btn>
        </v-app-bar>
    </v-app>
</template>

<script>
export default {
    name: 'IndexPage',
    layout: 'empty'
}
</script>

<style lang="scss">
.top-app-bar {
    padding-top: 28px;
    display: flex;
    align-items: flex-start;
}

.btn-style {
    color: $grayScale10 !important;
}

.v-btn {
    text-transform: none;
}

.v-main {
    overflow: auto;
}

.v-main__wrap {
    transform: translateY(0) !important;
}

.top-text {
    color: #000 !important;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: bold;
    font-size: 14px !important;
    margin-top: 0 !important;
}
</style>
