<template>
    <v-date-picker v-model="range" is-range>
        <template v-slot="{ inputValue, inputEvents }">
            <div class="flex justify-center items-center">
                <div class="datepicker-container">
                    <img :src="CalendarSVG" alt="Calendar Icon" />
                    <input type="button"
                        :value="inputValue.start ? (inputValue.start + ' - ' + (inputValue.end ? inputValue.end : 'Date de départ')) : 'Date d\'arrivée - Date de départ'"
                        v-on="inputEvents.start" class="datepicker">

                </div>
            </div>
        </template>
    </v-date-picker>
</template>

<script>
import CalendarSVG from "@/assets/Search_Page/CalendarSVG.svg"
export default {
    name: "DatePicker.vue",
    setup() {
        return {
            CalendarSVG,
        };
    },
    data() {
        return {
            range: {
                start: null,
                end: new Date(2020, 9, 16),
            },
        };
    },
    watch: {
        range: {
            handler: function () {
                this.$store.commit('setDates', {
                    start: this.range.start,
                    end: this.range.end
                });
            },
            deep: true
        }
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,800;1,100;1,200;1,300;1,400&display=swap');


.datepicker-container {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    flex-direction: row;
    background-color: #164465;

    border-radius: 28px;
    font-family: 'Montserrat', sans-serif;
    color: white;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 12px;
    padding: 10px;
    margin: 5px;
}

.datepicker {
    margin-left: 5px;
    margin-right: 5px;
}
</style>
