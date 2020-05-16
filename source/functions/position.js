import ngeohash from 'ngeohash';
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export const geohash = (latitude, longitude) => {
    return ngeohash.encode(parseFloat(latitude), parseFloat(longitude));
}

export const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        this.setState({
            errorMessage: 'Permission to access location was denied',
        });
    }
    let location = await Location.getCurrentPositionAsync({});
    if(location){
        var pos = {
            latitude:  location.coords.latitude,
            longitude: location.coords.longitude,
        };
        return pos
    }
}
