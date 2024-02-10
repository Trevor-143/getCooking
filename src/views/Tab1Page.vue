<template>
  <ion-page>
    <ion-header class="ion-no-border" >
      <ion-toolbar>
        <div class="topHeader">
          <!-- <ion-title>Tab 1</ion-title> -->
          <ion-thumbnail v-if="userImage">
            <ion-img :src="userImage" :alt="userName" ></ion-img>
          </ion-thumbnail>
          <Icon v-else icon="solar:user-circle-bold-duotone" width="60" />
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="introText">
        <ion-text>
          <p>Hi {{ userName? userName : 'There' }}!</p>
          <h1>Explore, Discover, and <span>Get.</span>Cooking.</h1>
        </ion-text>
      </div>
      <HomeCard />
      <Categories />
      <HomeMainIng />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonThumbnail, IonImg, IonText, IonContent } from '@ionic/vue';
import { Icon } from '@iconify/vue';
import { useCookie } from "vue-cookie-next"
import HomeCard from '@/components/HomeCard.vue';
import Categories from '@/components/Categories.vue';
import HomeMainIng from '@/components/HomeMainIng.vue';


const { getCookie } = useCookie()

const userImage = getCookie('userImage')
const userName = getCookie('userName')
// console.log(userImage)

</script>


<style scoped>
ion-toolbar {
  --background: rgba(0, 0, 0, 0);
}
.topHeader {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
}
ion-thumbnail {
  border: 3px solid var(--primary-lighter);
  border-radius: 50%;
}
ion-img {
  border-radius: 50%;
}
.introText {
  margin: 1rem;
}
.introText h1 {
  font-size: 2rem;
  font-weight: 700;
  line-height: 3rem;
  margin-top: -0.5rem;
}
.introText h1 span {
  color: var(--primary);
}
@media (prefers-color-scheme: dark) {
  ion-content {
    --background: var(--bBack);
  }
  .introText p {
    color: var(--lightText2);
  }
  .introText h1 {
    color: var(--lightText);
  }
}

</style>