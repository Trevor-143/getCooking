<template>
  <ion-app>
    <NoInternet v-if="!netStat" />
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { Network } from "@capacitor/network"
import NoInternet from "@/components/NoInternet.vue"
import { onMounted, ref } from 'vue';
import { StatusBar, Style } from "@capacitor/status-bar"

StatusBar.setBackgroundColor({ color: '#7a4406' }); // Dark background color
StatusBar.setStyle({ style: Style.Dark });

const setStatusBarStyleDark = async () => {
  await StatusBar.setStyle({ style: Style.Dark });
  StatusBar.setBackgroundColor({ color: '#000000' }); // Dark background color
};

const setStatusBarStyleLight = async () => {
  await StatusBar.setStyle({ style: Style.Light });
  StatusBar.setBackgroundColor({ color: '#ffffff' }); // Dark background color
};

const theme = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
const netStat = ref(null)

Network.addListener('networkStatusChange', status => {
  netStat.value = status.connected
});

const logCurrentNetworkStatus = async () => {
  const status = await Network.getStatus();
  netStat.value = status.connected
};

onMounted(() => {
  if(theme.value) {
    setStatusBarStyleDark()
  } else {
    setStatusBarStyleLight()
  }
  logCurrentNetworkStatus()
})

</script>
