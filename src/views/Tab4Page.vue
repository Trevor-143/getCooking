<template>
    <ion-page>
        <ion-content :fullscreen="true" >
        <div class="user" >
            <ion-thumbnail>
                <ion-img :src="userImage" :alt="userName" ></ion-img>
            </ion-thumbnail>
            <ion-text>
                <h1>Hi 👋 There</h1>
                <h3>{{ userName }}</h3>
                <p>{{ userEmail }}</p>
            </ion-text>
            <ion-button shape="round" @click="signOutUser" >Sign out</ion-button>
        </div>
            <div class="content" v-if="likedRecipes.length > 0" >
                <ion-text><h3 class="hfav" >Favorite Recipes</h3></ion-text>
                <div class="recipeList">
                    <ion-nav-link v-for="meal in likedRecipes" :key="meal.id" :router-link="`/SingleMeal/${meal.id}`" >
                        <div class="oneRecipe">
                            <ion-img :src="meal.image" :alt="meal.name" ></ion-img>
                            <div class="info">
                                <h3>{{ meal.name }}</h3>
                                <p> {{ meal.cat }} </p>
                                <h5>{{ meal.area }}</h5>
                            </div>
                        </div>
                    </ion-nav-link>
                </div>
            </div>
            <div class="noMeals" v-else >
                <img :src="Plate" alt="broken plate">
                <p>Seems you have not yet added any meals to your favorite list.s</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonImg, IonText, IonButton, IonThumbnail, IonContent, IonNavLink, useIonRouter } from '@ionic/vue';
import { useCookie } from 'vue-cookie-next';
import { onMounted, ref } from "vue"
import { DataStore, Authenticate } from "../firebase/config"
import { signOut } from 'firebase/auth';
import { doc, onSnapshot, getDoc,  } from "firebase/firestore"
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import Plate from "/plate.webp"

const { getCookie, setCookie } = useCookie()

const userId = getCookie('userId')
const userName = getCookie('userName')
const userEmail = getCookie('userEmail')
const userImage = getCookie('userImage')

const router = useIonRouter()

const likedRecipes = ref([])

// const userDocRef = doc(DataStore, 'getCookingUsers', userId, 'favRecipes', 'meals');

const getMobileLikes = async () => {
    // console.log(loggedInUserId.value)
    if(userId) {
        const docRef = doc(DataStore, 'getCookingUsers', userId, 'favRecipes', 'meals');
        const docSnap = await getDoc(docRef);
        processSnapshot(docSnap);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            processSnapshot(doc);
        });
    }
};

const processSnapshot = async (docSnap) => {
    if (docSnap.exists()) {
    const userFavMeals = docSnap.data().userLikedMeals;

        if (userFavMeals && Array.isArray(userFavMeals)) {
            const temporaryArray = [];
            for (const mealId of userFavMeals) {
                try {
                    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                    const data = await res.json()
                    // console.log(data.meals[0])
                    
                    temporaryArray.push({ 
                        id: data.meals[0].idMeal,
                        image: data.meals[0].strMealThumb, 
                        name: data.meals[0].strMeal, 
                        cat: data.meals[0].strCategory,
                        area: data.meals[0].strArea 
                    });
                } catch (error) {
                    console.log(error.message)
                }
            }
            likedRecipes.value = temporaryArray;
            // console.log(likedRecipes.value)
        } else {
            console.log('userFavMeals is not an array or is undefined');
        }
    } else {
        console.log('No such document!');
    }
};

onMounted(() => {
    GoogleAuth.initialize({
        clientId: '220039720820-s1r7rc8rh81dt99tv62qdiomoo51k2s7.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
    });
    getMobileLikes()
})

const signOutUser = async () => {
    try {
        await GoogleAuth.signOut()
        signOut(Authenticate).then(() => {
            setCookie('userId', '')
            setCookie('userName', '')
            setCookie('userEmail', '')
            setCookie('userImage', '')
            router.push('/views/initial')
        })
    } catch (error) {
        console.log(error.message)
    }
}

</script>

<style scoped>

.user {
    padding: 1rem;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #eeeeee;
    border-radius: 1rem;
}
ion-thumbnail {
    --size: 100px;
}
ion-img {
    border-radius: 50%;
}
.user h1 {
    font-size: 3rem;
    color: var(--primary);
    font-weight: 700;
}
.user h3 {
    margin: 0;
    margin-bottom: -1rem;
}
ion-button {
    margin-top: 1rem;
    --background: var(--primary);
}
.content {
    margin: 1rem;
}
.hfav {
    color: var(--primary);
    font-weight: 700;
    margin-top: 2rem;
}
.recipeList {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
}
.oneRecipe {
    background-color: #eeeeee;
    border-radius: 1rem;
    overflow: hidden;
    height: 100%;
}
.info {
    padding: 0.5rem;
}
.info h3 {
    color: var(--primary);
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
    .user {
        background-color: #000000;
    }
    .user ion-text {
        color: #ffffff;
    }
    .user ion-text p {
        color: var(--lightText2);
    }
    .oneRecipe {
        background-color: #000000;
        color: var(--lightText2);
    }
    .oneRecipe .info p {
        color: #ffffff;
    }
}

</style>