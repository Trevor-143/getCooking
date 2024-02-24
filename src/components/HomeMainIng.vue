<template>
    <div class="byIngredient" v-if="mainIngredient" >
        <ion-text>
            <h3>Care for some {{ mainIngredient }}?</h3>
        </ion-text>
        <div class="mealIngeList" v-if="allMeals.length > 0" >
            <ion-nav-link v-for="meal in allMeals" :key="meal.idMeal" :router-link="`/SingleMeal/${meal.idMeal}`" >
                <div class="oneMeal">
                    <ion-thumbnail > <ion-img :src="meal.strMealThumb" :alt="meal.strMeal" ></ion-img> </ion-thumbnail>
                    <div class="cover">
                        <ion-text><p>{{ meal.strMeal }}</p></ion-text>
                    </div>
                </div>
            </ion-nav-link>
        </div>
        <wait v-else />
    </div>
</template>

<script setup>
import { IonText, IonThumbnail, IonImg, IonNavLink } from '@ionic/vue';
import { onMounted, onBeforeMount, ref } from "vue"
import { Ingredients } from "../data/mainIngre"
import Wait from './Wait.vue';

const mainIngredient = ref('')
const allMeals = ref([])

const getRandomIngre = () => {
    const ranIngre = Math.floor(Math.random() * Ingredients.length)
    mainIngredient.value = Ingredients[ranIngre]
}

const getMainIngredientMeals = async () => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient.value}`)
        const data = await res.json()
        // console.log(data)
        allMeals.value = data.meals
        // console.log(allMeals.value)
    } catch (error) {
        console.log(error.message)
    }
}

onBeforeMount(() => {
    getRandomIngre()
})

onMounted(() => {
    getMainIngredientMeals()
})

</script>

<style scoped>

ion-header {
    position: relative;
}
.byIngredient {
    padding: 1.5rem;
    padding-top: 0rem;
    /* padding-bottom: rem; */
}
h3 {
    font-weight: 700;
    color: var(--primary);
    /* font-size: 1rem; */
}
.mealIngeList {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}
.oneMeal {
    display: flex;
    align-items: center;
    /* margin: 1rem 0; */
    padding: 1rem;
    background-color: #eeeeee;
    border-radius: 1rem;
    overflow: hidden;
    /* position: relative; */
    /* box-shadow: 0px 10px 26px -12px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 10px 26px -12px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 10px 26px -12px rgba(0,0,0,0.75); */
}
ion-thumbnail {
    /* --size: 100%; */
    min-width: 70px;
    height: 70px;
    /* border-radius: 50%; */
    margin-right: 1rem;
}
.oneMeal ion-img {
    border-radius: 50%;
}
.cover {
    /* position: absolute; */
    /* top: 0; */
    /* bottom: 0;
    left: 0;
    right: 0; */
    /* background-color: #ffffff; */
    color: #000000;
    height: fit-content;
}
.oneMeal ion-text p {
    /* padding: 0.5rem 1rem; */
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* margin-bottom: -0.1rem; */
}
</style>