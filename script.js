var map;
// get the users current location
// currently hardcoded
var user_location = {
    lat: 40.890218,
    lng: -73.863391
};
// all the icons 
var icons = {
    water: {
        name: 'water',
        url: './src/assets/droplet.svg',
        // size: new google.maps.Size(50, 50)
    },
    wifi: {
        name: 'wifi',
        url: './src/assets/wifi.svg'
    },
    bin: {
        name: 'bin',
        url: './src/assets/bin.svg'
    },
    bathroom: {
        name: 'bathroom',
        url: './src/assets/bathroom.svg'
    },
    user: {
        name: 'user',
        url: 'user.png',
        // size: new google.maps.Size(100, 100)
    }
};

function findClosestLocation(currentLocation, data) {
    
}

function initMap() {
    // gets a map element centered on the user
    // places the map into a div with id of map
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(user_location['lat'], user_location['lng']),
        zoom: 16
    });
    // places the user mark on the center of map
    var person_marker = new google.maps.Marker({
        position: user_location,
        map: map,
        // icon: icons['user'].url
    });

    var sqrCoords = [
        {lat: user_location['lat'] + 0.005, lng:user_location['lng'] + 0.005},
        {lat: user_location['lat'] + 0.005, lng:user_location['lng'] - 0.005},
        {lat: user_location['lat'] - 0.005, lng:user_location['lng'] - 0.005},
        {lat: user_location['lat'] - 0.005, lng:user_location['lng'] + 0.005}
    ];
    var radius = new google.maps.Polygon({paths: sqrCoords});

    var water_location = {
        lat: user_location['lat'] + 0.0005,
        lng: user_location['lng'] + 0.0005
    };

    setTimeout(waitForGeometryLibraries, 250);  
    
    function waitForGeometryLibraries(){
        if(typeof google.maps.geometry !== "undefined"){
            // code using geometry library
            console.log(google.maps.geometry.poly.containsLocation(new google.maps.LatLng
                (water_location['lat'], water_location['lng']), radius))
            
            if(google.maps.geometry.poly.containsLocation(new google.maps.LatLng
                (water_location['lat'], water_location['lng']), radius)) {
                console.log("Place")  
                var marker = new google.maps.Marker({
                    position: water_location,
                    map: map,
                    // icon: icons['water'].url
                });
            }
        }
        else{
            setTimeout(waitForGeometryLibraries, 250);
        }
    }

}