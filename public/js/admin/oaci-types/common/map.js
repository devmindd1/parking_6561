function initMap() {
    let marker = null;
    const latitude = $('#latitude').val() || 48.82451409440279;
    const longitude = $('#longitude').val() || 2.36378933001816;

    const center = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: center,
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

    createNewMarker(center);

    map.addListener("click", (mapsMouseEvent, t, r) => {
        const lat = mapsMouseEvent.latLng.lat();
        const lng = mapsMouseEvent.latLng.lng();

        $('#latitude').val(lat);
        $('#longitude').val(lng);

        createNewMarker({
            lat: mapsMouseEvent.latLng.lat(),
            lng: mapsMouseEvent.latLng.lng()
        });
    });

}

window.initMap = initMap;