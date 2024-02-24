<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <div class="tabHolder">
          <ion-tab-button tab="tab1" href="/tabs/tab1" @click="updateSelectedTab('tab1')" >
            <div class="tabContainer" :class=" selectedTab === 'tab1' ? 'activeTab':''" >
              <Icon icon="solar:home-angle-bold-duotone" width="35" />
              <ion-label v-show="selectedTab === 'tab1'">Home</ion-label>
            </div>
          </ion-tab-button>

          <ion-tab-button tab="tab2" href="/tabs/tab2" @click="updateSelectedTab('tab2')" >
            <div class="tabContainer" :class=" selectedTab === 'tab2' ? 'activeTab':''" >
              <Icon icon="solar:minimalistic-magnifer-linear" width="35" />
              <ion-label v-show="selectedTab === 'tab2'">Search</ion-label>
            </div>
          </ion-tab-button>

          <ion-tab-button tab="tab3" href="/tabs/tab3" @click="updateSelectedTab('tab3')" >
            <div class="tabContainer" :class=" selectedTab === 'tab3' ? 'activeTab':''" >
              <Icon icon="solar:checklist-minimalistic-bold-duotone" width="35" />
              <ion-label v-show="selectedTab === 'tab3'">Categories</ion-label>
            </div>
          </ion-tab-button>
          
          <ion-tab-button tab="tab4" href="/tabs/tab4" @click="updateSelectedTab('tab4')" >
            <div class="tabContainer" :class=" selectedTab === 'tab4' ? 'activeTab':''" >
              <Icon icon="solar:chat-round-like-bold-duotone" width="35" />
              <ion-label v-show="selectedTab === 'tab4'">Favorites</ion-label>
            </div>
          </ion-tab-button>
        </div>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet } from '@ionic/vue';
import { Icon } from "@iconify/vue";

const selectedTab = ref('tab1');

// Update selectedTab when tab is changed
const updateSelectedTab = (tab) => {
  selectedTab.value = tab;
};

</script>

<style scoped>

.tabContainer {
  display: flex;
  align-items: center;
}
.tabContainer svg {
  margin-right: 0.5rem;
}
ion-tab-bar {
  --background: rgba(0, 0, 0, 0);
  border: none;
  padding: 1rem 0.8rem;
  /* padding-bottom: -2rem; */
}
.tabHolder {
  background-color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #eee;
  padding: 1rem;
  border-radius: 3rem;
  /* margin: 1rem; */
}
.activeTab {
  color: var(--primary);
}
@media (prefers-color-scheme: dark) {
  .tabHolder {
    background-color: black;
    border: 3px solid #4b4b4b;
  }
  .activeTab {
    color: var(--primary-lighter);
  }
}

</style>
