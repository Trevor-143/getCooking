<template>
    <ion-page>
        <div class="user" >
            <ion-thumbnail>
                <ion-img :src="userImage" :alt="userName" ></ion-img>
            </ion-thumbnail>
            <ion-text>
                <h1>Hi 👋 There</h1>
                <h3>{{ userName }}</h3>
                <p>{{ userEmail }}</p>
            </ion-text>
            <ion-button shape="round" >Sign out</ion-button>
        </div>
        <ion-content>
            
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonImg, IonText, IonButton, IonThumbnail, IonContent, } from '@ionic/vue';
import { useCookie } from 'vue-cookie-next';

const { getCookie, setCookie } = useCookie()

const userName = getCookie('userName')
const userEmail = getCookie('userEmail')
const userImage = getCookie('userImage')

</script>

<style scoped>

.user {
    padding: 1rem;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #eeeeee;
    border-radius: 1rem;
}
ion-thumbnail {
    --size: 100px;
}
ion-img {
    border-radius: 50%;
}
.user h1 {
    font-size: 3rem;
    color: var(--primary);
    font-weight: 700;
}
.user h3 {
    margin: 0;
    margin-bottom: -1rem;
}
ion-button {
    margin-top: 1rem;
    --background: var(--primary);
}

</style>