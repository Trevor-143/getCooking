<template>
  <ion-page>
    <ion-header class="ion-no-border" >
      <ion-toolbar class="searchTool" >
        <div class="form">
          <input type="text" placeholder="eg. chicken" v-model="searchQuery" @input="getSearchedMeals" >
          <ion-button slot="end" fill="clear" @click="getSearchedMeals" ><Icon icon="solar:minimalistic-magnifer-linear" width="35" /> </ion-button>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen="true" >
      <div class="content" v-if="allMeals" >
        <ion-text v-if="searchQuery" ><h3 class="whenSearched" >You searched for {{ searchQuery }}?</h3></ion-text>
        <div class="searchedList">
          <ion-nav-link v-for="meal in allMeals" :key="meal.idMeal" :router-link="`/SingleMeal/${meal.idMeal}`" >
            <div class="oneSearched">
              <ion-img :src="meal.strMealThumb" :alt="meal.strMeal" ></ion-img>
              <div class="cover">
                <ion-text>
                  <h3>{{ meal.strMeal }}</h3>
                  <h5>{{ meal.strCategory }} Category</h5>
                  <p>{{ meal.strArea }}</p>
                </ion-text>
              </div>
            </div>
          </ion-nav-link>
        </div>
      </div>
      <div class="noMeals" v-else >
        <img :src="Plate" alt="broken plate">
        <p>It seems we dont have any meals related to {{ searchQuery }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonHeader, IonPage, IonText, IonNavLink, IonToolbar, IonButton, IonContent, IonImg } from '@ionic/vue';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from "vue"
import Plate from "/plate.webp"

const searchQuery = ref('')
const allMeals = ref([])

const getInitialMeals = async () => {
  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
    const data = await res.json()
    allMeals.value = data.meals
    console.log(allMeals.value)
  } catch (error) {
    console.log(error.message)
  }
}

const getSearchedMeals = async () => {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery.value}`)
    const data = await res.json()
    allMeals.value = data.meals
    console.log(allMeals.value)
  } catch (error) {
    console.log(error.message)
  }
}

onMounted(() => {
  getInitialMeals()
}) 



</script>

<style scoped>

ion-header {
  padding: 1rem;
}
.searchTool {
  --background: rgba(0, 0, 0, 0);
  padding-bottom: 0.5rem;
  /* margin: 0 0.5rem; */
  /* margin-right: 1rem; */

}
svg {
  color: var(--primary);
  margin: -1rem;
}
.whenSearched {
  margin-bottom: 1rem;
  font-weight: 700;
  color: var(--primary);
}
.content {
  padding: 0 1rem;
}
.form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eeeeee;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  margin-top: 0.5rem;
  border: 3px solid #ffffff;
}
.form input {
  max-width: 500px;
  width: 100%;
  border: none;
  outline: none;
  background: none;
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
}
.cover {
  padding: 0.5rem;
}
.cover h3 {
  color: var(--primary);
  font-weight: 700;
  margin-bottom: -1rem;
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
  .form {
    background-color: #000000;
    border: 3px solid #2c2c2c;
  }
  ion-content {
    --background: var(--bBack);
  }
  .oneSearched {
    background-color: black;
  }
  .cover {
    color: var(--lightText);
  }
  .cover p {
    color: var(--lightText2);
  }
}

</style>