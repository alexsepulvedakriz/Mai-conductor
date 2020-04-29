import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {colors} from "../common/theme";

const GOOGLE_MAPS_APIKEY = 'AIzaSyDl3WK-NQNDqGJwbqH71FIYYtnlx5JwtDY';

export default class SmallMapComponent extends Component {
    constructor(props) {
        super(props);
    }

    markerOrigen(markerRef, origen) {
        if(origen){
            const latInit = parseFloat(origen.latitude);
            const longInit = parseFloat(origen.longitude);
            if(origen.longitude) {
                return(
                    <Marker.Animated
                        ref={markerRef}
                        coordinate={{latitude: latInit, longitude: longInit}}
                    />
                )
            }
        }
    }
    markerDestination(markerRef, destination) {
        if(destination){
            const latEnd = parseFloat(destination.latitude);
            const longEnd = parseFloat(destination.longitude);
            if(destination.longitude){
                return(
                    <Marker.Animated
                        ref={markerRef}
                        coordinate={{latitude: latEnd, longitude: longEnd}}
                    />
                )
            }
        }
    }
    defineRegion(mapRegion, origen, destination){
            const latInit = parseFloat(origen.latitude);
            const latEnd = parseFloat(destination.latitude);
            const longInit = parseFloat(origen.longitude);
            const longEnd = parseFloat(destination.longitude);
        const region = {
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude,
            latitudeDelta: mapRegion.latitudeDelta,
            longitudeDelta: mapRegion.longitudeDelta,
        };
        if (origen){
            if(latInit){
                region.latitude = latInit;
                region.longitude = longInit;
            }
        }
        if ( destination){
            if(latEnd){
                region.latitude = latEnd;
                region.longitude = longEnd;
            }
        }
        if (origen && destination){
            if(latInit && latEnd){
                region.latitude = (latInit + latEnd)/2;
                region.longitude = (longInit + longEnd)/2;
                region.latitudeDelta = (Math.abs(latInit - latEnd))*2;
                region.longitudeDelta = (Math.abs(longInit - longEnd))*2;
            }
        }
        return region;
    }
    render() {
        const { mapRegion, mapStyle, onRegionChange, markerRef, origen, destination } = this.props;
        const region = this.defineRegion(mapRegion, origen, destination);
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={false}
                showScale={true}
                mapPadding={{ top: 0, right: 0, bottom: 0, left: 0 }}
                loadingEnabled
                showsMyLocationButton={true}
                style={[mapStyle]}
                region={region}
                onRegionChange={onRegionChange}
            >
                <MapViewDirections
                    origin={origen}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor={colors.BLUE.default}
                    optimizeWaypoints={true}
                    onReady={result => {this.props.distance(result.distance);
                    }}
                    onError={(errorMessage) => {
                        // console.log('GOT AN ERROR');
                    }}
                />
                {this.markerOrigen(markerRef, origen)}
                {this.markerDestination(markerRef, destination)}
            </MapView>
        );
    }
}
