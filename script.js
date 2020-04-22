let map;
// get the users current location
// currently hardcoded
let user_location = {
    lat: 40.7579747,
    lng: -73.9939174
};

function initMap() {
    // gets a map element centered on the user
    // places the map into a div with id of map
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(user_location['lat'], user_location['lng']),
        zoom: 16
    });

    // all the icons 
const icons = {
    Water: {
        name: 'water',
        url: 'https://github.com/Convenient-Coders/UrbanScout/blob/develop/src/Stony/water_marker.png?raw=true'
    },
    Wifi: {
        name: 'wifi',
        url: 'https://github.com/Convenient-Coders/UrbanScout/blob/develop/src/Stony/WiFi_marker.png?raw=true'
    },
    Bin: {
        name: 'bin',
        url: 'https://github.com/Convenient-Coders/UrbanScout/blob/develop/src/Stony/bin_marker.png?raw=true'
    },
    Bathroom: {
        name: 'bathroom',
        // url: './src/assets/bathroom.svg'
    },
    user: {
        name: 'user',
        // url: './src/logo.svg',
        // size: new google.maps.Size(100, 100)
    }
};
    // places the user mark on the center of map
    new google.maps.Marker({
        position: user_location,
        map: map,
        // icon: icons['user'].url
    });

    const sqrCoords = [
        {lat: user_location['lat'] + 0.005, lng: user_location['lng'] + 0.005},
        {lat: user_location['lat'] + 0.005, lng: user_location['lng'] - 0.005},
        {lat: user_location['lat'] - 0.005, lng: user_location['lng'] - 0.005},
        {lat: user_location['lat'] - 0.005, lng: user_location['lng'] + 0.005}
    ];
    const radius = new google.maps.Polygon({paths: sqrCoords}); 

    async function waitForGeometryLibraries(currentLocation, type) {
        if(typeof google.maps.geometry !== "undefined"){
            // code using geometry library
            // console.log(google.maps.geometry.poly.containsLocation(new google.maps.LatLng
            //     (currentLocation['lat'], currentLocation['lng']), radius))
            // console.log(currentLocation)
            // console.log(user_location)
            
            if(google.maps.geometry.poly.containsLocation(new google.maps.LatLng
                (currentLocation['lat'], currentLocation['lng']), radius)) {
                // console.log("Place")  
                new google.maps.Marker({
                    position: new google.maps.LatLng
                (currentLocation['lat'], currentLocation['lng']),
                    map: map,
                    icon: icons[type].url
                });
            } else {
                console.log("NOPE")
            }
        }
        else{
            setTimeout(waitForGeometryLibraries(currentLocation), 250);
        }
    }

    // Gets the array of objects
    async function getData(type) {
        let data = await fetch(`http://localhost:8080/find${type}`, {mode:"no-cors"});
        return await data.json();
    }
    
    async function findClosestLocation(type) {
        let data = await getData(type)
        for(i = 0; i < data.length; i++) {
            await waitForGeometryLibraries({'lat':data[i]['lat'], 'lng':data[i]['lng']}, type)
            // console.log(data[i])
        }
    }


    // change "Water" to either ["Wifi", "Bin"]
    findClosestLocation(type) 
}