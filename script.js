let map;
// get the users current location
// currently hardcoded
let user_location = {
    lat: 40.7828647,
    lng: -73.9675438
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
    water: {
        name: 'water',
        // url: 'data:image/svg+xml;base64,PHN2ZyBpZD0iZW1vamkiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0Jv%0D%0AeD0iMCAwIDcyIDcyIj4KICA8ZyBpZD0iY29sb3IiPgogICAgPHBhdGggZmlsbD0iIzkyRDNGNSIg%0D%0AZD0iTTU2LjAwMDEsNDYuNzA2NWMwLDExLjc3NDktOC45NTQzLDIxLjI5NjUtMjAsMjEuMjk2NXMt%0D%0AMjAtOS41NDU1LTIwLTIxLjMyMDQgYzAsMC0wLjIxOTEtMTQuMzA4NiwxNi42NTU5LTQwLjE4Nzhj%0D%0AMCwwLDMuMTY2Ni01LjM3MDMsNi4zNTQxLTAuMzUyM0M1NS44ODUxLDMyLjAyMTYsNTYuMDAwMSw0%0D%0ANi43MDY1LDU2LjAwMDEsNDYuNzA2NSIgc3Ryb2tlPSJub25lIi8+CiAgICA8cGF0aCBmaWxsPSIj%0D%0ANjFCMkU0IiBkPSJNMzYsMy45OTkxQzQ4Ljg3NSwxNC4zNzUsNTUuODc1LDQ0Ljg3NDQsNTUuODc1%0D%0ALDQ0Ljg3NDRjMCwxNS4wMDA2LTguODI5MywyMy4xMjY1LTE5Ljg3NSwyMy4xMjY1IEMzNiw2OC4w%0D%0AMDA5LDU4LDQ5Ljg3NDQsMzYsMy45OTkxIiBzdHJva2U9Im5vbmUiLz4KICA8L2c+CiAgPGcgaWQ9%0D%0AImhhaXIiLz4KICA8ZyBpZD0ic2tpbiIvPgogIDxnIGlkPSJza2luLXNoYWRvdyIvPgogIDxnIGlk%0D%0APSJsaW5lIj4KICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdp%0D%0AZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0%0D%0Acm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTU2LjAwMDEsNDYuNzA2NWMwLDExLjc3NDktOC45NTQz%0D%0ALDIxLjI5NjUtMjAsMjEuMjk2NXMtMjAtOS41NDU1LTIwLTIxLjMyMDRjMCwwLTAuMjE5MS0xNC4z%0D%0AMDg2LDE2LjY1NTktNDAuMTg3OCBjMCwwLDMuMTY2Ni01LjM3MDMsNi4zNTQxLTAuMzUyM0M1NS44%0D%0AODUxLDMyLjAyMTYsNTYuMDAwMSw0Ni43MDY1LDU2LjAwMDEsNDYuNzA2NSIvPgogIDwvZz4KPC9z%0D%0Admc+Cg==',
        // size: new google.maps.Size(20, 32),
        // origin: new google.maps.Point(0, 0),
        // anchor: new google.maps.Point(0, 32)
    },
    wifi: {
        name: 'wifi',
        // url: './src/assets/wifi.svg'
    },
    bin: {
        name: 'bin',
        // url: './src/assets/bin.svg'
    },
    bathroom: {
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

    async function waitForGeometryLibraries(currentLocation) {
        if(typeof google.maps.geometry !== "undefined"){
            // code using geometry library
            // console.log(google.maps.geometry.poly.containsLocation(new google.maps.LatLng
            //     (currentLocation['lat'], currentLocation['lng']), radius))
            console.log(currentLocation)
            console.log(user_location)
            
            if(google.maps.geometry.poly.containsLocation(new google.maps.LatLng
                (currentLocation['lat'], currentLocation['lng']), radius)) {
                console.log("Place")  
                new google.maps.Marker({
                    position: new google.maps.LatLng
                (currentLocation['lat'], currentLocation['lng']),
                    map: map,
                    icon: icons['water'].url
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
            await waitForGeometryLibraries({'lat':data[i]['lat'], 'lng':data[i]['lng']})
            // console.log(data[i])
        }
    }


    // change "Water" to either ["Wifi", "Bin"]
    findClosestLocation("Water") 
}