//Automatically set to 'production' when published through Expo
var env = process.env.NODE_ENV || 'development';
// var env = 'production'
var config = require('../firebase/firebase');

const apiKey = config.googleDirectionsAPI.key;

const routesNearHome = [
    {
        origin: 'Ventisqueros 500, Puente Alto',
        destination: '306 W 38TH ST, AUSTIN, TX 78705'
    },
    // {
    // 	origin: '',
    // 	destination: ''
    // },
]


//Returns the coordinates for the each route located in the routesNearHome array
export async function getSimulatorPolylines(cb) {
    console.log('getSimulatorPolylines called ')

    const routes = formatRouteAddresses(routesNearHome)
    var polylines = []

    for(var i = 0; i < routes.length; i++)
        await getDirections(routes[i].origin, routes[i].destination, (coords) => {
            polylines.push(coords)
        })

    cb(polylines)
}

const iterateThruRoute = (routes) => {
    const nextRoutes = routes.slice(1, routes.length) //remove first elem

    if(coords.length != 0)
        this.animate(coords[0], () => { this.animateThruCoords(nextCoords) })
}

export const getDirections = (origin, destination, cb) => {
    return fetch('https://maps.googleapis.com/maps/api/directions/json?origin='+'San+Hugo+477-495,+Puente+Alto,+Región+Metropolitana'+'&destination='+"Ventisqueros+500,+Puente+Alto,+Región+Metropolitana"+'&key=AIzaSyDl3WK-NQNDqGJwbqH71FIYYtnlx5JwtDY')
        .then((res) => res.json())
        .then((resJson) => {
            var polylineCoords = null;
            console.log()
            if (resJson.routes.length)
                polylineCoords = decode(resJson.routes[0].overview_polyline.points)

            // console.log('POLYLINE COORDS: ', polylineCoords)

            cb(polylineCoords)
        })
        .catch((err) => {
            console.error(err)
        })
}


const formatRouteAddresses = (routes) => {
    var formattedRoutes = []

    routes.forEach((route) => {
        formattedRoutes.push({ origin: formatAddress(route.origin), destination: formatAddress(route.destination) })
    })

    return formattedRoutes
}

//Replaces commas and spaces with '+' signs
export const formatAddress = (address) => {
    var formattedAddress = address.split(',').join('').split(' ').join('+')

    return formattedAddress
}

export const disneylandDirections = (cb) => {
    fetch('https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key='+apiKey)
        .then((res) => res.json())
        .then((resJson) => {
            var polylineCoords = null;

            if (resJson.routes.length)
                polylineCoords = decode(resJson.routes[0].overview_polyline.points)

            cb(polylineCoords)
        })
        .catch((err) => {
            console.error(err)
        })
}

export const getExamplePolyline = (cb) => {
    const origin = '306+W+38TH+ST+AUSTIN+TX'
    const destination="Kerbey+Lane+Cafe"

    fetch('https://maps.googleapis.com/maps/api/directions/json?origin='+origin+'&destination='+destination+'&key='+apiKey)
        .then((res) => res.json())
        .then((resJson) => {
            var polylineCoords = null;

            if (resJson.routes.length)
                polylineCoords = decode(resJson.routes[0].overview_polyline.points)

            // console.log('POLYLINE COORDS: ', polylineCoords)

            cb(polylineCoords)
        })
        .catch((err) => {
            console.error(err)
        })
}

//Decodes encoded polyline strings returned from the Google Directions API
//Can find source at this url: https://github.com/react-native-community/react-native-maps/issues/929#issuecomment-271365235
const decode = (t,e) => {
    for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
}
