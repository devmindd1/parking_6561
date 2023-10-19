function initMap() {
    //let marker = null;
    const latitude = 48.82451409440279;
    const longitude = 2.36378933001816;

    const center = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: center,
        draggableCursor: 'default',
        // mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    function createNewMarker(latLng){
        //if(marker) marker.setMap(null);

        new google.maps.Marker({
            position: new google.maps.LatLng(latLng),
            map: map,
        });
    }

    addEventListener('DOMContentLoaded', () => {
        $('tbody tr').toArray().forEach(item => {
            const latitude = $(item).attr('data-latitude');
            const longitude = $(item).attr('data-longitude');

            if(latitude !== 'null' && longitude !== 'null')
                createNewMarker({
                    lat: parseFloat(latitude),
                    lng: parseFloat(longitude)
                });
        });
    });
}

window.initMap = initMap;