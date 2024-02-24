<template>
    <ion-page>
        <ion-header class="ion-no-border" >
            <ion-toolbar>
                <ion-back-button slot="start" fill="clear" :icon="arrowUndo" ></ion-back-button>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen="true" >
            <div class="content" v-if="singleMeal.strMealThumb" >
                <div class="singleTop">
                    <ion-thumbnail>
                        <ion-img :src="singleMeal.strMealThumb" :alt="singleMeal.strMeal" ></ion-img>
                    </ion-thumbnail>
                    <ion-text>
                        <h1>{{ singleMeal.strMeal }}</h1>
                        <p>{{ singleMeal.strCategory }} Category</p>
                        <h4>{{ singleMeal.strArea }}</h4>
                    </ion-text>
                </div>
                <div class="tags">
                    <h3 v-for="i in tagsArray" :key="i" >{{ i }}</h3>
                </div>
                <div class="ingredients">
                    <h3>Ingredients</h3>
                    <div class="ingrContent">
                        <div class="oneIngre">
                            <div class="singleIng" >
                                <h4 v-for="(ingredient, index) in ingreArray" :key="index">
                                    <ion-icon :icon="radioButtonOn" ></ion-icon>
                                    <span> {{ ingreMeasure[index] }} of {{ ingredient }}</span>
                                    <!-- <p>{{ ingreMeasure[index] }}</p> -->
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="inst">
                    <h3>Instructions</h3>
                    <ion-text><p>{{ singleMeal.strInstructions }}</p></ion-text>
                </div>
                
                <div class="notify" v-if="userLikeNote" >
                    <p>{{ note }}</p>
                </div>
                <button class="like" @click="addImageToLikes(singleMeal.idMeal)" > <Icon icon="solar:heart-bold" width="45" /> </button>
                <a :href="singleMeal.strYoutube" class="rVid" >Recipe video</a>
            </div>
            <Wait v-else />
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonContent, IonBackButton, IonThumbnail, IonImg, IonText, IonIcon } from "@ionic/vue"
import { arrowUndo, radioButtonOn } from "ionicons/icons"
import { Icon } from "@iconify/vue"
import { useRoute } from "vue-router"
import { ref, onMounted } from "vue"
import { useCookie } from "vue-cookie-next"
import { DataStore } from "@/firebase/config"
import { doc, getDoc, setDoc, arrayRemove, arrayUnion, onSnapshot } from 'firebase/firestore';
import Wait from "@/components/Wait.vue"

const { mealId } = useRoute().params
const singleMeal = ref({})
const tagsArray = ref([])
const ingreArray = ref([])
const ingreMeasure = ref([])

const { getCookie } = useCookie()

const userId = getCookie('userId')
// console.log(userId)

onMounted( async () => {
    // console.log(mealId)
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        const data = await res.json()
        console.log(data.meals[0])
        singleMeal.value = data.meals[0]
        
        //for the tags
        if(singleMeal.value.strTags) {
            const modifiedString = singleMeal.value.strTags;
            let stringArray = modifiedString.split(',');
            stringArray = stringArray.map(item => item.trim());
            tagsArray.value = stringArray
        }
        // console.log(stringArray);

        //for the ingredients
        for( let key in singleMeal.value ) {
            if(key.includes('strIngredient') && singleMeal.value[key] !== "" && singleMeal.value[key] !== null && singleMeal.value[key] !== " "  ) {
                ingreArray.value.push(singleMeal.value[key])
            }
            if(key.includes('strMeasure') && singleMeal.value[key] !== "" && singleMeal.value[key] !== null && singleMeal.value[key] !== " "  ) {
                ingreMeasure.value.push(singleMeal.value[key])
            }
        }
        // console.log(ingreArray.value)
        // console.log(ingreMeasure.value)

    } catch (error) {
        console.log(error.message)
    }
})

const likedRecipes = ref([])
const userDocRef = doc(DataStore, 'getCookingUsers', userId, 'favRecipes', 'meals');
const note = ref('')
const userLikeNote = ref(false)

const makeMobileLike = async () => {
    if(userId) {
        const userDocSnapshot = await getDoc(userDocRef);
        const processSnapshot = () => {
            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                likedRecipes.value = userData.userLikedMeals
            }
        };
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            processSnapshot(doc);
        });
    }
}

const addImageToLikes = async (recipeId) => {
    if(userId) {
        // console.log(`${userId} liked ${recipeId}`);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            if (userData.userLikedMeals && userData.userLikedMeals.includes(recipeId)) {
                await setDoc(
                    userDocRef,
                    { userLikedMeals: arrayRemove(recipeId) },
                    { merge: true }
                );
                    // console.log('Image removed from liked collection');
                    note.value = 'Removed from favorites'
                    userLikeNote.value = true;
                    setTimeout(() => {
                        userLikeNote.value = false;
                    }, 2000);
                return;
            }
            await setDoc(
                userDocRef,
                {userLikedMeals: arrayUnion(recipeId)},
                { merge: true }
            );
            // console.log('Liked image added to collection');
            note.value = 'Added to favorites'
            userLikeNote.value = true;
            setTimeout(() => {
                userLikeNote.value = false;
            }, 2000);
        } else {
            await setDoc(userDocRef, {
                userLikedMeals: [recipeId]
            });
            // console.log('New document created with liked image');
            note.value = 'Favorites collection Started'
            userLikeNote.value = true;setTimeout(() => {
                userLikeNote.value = false;
            }, 2000);
        }
    }
};

if(userId) {
    makeMobileLike()
}

</script>

<style scoped>
ion-toolbar {
    --background: rgba(0, 0, 0, 0);
}
ion-toolbar svg {
    color: var(--primary);
} 
.content {
    position: relative;
}
.singleTop {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.singleTop ion-thumbnail {
    --size: 270px;
}
ion-img {
    border-radius: 50%;
}
.singleTop h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: -1rem;
}
.tags {
    display: flex;
    margin: 1rem;
    margin-top: 0;
    flex-wrap: wrap;
}
.tags h3 {
    /* margin: 1rem; */
    margin-right: 1rem;
    margin-bottom: 1rem;
    background-color: #eeeeee;
    padding: 1rem;
    font-size: 1rem;
    width: fit-content;
    border-radius: 1rem;
    margin-top: 0;
}
.inst {
    margin: 1.5rem;
}
.inst h3 {
    color: var(--primary);
    font-weight: 700;
} 
.like {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 1rem;
    border: none;
    background: none;
}
.like svg {
    /* font-size: 3rem; */
    color: #d40000;
}
.rVid {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 1rem;
    border: none;
    background-color: var(--primary);
    color: #ffffff;
    text-decoration: none;
    padding: 1rem;
    border-radius: 2rem;
}
.ingredients {
    margin: 1.5rem;
}
.ingredients h3 {
    color: var(--primary);
    font-weight: 700;
}
.singleIng h4 {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    background-color: #f8f8f8;
    padding: 0;
    border-radius: 1rem;
    padding: 1rem;
}
.singleIng ion-icon {
    color: var(--primary-lighter);
    margin-right: 1rem;
    min-width: 2rem;
}
.singleIng h4 p {
    background-color: var(--primary-lighter);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: #ffffff;
    font-weight: 600;
}
.notify {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    color: var(--primary);
    width: fit-content;
    margin: 1rem auto;
    text-align: center;
    margin-bottom: 5rem;
    padding: 0 1rem;
    border-radius: 2rem;
    background-color: #fff;
    border: 3px solid var(--primary-lighter);
    box-shadow: 0px 0px 69px 10px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 69px 10px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 69px 10px rgba(0,0,0,0.75);
}

@media (prefers-color-scheme: dark) {
    ion-content {
        --background: var(--bBack);
    }
    .singleTop p {
        color: var(--lightText);
    }
    .singleTop h4 {
        color: var(--lightText2);
    }
    .inst ion-text p {
        color: var(--lightText2);
    }
    .tags h3 {
        background-color: black;
        color: var(--lightText2);
    }
    .singleIng h4 {
        background-color: black;
        color: var(--lightText2);
    }
    .singleIng h4 p {
        color: black;
    }
}

</style>

