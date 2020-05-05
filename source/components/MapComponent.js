import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {colors} from "../common/theme";

const GOOGLE_MAPS_APIKEY = 'AIzaSyDl3WK-NQNDqGJwbqH71FIYYtnlx5JwtDY';

export default class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
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
                region.latitude = latInit*1.0008;
                region.longitude = longInit;
            }
        }
        if ( destination){
            if(latEnd){
                region.latitude = latEnd*1.0008;
                region.longitude = longEnd;
            }
        }
        if (origen && destination){
            if(latInit && latEnd){
                region.latitude = ((latInit + latEnd)/2)*(1 + (Math.abs(origen.latitude - destination.latitude))*2/50);
                region.longitude = (longInit + longEnd)/2;
                region.latitudeDelta = (Math.abs(latInit - latEnd))*3;
                region.longitudeDelta = (Math.abs(longInit - longEnd))*3;
            }
        }
        return region;
    }
    render() {
    const { mapRegion, mapStyle,nearby, onRegionChange, markerRef, origen, destination } = this.props;
        const region = this.defineRegion(mapRegion, origen, destination);
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showScale={true}
                followUserLocation
                mapPadding={{ top: 80, right: 0, bottom: 0, left: 0 }}
                loadingEnabled
                showsMyLocationButton={true}

                style={[mapStyle,{ marginBottom: this.state.marginBottom}]}
                region={region}
                onRegionChange={onRegionChange}
                onMapReady={() => this.setState({ marginBottom: 1 })}
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
             {nearby?nearby.map((item,index)=>{
                return (
                    <Marker.Animated
                    coordinate={{latitude:  parseFloat(item.latitude), longitude:  parseFloat(item.longitude)}}
                    key = {index}
                    image={require('../../assets/images/available_car.png')}
                    />
                )
             })
            :null}
             
            </MapView>
        );
    }
}
