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
            if(origen.longitude) {
                return(
                    <Marker.Animated
                        ref={markerRef}
                        coordinate={origen}
                    />
                )
            }
        }
    }
    markerDestination(markerRef, destination) {
        if(destination){
            if(destination.longitude){
                return(
                    <Marker.Animated
                        ref={markerRef}
                        coordinate={destination}
                    />
                )
            }
        }
    }
    defineRegion(mapRegion, origen, destination){
        const region = {
            latitude: mapRegion.latitude*1.0008,
            longitude: mapRegion.longitude,
            latitudeDelta: mapRegion.latitudeDelta,
            longitudeDelta: mapRegion.longitudeDelta,
        };
        if (origen){
            if(origen.latitude){
                region.latitude = origen.latitude*1.0008;
                region.longitude = origen.longitude;
            }
        }
        if ( destination){
            if(destination.latitude){
                region.latitude = destination.latitude*1.0008;
                region.longitude = destination.longitude;
            }
        }
        if (origen && destination){
            if(origen.latitude && destination.latitude){
                region.latitude = ((origen.latitude + destination.latitude)/2)*(1 + (Math.abs(origen.latitude - destination.latitude))*2/100);
                region.longitude = (origen.longitude + destination.longitude)/2;
                region.latitudeDelta = (Math.abs(origen.latitude - destination.latitude))*3;
                region.longitudeDelta = (Math.abs(origen.longitude - destination.longitude))*3;
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
                    coordinate={{latitude: item.latitude, longitude: item.longitude}}
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
