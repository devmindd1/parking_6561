function initMap() {
    let marker = null;
    const latitude = $('#latitude').val();
    const longitude = $('#longitude').val();

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
}

window.initMap = initMap;