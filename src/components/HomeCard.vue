<template>
    <ion-card>
        <div class="cardContainer">
            <img :src="mealData.strMealThumb" :alt="mealData.strMeal" >
            <ion-nav-link :router-link="`/SingleMeal/${mealData.idMeal}`" >
                <div class="cardCover">
                    <ion-card-header>
                        <ion-card-subtitle>{{ mealData.strArea }}</ion-card-subtitle>
                        <ion-card-title>{{ mealData.strMeal }}</ion-card-title>
                    </ion-card-header>
                    <!-- <ion-card-content>{{ mealData.strInstructions }}</ion-card-content> -->
                </div>
            </ion-nav-link>
        </div>
    </ion-card>
</template>

<script setup>
import { IonCard, IonCardHeader, IonCardSubtitle, IonNavLink, IonCardTitle } from '@ionic/vue';
import { onMounted, ref } from "vue"

const mealData = ref({})

const getRandomMeal = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        if (!response.ok) {
            throw new Error('Failed to fetch meal');
        }
        const data = await response.json();
        console.log(data.meals[0]);
        mealData.value = data.meals[0]
    } catch (error) {
        console.error('Error fetching meal:', error.message);
    }
}

onMounted(() => {
    getRandomMeal();
});


</script>

<style scoped>

ion-card {
    border-radius: 1.5rem;
    margin: 1rem;
}
img {
    height: 250px;
    width: 100%;
    object-fit: cover;
    display: block;
}
.cardContainer {
    position: relative;
}
.cardCover {
    position: absolute;
    /* top: 0; */
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: #d6d6d6;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    height: fit-content;
    padding: 1rem;
    padding-top: 2rem;
}
ion-card-subtitle {
    color: #eeeeee;
}
ion-card-title {
    color: #ffffff;
}

</style>