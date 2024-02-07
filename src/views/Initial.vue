<template>
    <ion-page>
        <div class="start" >
            <InitialSwipe />
            <div class="cover">
                <h1><span>Get.</span>Cooking</h1>
                <ion-text>
                    <p>We believe that food is more than just sustenance; it’s a journey of taste, culture, and memories</p>
                </ion-text>
                <!-- <ion-button shape="round" >
                    <span>Continue</span>
                    <Icon icon="solar:map-arrow-right-bold-duotone" color="#ffffff" />
                </ion-button> -->
                <ion-button shape="round" >
                    <span>Authenticate</span>
                    <Icon icon="uim:google" color="#ffffff" />
                </ion-button>
            </div>
        </div>
    </ion-page>
</template>

<script setup>

import { IonPage, IonText, IonButton } from "@ionic/vue"
import InitialSwipe from "../components/InitialSwipe.vue"
import { Icon } from "@iconify/vue";

</script>

<style scoped>

.start {
    height: 100%;
    position: relative;
}
.cover {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    color: #ffffff;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    z-index: 5;
    display: flex;
    flex-direction: column;
    /* padding: 5%; */
    padding: 4rem 5% 4rem 5%;
}
h1 {
    font-size: 3rem;
    line-height: 1rem;
}
h1 span {
    color: var(--primary-lighter);
    font-weight: 700;
}
ion-text {
    margin-bottom: 3rem;
    font-size: 1.2rem;
}
ion-button {
    font-size: 2.5rem;
    --padding-top: 1rem;
    --padding-bottom: 1rem;
    --padding-top: 1rem;
    --padding-top: 1rem;
    --background: var(--primary);
}
ion-button span {
    margin-right: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
}

</style>