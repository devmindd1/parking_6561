function initMap() {
    let marker = null;

    const latitudeInput = document.querySelector('#latitude');
    const longitudeInput = document.querySelector('#longitude');
    const addressInput = document.querySelector('#address');

    const searchBox = new google.maps.places.SearchBox(addressInput);

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: { lat: 46.89400309384791, lng: 2.56154323626816 },
        draggableCursor: 'default',
        // mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    function createNewMarker(latLng){
        if(marker) marker.setMap(null);

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng),
            map: map,
        });
    }

    searchBox.addListener("places_changed", () => {
        const [place] = searchBox.getPlaces();

        latitudeInput.value = place.geometry.location.lat();
        longitudeInput.value = place.geometry.location.lng();

        map.setCenter(place.geometry.location);

        createNewMarker(place.geometry.location);
    });

    map.addListener("click", (mapsMouseEvent, t, r) => {
        const urlLatLng = mapsMouseEvent.latLng.toUrlValue();
        $.ajax({
            type: "POST",
            url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${urlLatLng}&key=AIzaSyB5wZV3BX0WF1P41cMheOw27qC8wnVBgQg`,
            success: function (data) {
                if(!data.results || !data.results[0]) return;
                const point = data.results[0];

                createNewMarker(point.geometry.location);

                latitudeInput.value = point.geometry.location.lat;
                longitudeInput.value = point.geometry.location.lng;

                addressInput.value = point.formatted_address;
            }
        });
    });
}

window.initMap = initMap;