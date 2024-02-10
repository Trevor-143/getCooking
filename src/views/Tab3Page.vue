<template>
  <ion-page>
    <ion-header class="ion-no-border" >
      <ion-toolbar>
        <ion-back-button slot="start" fill="clear" > </ion-back-button>
        <ion-title>Categories</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <CategoriesList />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton } from '@ionic/vue';
import { Icon } from '@iconify/vue';
import CategoriesList from '@/components/CategoriesList.vue';

</script>

<style scoped>

ion-header {
  padding: 1rem 1.3rem;
}
ion-toolbar {
  padding: 0.5rem;
  --padding-top: 0.5rem;
  /* background-color: red; */
  border-radius: 3rem;
  border: 3px solid #eeeeee;
  /* align-items: center; */
}
ion-button {
  /* --background: none; */
  width: fit-content;
}
svg {
  color: var(--primary);
  margin: -1rem;
}

@media (prefers-color-scheme: dark) {
  ion-content {
    --background: var(--bBack);
  }
  ion-toolbar {
    --background: black;
    color: var(--lightText2);
    border: 3px solid #2e2e2e;
  }
  
}

</style>