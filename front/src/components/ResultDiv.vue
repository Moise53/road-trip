<template>
    <v-card :loading="loading" :class="`blue-border-${this.index}-${this.index2}`"
        :id="`blue-border-${this.index}-${this.index2}`" max-width="280" min-width="280">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
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
                <v-rating :model-value=this.rating color="amber" density="compact" half-increments readonly
                    size="small"></v-rating>
                <div class="text-grey ms-4">
                    {{ this.rating }}
                </div>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn color="white" variant="text" @click="reserve">
                Ajouter à ma liste
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
let any;
export default {
    name: "ResultDiv",
    props: {
        title: String,
        address: String,
        rating: String,
        photo: String,
        location: Object,
        index: any,
        index2: any,
        markers: Object
    },
    data: () => ({
        loading: false,
        selection: 1,
    }),
    methods: {
        reserve() {
            console.log('clicked');
            this.loading = true
            const data = {
                title: this.title,
                address: this.address,
                rating: this.rating,
                photo: this.photo,
                location: this.location,
            }
            const categories = ["Hotels", "Restaurants", "Bars", "Activités"]
            this.$store.commit('setActivity', {
                category: categories[this.index],
                activityData: data
            })
            setTimeout(() => {
                this.loading = false
            }, 1000)

            const activities = this.$store.getters.getActivities;
            const dates = this.$store.getters.getDates;

            const dataToSend = {
                activities: {...activities},
                dates: {...dates}
            }
            console.log(dataToSend);
        }
    },
}

</script>

<style scoped>
.result-card-title {
    font-size: 14px;
}

.result-card-localization {
    font-size: 12px;
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
