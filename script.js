let map;
function initMap() {
    const myHouse = { lat: 41.78124, lng: -87.80439}
    // const myHouse = { lat: position.coords.latitude, lng: position.coords.longitude}
    const contentString = 
        "<h1>Rob's House Coordinates</h1>" +
        "<p><b>Coordinates:</b> <br> lat: 41.78124 <br> <t>lng: -87.80439</p>"
      
    map = new google.maps.Map(document.querySelector("#map"), {
        center: myHouse,
        zoom: 12,
    });

    let marker = new google.maps.Marker({
        position: myHouse,
        map: map,
    });

    let infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}

function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');

    mapLink.href = '';
    mapLink.textContent = '';

    function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
    status.textContent = 'Unable to retrieve your location';
    }

    if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
    } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
    }

    }

    document.querySelector('#find-me').addEventListener('click', geoFindMe);

    const watchID = navigator.geolocation.watchPosition((position) => {
        doSomething(position.coords.latitude, position.coords.longitude);
    });
