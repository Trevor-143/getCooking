<template>
    <div>
        <div class="catPageList" v-if="allCats.length > 0" >
            <ion-nav-link v-for="cat in allCats" :key="cat.idCategory" :router-link="`/SingleCat/${cat.strCategory}`" >
                <div class="oneCat">
                    <div class="img">                    
                        <ion-img :src="cat.strCategoryThumb" :alt="cat.strCategory" ></ion-img>
                    </div>
                    <ion-text>
                        <h3>{{ cat.strCategory }}</h3>
                        <p>{{ cat.strCategoryDescription }}</p>
                    </ion-text>
                </div>
            </ion-nav-link>
        </div>
        <wait v-else />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { IonText, IonImg, IonNavLink } from "@ionic/vue";
import Wait from "./Wait.vue";

const allCats = ref([])

const getAllCats = async () => {
    try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        const data = await res.json()
        // console.log(data)
        allCats.value = data.categories
    } catch (error) {
        console.log(error.message)
    }
}

onMounted(() => {
    getAllCats()
})


</script>

<style scoped>

.catPageList {
    margin: 1.5rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}
.oneCat {
    background-color: #eeeeee;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    text-align: center;
}
.img {
    border-radius: 1rem;
    overflow: hidden;
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 0.5rem; */
}
ion-img {
    min-height: 100%;
    width: 100%;
    /* margin: -1rem; */
    /* display: block; */
}
ion-text h3 {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    font-size: 1rem;
    color: var(--primary);
    font-weight: 600;
}
ion-text p {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    font-size: 0.8rem;
}

@media (prefers-color-scheme: dark) {
    .oneCat {
        background-color: black;
        color: var(--lightText2);
    }
    .oneCat h3 {
        color: #ffffff;
    }
}

</style>