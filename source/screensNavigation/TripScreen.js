import React from 'react';
import {StyleSheet, View, Dimensions, Text, Linking, TouchableHighlight, ActivityIndicator} from 'react-native';
import {Button, Card, ListItem, Rating, Input} from 'react-native-elements';
import { colors } from '../common/theme';
import stylesCommon from '../common/styles';
import { connect } from 'react-redux';
import {MapComponent, HeaderComponent, HeaderArriveComponent, HeaderTripComponent} from '../components';
import {AcceptOrCancelOverlay,LoadOverlay,} from '../overlays'
import  languageJSON  from '../common/language';
import {tripUpdate, tripFinish, tripCurrencyLoad} from "../actions/trip";
import Collapsible from "react-native-collapsible";
import {_pressCall, simpleTimer} from "../functions/others";

var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        trip: state.trip,
        auth: state.auth,
    }
};
const mapDispatchToProps = dispatch => ({
    tripCurrencyLoadProps: (id_driver) => dispatch(tripCurrencyLoad(id_driver)),
    tripUpdateProps: (trip) => dispatch(tripUpdate(trip)),
    endTrip: (info) => dispatch(tripFinish(info))
});

class TripScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cardCollapsible: true,
            overlayCancel: false,
        }
    }
    componentWillMount() {
        this.props.tripCurrencyLoadProps(this.props.auth.id_driver);
        simpleTimer().then( _ => {
            this.setState({cardCollapsible: false});
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.trip.ended === true) {
            this.props.navigation.navigate('OfferList');
        }
    }
    typeHeader(){
        if(this.props.trip.currencyTrip.on_rute){
            return(
                <HeaderTripComponent cancel={() => {this.setState({overlayCancel: true})}} arrived={this.props.trip.currencyTrip.on_rute}/>
            )
        } else {
            return(
                <HeaderArriveComponent cancel={() => {this.setState({overlayCancel: true})}} arrived={this.props.trip.currencyTrip.on_rute}/>
            )
        }
    }
    typeButton(){
        if(this.props.trip.currencyTrip.on_rute){
            return(
                <Button
                    title={languageJSON.finish}
                    titleStyle={{ fontWeight: '500' }}
                    linearGradientProps={{
                        colors: ['#245b84', '#3ea1c0'],
                        start: [1, 0],
                        end: [0.2, 0],
                    }}
                    loading={this.props.trip.updating}
                    buttonStyle={stylesCommon.buttonPositive}
                    onPress={() => {this.props.tripUpdateProps({id_trip: this.props.trip.currencyTrip.id_trip, id_driver: this.props.trip.currencyTrip.id_driver, to_arrive: false, on_rute: true})}}
                />
            )
        } else {
            return(
                <Button
                    title={languageJSON.arrived}
                    titleStyle={{ fontWeight: '500' }}
                    linearGradientProps={{
                        colors: ['#245b84', '#3ea1c0'],
                        start: [1, 0],
                        end: [0.2, 0],
                    }}
                    loading={this.props.trip.updating}
                    buttonStyle={stylesCommon.buttonPositive}
                    onPress={() => {this.props.tripUpdateProps({id_trip: this.props.trip.currencyTrip.id_trip, id_driver: this.props.trip.currencyTrip.id_driver, to_arrive: false, on_rute: true})}}
                />
            )
        }
    }
    cardWaitOrLoaded(){
        if(this.props.trip.loaded && this.props.trip.currencyTrip){
            return(
                <View>
                    <TouchableHighlight onPress={() => {this.setState({cardCollapsible: !this.state.cardCollapsible});}} style={{width: '100%'}} underlayColor={'transparent'}>
                        <Collapsible collapsed={this.state.cardCollapsible}
                                     collapsedHeight={50}>
                            <Card containerStyle={stylesCommon.cardWithMargin}>
                                <View style={stylesCommon.rowSpaceAround}>
                                    <View
                                        style={{ backgroundColor: 'transparent', borderTopWidth: 4, borderColor: colors.GREY.secondary, width: 60, marginVertical: 0}}
                                    />
                                </View>
                                <View>
                                    <ListItem
                                        title={
                                            <View style={stylesCommon.rowSpaceBetween}>
                                                <View style={{marginLeft: 0}}>
                                                    <Text style={{fontSize:15, fontWeight: 'bold', maxWidth: 100}}>{this.props.trip.currencyTrip.name_driver}</Text>
                                                    <Text style={{fontSize:11}}>{this.props.trip.currencyTrip.vehicle}</Text>
                                                    <Rating
                                                        imageSize={14}
                                                        readonly
                                                        startingValue={this.props.trip.currencyTrip.review_rider}
                                                    />
                                                </View>
                                                <Button
                                                    icon={{
                                                        name: 'phone',
                                                        type: 'font-awesome',
                                                        size: 25,
                                                        color: 'white',
                                                    }}
                                                    buttonStyle={{
                                                        borderWidth: 0,
                                                        backgroundColor: colors.BLUE.default,
                                                        padding:10,
                                                        marginHorizontal:5,
                                                        borderRadius: 10,
                                                    }}
                                                    onPress={() =>{_pressCall(this.props.trip.currencyTrip.movil_conductor)}}
                                                />
                                                <Button
                                                    icon={{
                                                        name: 'whatsapp',
                                                        type: 'font-awesome',
                                                        size: 25,
                                                        color: 'white',
                                                    }}
                                                    buttonStyle={{
                                                        borderWidth: 0,
                                                        borderRadius: 10,
                                                        padding:10,
                                                        marginHorizontal: 5,
                                                        backgroundColor: colors.GREEN.light
                                                    }}
                                                />
                                            </View>
                                        }
                                        leftAvatar={{ source: {uri: this.props.trip.currencyTrip.ref_photo_rider}, size: 60 }}
                                        style={{margin: 0}}
                                    />
                                    <View style={stylesCommon.rowSpaceAround}>
                                        <Input
                                            placeholder='Desde'
                                            value={this.props.trip.currencyTrip.address_from}
                                            inputStyle={{
                                                color: 'black',
                                                paddingLeft: 10,
                                                fontSize: 14,
                                                marginVertical: 0
                                            }}
                                            disabled={true}
                                            leftIcon={{
                                                name: 'map-marker',
                                                type: 'font-awesome',
                                                size: 15,
                                                color: colors.GREY.Deep_Nobel,
                                            }}
                                        />
                                    </View>
                                    <View style={stylesCommon.rowSpaceAround}>
                                        <Input
                                            placeholder='  Hasta'
                                            value={this.props.trip.currencyTrip.address_to}
                                            inputStyle={{
                                                color: 'black',
                                                paddingLeft: 10,
                                                fontSize: 14,
                                                marginVertical: 0
                                            }}
                                            disabled={true}
                                            leftIcon={{
                                                name: 'map-pin',
                                                type: 'font-awesome',
                                                size: 15,
                                                color: colors.GREY.Deep_Nobel,
                                            }}
                                        />
                                    </View>
                                    <View>
                                        {this.typeButton()}
                                    </View>
                                </View>
                            </Card>
                        </Collapsible>
                    </TouchableHighlight>
                </View>
            )
        }
    }
    mapWaitOrLoaded(){
        let region = {
                latitude: -33.4488897,
                longitude: -70.66926,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
        };
        if(this.props.trip.loaded && this.props.trip.currencyTrip){
            const nearbyMarkers =  [{latitude: this.props.trip.currencyTrip.latitude_driver, longitude: this.props.trip.currencyTrip.longitude_driver}];
            return(
                <View style={stylesCommon.backgroundMap}>
                    <MapComponent
                        markerRef={marker => { this.marker = marker; }}
                        mapStyle={stylesCommon.map}
                        mapRegion={region}
                        nearby = {nearbyMarkers}
                        origen={{latitude: this.props.trip.currencyTrip.latitude_init, longitude: this.props.trip.currencyTrip.longitude_init}}
                        destination={{latitude: this.props.trip.currencyTrip.latitude_end, longitude: this.props.trip.currencyTrip.longitude_end}}
                        distance = {() => {}}
                    />
                </View>
            )
        }
        if(this.props.trip.currencyTrip){
        } else {
            return (
                <View style={[stylesCommon.backgroundMap,{marginVertical: 30}]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
    }
    // update trip
    endTrip(object){
        const trip = { id_pasajero: this.props.trip.currencyTrip.id_pasajero, id_viaje: this.props.trip.currencyTrip.id_viaje, ... object };
        this.props.endTrip(trip);
    }
    render() {
        return (
            <View style={stylesCommon.columnSpaceBetween}>
                {this.mapWaitOrLoaded()}
                {this.typeHeader()}
                {this.cardWaitOrLoaded()}
                <LoadOverlay Visible={this.props.trip.end} message={languageJSON.end_trip}/>
                <AcceptOrCancelOverlay visible={this.state.overlayCancel} message={'Esta seguro que quiere cancelar viaje?'} accept={() => {this.setState({overlayCancel: false}); this.endTrip({activo: false, cancelado: true})}} cancel={() => {this.setState({overlayCancel: false})}}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripScreen);
