<template>
    <div class="byIngredient" v-if="mainIngredient" >
        <ion-text>
            <h3>Care for some {{ mainIngredient }}?</h3>
        </ion-text>
        <div class="mealIngeList">
            <ion-nav-link v-for="meal in allMeals.meals" :key="meal.idMeal" >
                <div class="oneMeal">
                    <ion-thumbnail > <ion-img :src="meal.strMealThumb" :alt="meal.strMeal" ></ion-img> </ion-thumbnail>
                    <ion-text><p>{{ meal.strMeal }}</p></ion-text>
                </div>
            </ion-nav-link>
        </div>
    </div>
</template>

<script setup>
import { IonText, IonThumbnail, IonImg, IonNavLink } from '@ionic/vue';
import { onMounted, onBeforeMount, ref } from "vue"
import { Ingredients } from "../data/mainIngre"

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
        allMeals.value = data
        console.log(allMeals.value)
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
    padding: 1rem;
}
h3 {
    font-weight: 700;
    color: var(--primary);
}
.oneMeal {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    padding: 1rem;
    background-color: #eeeeee;
    border-radius: 1rem;
}
ion-thumbnail {
    --size: 70px;
    min-width: 70px;
    margin-right: 1rem;
}
.oneMeal ion-img {
    border-radius: 50%;
}
</style>