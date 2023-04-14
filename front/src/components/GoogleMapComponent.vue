<template>
    <div>
        <div id="map"></div>
        <div id="infowindow-content">
            <span id="place-name" class="title"></span><br />
            <span id="place-address"></span>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
    name: "GoogleMapComponent",
    data() {
        return {
            allMarkers: []
        }
    },
    computed: {
        ...mapState({
            map: state => state.map,
        }),
    },
    methods: {
        setAutocomplete(id, map) {
            let allCategoryName = ["lodging", "restaurant", "bar", "tourist_attraction"];
            let allCategoryColor = ["red", "blue", "green", "yellow"];

            const autocomplete = new google.maps.places.Autocomplete(document.getElementById(id), {
                types: ["(cities)"],
                fields: ["geometry", "name", "formatted_address"],
            });
            autocomplete.bindTo("bounds", map);
            const places = new google.maps.places.PlacesService(map);
            const infowindow = new google.maps.InfoWindow();
            const infowindowContent = document.getElementById("infowindow-content");
            infowindow.setContent(infowindowContent);

            const marker = new google.maps.Marker({
                map,
                anchorPoint: new google.maps.Point(0, -29),
            });

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    // Update value
                    this.$store.commit(id === 'from-search' ? 'setSearchTextFrom' : 'setSearchTextTo', place.formatted_address);
                    map.panTo(place.geometry.location);
                    map.setZoom(15);

                    if (id !== 'search-search') {
                        return;
                    }

                    // Recherche de lieux à proximité pour chaque catégorie
                    for (let i = 0; i < allCategoryName.length; i++) {
                        const category = {
                            categoryName: allCategoryName[i],
                            results: [],
                        };
                        const markers = []


                        console.log(place.geometry.location.lat());
                        const search = {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            radius: 5000,
                            type: [allCategoryName[i]],
                        };

                        const searchUrl = 'http://localhost:5001/search/places'
                        const googleApiKey = 'AIzaSyAj_Zjj3WlfLD1e3v6QHUvwTROUIFkeiQA';
                        axios.get(searchUrl, { params: search })
                            .then(response => {
                                for (let j = 0; j < response.data.results.length; j++) {
                                    const result = response.data.results[j];
                                    const resultLocation = {
                                        lat: result.location.lat,
                                        lng: result.location.lng,
                                    };

                                    const placeDetails = {
                                        name: result.name,
                                        rating: result.rating,
                                        address: result.address,
                                        photo: result.photos ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${result.photos[0].photo_reference}&key=${googleApiKey}&maxheight=300&maxwidth=300`: null,
                                    };
                                    category.results.push(placeDetails);
                                    let urlIcon = "http://maps.google.com/mapfiles/ms/icons/" + allCategoryColor[i] + "-dot.png"
                                    let icon = {
                                        url: urlIcon
                                    }
                                    const resultMarker = new google.maps.Marker({
                                        map,
                                        icon: icon,
                                        position: resultLocation,
                                        title: result.name,
                                    });
                                    resultMarker.addListener("click", () => {
                                        let categoryMarker = this.$store.getters.getCategoriesMarker(i)
                                        for (let k = 0; k < categoryMarker.length; k++) {
                                            const myDiv = document.getElementById(`blue-border-${i}-${k}`);
                                            myDiv.style.backgroundColor = "#006C89";
                                            myDiv.style.borderColor = "#006C89";
                                        }
                                        let card = "blue-border-" + i + "-" + j;
                                        const myDiv = document.getElementById(card);

                                        myDiv.style.backgroundColor = "#009499";
                                        myDiv.style.borderColor = "#009499";

                                        const resultName = `<h3>${result.name}</h3>`;
                                        const resultAddress = `<p>${result.address}</p>`;
                                        const resultRating = `<p>${result.rating}</p>`;
                                        const resultPhoto = result.photos ? `<img src="${`https://maps.googleapis.com/maps/api/place/photo?photoreference=${result.photos[0].photo_reference}&key=${googleApiKey}&maxheight=300&maxwidth=300`}" width="50%">` : '';
                                        infowindow.setContent(resultName + resultAddress + resultRating + resultPhoto);
                                        infowindow.open(map, resultMarker);
                                    });

                                    markers.push({
                                        info: {
                                            name: result.name,
                                            rating: result.rating,
                                            address: result.address,
                                            location: resultLocation,
                                            photo: result.photos ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${result.photos[0].photo_reference}&key=${googleApiKey}&maxheight=300&maxwidth=300`: null,
                                        },
                                        markers: resultMarker
                                    })
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })

                            this.$store.commit('addMarkersToCategory', { categoryIndex: i, markers: markers })

                        // const search = {
                        //     bounds: map.getBounds(),
                        //     types: [allCategoryName[i]],
                        // };
                        // places.nearbySearch(search, (results, status, pagination) => {
                        //     console.log(results);
                        //     if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                        //         for (let j = 0; j < results.length; j++) {
                        //             const result = results[j];
                        //             const resultLocation = result.geometry.location;

                        //             places.getDetails({ placeId: result.place_id }, (details, status) => {
                        //                 if (status === google.maps.places.PlacesServiceStatus.OK && details) {
                        //                     const placeDetails = {
                        //                         name: details.name,
                        //                         rating: details.rating,
                        //                         address: details.formatted_address,
                        //                         photo: details.photos ? details.photos[0].getUrl() : null,
                        //                     };
                        //                     category.results.push(placeDetails);
                        //                     let urlIcon = "http://maps.google.com/mapfiles/ms/icons/" + allCategoryColor[i] + "-dot.png"
                        //                     let icon = {
                        //                         url: urlIcon
                        //                     }
                        //                     const resultMarker = new google.maps.Marker({
                        //                         map,
                        //                         icon: icon,
                        //                         position: resultLocation,
                        //                         title: result.name,
                        //                     });
                        //                     resultMarker.addListener("click", () => {
                        //                         let categoryMarker = this.$store.getters.getCategoriesMarker(i)
                        //                         for (let k = 0; k < categoryMarker.length; k++) {
                        //                             let card = "blue-border-" + i + "-" + k;
                        //                             const myDiv = document.getElementById(card);
                        //                             myDiv.style.backgroundColor = "#006C89";
                        //                             myDiv.style.borderColor = "#006C89";
                        //                         }
                        //                         let card = "blue-border-" + i + "-" + j;
                        //                         const myDiv = document.getElementById(card);

                        //                         myDiv.style.backgroundColor = "#009499";
                        //                         myDiv.style.borderColor = "#009499";

                        //                         const resultName = `<h3>${result.name}</h3>`;
                        //                         const resultAddress = `<p>${details.formatted_address}</p>`;
                        //                         const resultRating = `<p>${details.rating}</p>`;
                        //                         const resultPhoto = details.photos ? `<img src="${details.photos[0].getUrl()}" width="50%">` : '';
                        //                         infowindow.setContent(resultName + resultAddress + resultRating + resultPhoto);
                        //                         infowindow.open(map, resultMarker);
                        //                     });
                        //                     if (!this.$store.getters.getCategoryIsVisible(i)) {
                        //                         resultMarker.setVisible(false)
                        //                     }
                        //                     markers.push({
                        //                         info: {
                        //                             title: result.name,
                        //                             address: details.formatted_address,
                        //                             photo: details.photos ? details.photos[0].getUrl() : "",
                        //                             rating: details.rating
                        //                         },
                        //                         markers: resultMarker
                        //                     })

                        //                 }
                        //             });
                        //         }
                        //     }
                        // });
                        this.$store.commit('addMarkersToCategory', { categoryIndex: i, markers: markers })
                    }
                } else {
                    document.getElementById("autocomplete").placeholder = "Enter a city";
                }
            });
        },
        autocompleteListener() {
            let mapProp = {
                center: { lat: 48.81568796196467, lng: 2.362816515355514 },
                zoom: 19,
            }
            this.$store.commit('setMap', mapProp)

            this.setAutocomplete("from-search", this.map)
            this.setAutocomplete("search-search", this.map)
        }
    },

    mounted() {
        this.autocompleteListener(); // appel de la fonction autocompleteListener
    }
};
</script>
<style>
#map {
    display: flex;
    height: 100vh;
    border: solid;
    border-width: 3px;
    border-radius: 20px;
    color: #009499;
}

#infowindow-content .title {
    font-weight: bold;
}

#infowindow-content {
    display: none;

}

#map #infowindow-content {
    display: inline;
}
</style>