<template>
    <div class="noInternetBanner">
        <ion-icon :icon="warning" ></ion-icon>
        <ion-text>Lost Connection</ion-text>
    </div>
</template>

<script setup>
import { IonPage, IonIcon, IonText } from "@ionic/vue"
import { warning } from "ionicons/icons"

</script>

<style scoped>

.noInternetBanner {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 99;
    margin: 1rem auto;
    margin-bottom: 6rem;
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 2rem;
    background-color: #940000;
    color: #ffffff;
    width: fit-content;
    box-shadow: 0px 0px 92px 40px rgba(255,0,0,0.75);
    -webkit-box-shadow: 0px 0px 92px 40px rgba(255,0,0,0.75);
    -moz-box-shadow: 0px 0px 92px 40px rgba(255,0,0,0.75);
}
ion-icon {
    margin-right: 0.5rem;
    font-size: 1.5rem;
}

</style>