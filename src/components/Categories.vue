<template>
    <div class="categoryList" >
        <ion-text><h3>Categories</h3></ion-text>
        <div class="allCats">
            <div v-for="cat in categories" :key="cat.idCategory" >
                <ion-nav-link :router-link="`/SingleCat/${cat.strCategory}`" >
                    <div class="oneCat" >
                        <!-- <Icon :icon="cat.icon" width="80" /> -->
                        <ion-thumbnail>
                            <ion-img :src="cat.strCategoryThumb" :alt="cat.strCategory" ></ion-img>
                        </ion-thumbnail>
                        <ion-text><p>{{ cat.strCategory.length > 5 ? cat.strCategory.substring(0, 10) + "..." : cat.strCategory }} </p></ion-text>
                    </div>
                </ion-nav-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { IonText, IonThumbnail, IonImg, IonNavLink } from '@ionic/vue';
import { Categories } from "../data/categories"
import { Icon } from "@iconify/vue"
import { onMounted, ref } from 'vue';

// let limitedText = text.length > 5 ? text.substring(0, 5) + "..." : text;

const categories = ref([])

// console.log(Categories)
const getAllCats = async () => {
    try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        const data = await res.json()
        console.log(data)
        categories.value = data.categories
    } catch (error) {
        console.log(error.message)
    }
}

onMounted(() => {
    getAllCats()
})

</script>

<style scoped>

.categoryList {
    padding: 1.5rem;
}

h3 {
    font-weight: 600;
    color: var(--primary);
}
.allCats {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    margin: 0 -1rem;
    padding-left: 1rem;
}
.allCats::-webkit-scrollbar {
    display: none;
}
.oneCat {
    background-color: #eeeeee;
    margin-right: 1rem;
    width: fit-content;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    /* box-shadow: 0px 10px 26px -12px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 10px 26px -12px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 10px 26px -12px rgba(0,0,0,0.75); */
}
ion-thumbnail {
    --size: 100px;
    --border-radius: 50%;
}
.oneCat img {
    min-width: 80px;
    max-width: 80px;
    object-fit: cover;
    opacity: 0.8;
    /* border: 3px solid #ffffff; */
}
/* .oneCat svg {
    min-width: 80px;
    max-width: 80px;
} */
.oneCat p {
    font-weight: 500;
}
@media (prefers-color-scheme: dark) {
    .oneCat {
        background-color: #000000;
        color: var(--lightText);
    }
    .oneCat img {
        border: 3px solid #3b3b3b;
        background-color: #eeeeee;
    }
}

</style>