<template>
    <ion-page>
        <ion-header class="ion-no-border" >
        <ion-toolbar>
            <ion-back-button slot="start" fill="clear" :icon="arrowUndo" ></ion-back-button>
            <ion-title>{{ catId }}</ion-title>
        </ion-toolbar>
        </ion-header>
      <ion-content fullscreen="true" >
        <div class="content" v-if="catMeals.length > 0" >
          <div class="searchedList">
            <ion-nav-link v-for="meal in catMeals" :key="meal.idMeal" :router-link="`/SingleMeal/${meal.idMeal}`" >
              <div class="oneSearched">
                <img :src="meal.strMealThumb" :alt="meal.strMeal">
                <div class="cover">
                  <ion-text>
                    <h3>{{ meal.strMeal }}</h3>
                    
                    <p>{{ meal.strArea }}</p>
                  </ion-text>
                </div>
              </div>
            </ion-nav-link>
          </div>
        </div>
        <wait v-else />
      </ion-content>
    </ion-page>
</template>

<script setup>
import { IonHeader, IonPage, IonIcon, IonText, IonNavLink, IonTitle, IonBackButton, IonToolbar, IonButton, IonContent, IonImg } from '@ionic/vue';
import { arrowUndo } from "ionicons/icons"
import { useRoute } from 'vue-router';
import { ref, onBeforeMount } from 'vue';
import { Icon } from '@iconify/vue';
import Plate from "/plate.webp"
import Wait from '@/components/Wait.vue';

const { catId } = useRoute().params

const catMeals = ref([])

const getMealsByCat = async () => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`)
        const data = await res.json()
        // console.log(data.meals)
        catMeals.value = data.meals
    } catch (error) {
        console.log(error.message)
    }
}
onBeforeMount(() => {
    getMealsByCat()
})

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
.whenSearched {
  margin-bottom: 1rem;
  font-weight: 700;
  color: var(--primary);
}
.content {
  padding: 0 1.5rem;
  padding-bottom: 2rem;
}
.searchedList {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}
.oneSearched {
  background-color: #eeeeee;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
}
.cover {
  /* padding: 0.5rem; */
  text-align: center;
}
.oneSearched img {
  max-width: 80px;
  border-radius: 50%;
}
.cover h3 {
  color: var(--primary);
  font-weight: 600;
  margin-bottom: -1rem;
  display: -webkit-box;
  overflow: hidden;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 1rem;
}
.noMeals {
  margin: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
}
.noMeals img {
  border-radius: 1rem;
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
  .oneSearched {
    background-color: black;
  }
  .oneSearched h5 {
    color: #eeeeee;
  }
  .oneSearched p {
    color: #fff;
  }
}

</style>