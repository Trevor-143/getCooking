<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <!-- <ion-icon aria-hidden="true" :icon="triangle" /> -->
          <Icon icon="solar:home-angle-bold-duotone" width="35" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <!-- <ion-icon aria-hidden="true" :icon="ellipse" /> -->
          <Icon icon="solar:minimalistic-magnifer-linear" width="35" />
          <ion-label>Tab 2</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <!-- <ion-icon aria-hidden="true" :icon="square" /> -->
          <Icon icon="solar:checklist-minimalistic-bold-duotone" width="35" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <!-- <ion-icon aria-hidden="true" :icon="square" /> -->
          <Icon icon="solar:chat-round-like-bold-duotone" width="35" />
          <ion-label>Tab 3</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
import { Icon } from "@iconify/vue"

</script>
