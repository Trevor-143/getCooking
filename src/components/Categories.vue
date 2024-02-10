<template>
    <div class="categoryList" >
        <ion-text><h3>Categories</h3></ion-text>
        <div class="allCats">
            <div v-for="(cat, index) in Categories" :key="index" >
                <ion-nav-link :router-link="`/SingleCat/${cat.strCategory}`" >
                    <div class="oneCat" >
                        <img :src="cat.icon" :alt="cat.strCategory">
                        <ion-text><p>{{ cat.strCategory }}</p></ion-text>
                    </div>
                </ion-nav-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { IonText, IonThumbnail, IonImg, IonNavLink } from '@ionic/vue';
import { Categories } from "../data/categories"

console.log(Categories)

</script>

<style scoped>

.categoryList {
    padding: 1rem;
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
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
}
.oneCat img {
    min-width: 50px;
    max-width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    opacity: 0.8;
    border: 3px solid #ffffff;
}
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