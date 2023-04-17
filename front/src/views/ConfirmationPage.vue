<template>
    <v-dialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
            <div class="page">
                <div class="searchpage">
                    <div class="searchpage-left">
                        <navbar title="Nom du site" :user-avatar="userAvatar" :user-name="userName" />
                    </div>
                </div>
                <div>
                    <h1 class="page-title">Confirmation de votre Trip</h1>
                </div>
                <div class="d-flex align-center flex-column" v-for="(item, index) in items">
                    <v-card color="white" width="70%" :title="cardTitle[index]" subtitle="Du 15/04/2023 au 23/04/2023"
                        style="border-radius: 40px; margin-bottom: 3%">
                        <div style="display: flex; flex-direction: row;">
                            <img :src="cardAnimation[index]" class="animation" />
                            <!-- <p>{{cardAnimation[index]}}</p> -->
                            <div class="card-position">
                                <v-card :loading="loading" :class="`blue-border-${this.index}-${this.index2}`"
                                    :id="`blue-border-${this.index}-${this.index2}`" max-width="280" min-width="280">
                                    <template v-slot:loader="{ isActive }">
                                        <v-progress-linear :active="isActive" color="deep-purple" height="4"
                                            indeterminate></v-progress-linear>
                                    </template>

                                    <v-img cover height="100" :src=photo></v-img>

                                    <v-card-item>
                                        <v-card-title class="result-card-title">{{ this.title }}</v-card-title>

                                        <v-card-subtitle>
                                            <span class="result-card-localization">{{ this.address }}</span>

                                            <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                                        </v-card-subtitle>
                                    </v-card-item>

                                    <v-card-text>
                                        <v-row align="center" class="mx-0">
                                            <v-rating :model-value=this.rating color="amber" density="compact"
                                                half-increments readonly size="small"></v-rating>
                                            <div class="text-grey ms-4">
                                                {{ this.rating }}
                                            </div>
                                        </v-row>

                                    </v-card-text>
                                </v-card>
                            </div>
                        </div>
                    </v-card>
                </div>
                <v-btn rounded="lg" style="display: block;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20%;" color="hsl(131, 100%, 82%)" v-bind="props">
                    Valider mon trip
                </v-btn>
            </div>
        </template>
        <v-card>
            <v-card-text>
                Votre itinéraire pour votre voyage a bien été sauvegardé, Vous pouvez le consulter depuis votre historique.
            </v-card-text>
            <v-card-actions>
                <v-btn color="green" block @click="dialog = false">Consulter mon historique</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import Navbar from '/src/components/Navbar.vue'
import SearchComponent from '/src/components/SearchComponent.vue'
import GoogleMapComponent from "@/components/GoogleMapComponent.vue";
import FromComponent from "@/components/FromComponent.vue";
import { mapState } from 'vuex'

export default {
    name: 'ConfirmationPage',
    components: {
        Navbar,
        SearchComponent,
        GoogleMapComponent,
        FromComponent
    },
    computed: {
        ...mapState({
            categories: state => state.categories,
        }),
    },
    data() {
        return {
            items: [1, 2, 3, 4],
            cardTitle: ["Votre Hotel", "Votre activité du voyage", "Votre sortie au bar", "Votre diner au restaurant"],
            cardAnimation: ["/src/assets/animation/hotel.gif", "/src/assets/animation/activity.gif", "/src/assets/animation/bar.gif", "/src/assets/animation/restaurant.gif"],
            userAvatar: 'src/assets/logo.png',
            userName: JSON.parse(localStorage.getItem("user")).name,
            dialog: false,
        };
    },
};
</script>

<style>
.animation {
    height: 20%;
    width: 20%;
    margin-left: 2%;
}

.page {
    display: flex;
    flex-direction: column;
    background: linear-gradient(0deg, rgba(154, 189, 198, 1) 0%, rgba(255, 255, 255, 1) 97%);
}

.card-position {
    margin-left: 45%;
}

.searchpage {
    display: flex;
    flex-direction: row;
    margin: 20px;
}

.page-title {
    font-family: 'Abhaya Libre';
    color: #164465;
    text-align: center;
    top: 47%;
    font-size: 4rem;
    margin-bottom: 5%;
}


.searchpage-left {
    flex: 1;
    width: 80%;
    padding: 15px
}

.searchpage-right {
    flex: 1;
    height: 80%;
    padding: 20px;
}

[id^="blue-border-"] {
    border: 6px solid #006C89;
    border-radius: 40px;
    background-color: #006C89;
    color: white;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
</style>
