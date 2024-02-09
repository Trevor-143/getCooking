<template>
  <ion-page>
    <ion-header class="ion-no-border" >
      <ion-toolbar>
        <ion-button slot="start" fill="clear" ><Icon icon="solar:rewind-back-bold-duotone" width="35" /> </ion-button>
        <ion-title>Categories</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <CategoriesList />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
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
</style>