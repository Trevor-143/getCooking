<template>
    <ion-page>
        <div class="start" >
            <InitialSwipe />
            <div class="cover">
                <h1><span>Get.</span>Cooking</h1>
                <ion-text>
                    <p>We believe that food is more than just sustenance; it’s a journey of taste, culture, and memories</p>
                </ion-text>
                <ion-button shape="round" v-if="userId" >
                    <span>Continue</span>
                    <Icon icon="solar:map-arrow-right-bold-duotone" color="#ffffff" />
                </ion-button>
                <ion-button shape="round" @click="signInUserWithGoogle" v-else >
                    <span>Authenticate</span>
                    <Icon icon="uim:google" color="#ffffff" />
                </ion-button>
            </div>
        </div>
    </ion-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { IonPage, IonText, IonButton, useIonRouter } from "@ionic/vue"
import InitialSwipe from "../components/InitialSwipe.vue"
import { Icon } from "@iconify/vue";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { useCookie } from "vue-cookie-next";

const { setCookie, getCookie } = useCookie()
const userId = ref('')
const router = useIonRouter()

onMounted(() => {
    GoogleAuth.initialize({
        clientId: '220039720820-s1r7rc8rh81dt99tv62qdiomoo51k2s7.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
    });
    userId.value = getCookie('userId')
    if(userId.value) {
        router.push('/tabs/tab1')
    }
})

const signInUserWithGoogle = async () => {
    try {
        const userData = await GoogleAuth.signIn()
        console.log(userData)
        setCookie('userId', userData.id)
        setCookie('userName', userData.name)
        setCookie('userEmail', userData.email)
        setCookie('userImage', userData.imageUrl)
        router.push('/tabs/tab1')
    } catch (error) {
        console.log(error)
    }
}

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