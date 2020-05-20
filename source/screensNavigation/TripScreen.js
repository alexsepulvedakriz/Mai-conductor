import React from 'react';
import {View, Text, TouchableHighlight, ActivityIndicator} from 'react-native';
import {Button, Card, ListItem, Rating, Input} from 'react-native-elements';
import { colors } from '../common/theme';
import stylesCommon from '../common/styles';
import { connect } from 'react-redux';
import {MapComponent, HeaderActionComponent} from '../components';
import {AcceptOrCancelOverlay, AccidentOverlay, LoadOverlay,} from '../overlays'
import  languageJSON  from '../common/language';
import {tripUpdate, tripCancel, tripCurrencyLoad} from "../actions/trip";
import Collapsible from "react-native-collapsible";
import {_pressCall, simpleTimer10, simpleTimer2} from "../functions/others";
import {accidentAdd} from "../actions/accident";
import {generateUIDD} from "../functions/others";
import {_getLocationAsync} from "../functions/position";


const mapStateToProps = state => {
    return{
        trip: state.trip,
        auth: state.auth,
        accident: state.accident
    }
};
const mapDispatchToProps = dispatch => ({
    tripCurrencyLoadProps: (id_driver) => dispatch(tripCurrencyLoad(id_driver)),
    tripUpdateProps: (trip) => dispatch(tripUpdate(trip)),
    cancelTripProps: (info) => dispatch(tripCancel(info)),
    accidentAddProps: (accident) => dispatch(accidentAdd(accident))
});

class TripScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cardCollapsible: true,
            overlayCancel: false,
            finishTrip: false,
            overlayAccident: false
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.trip.ended || this.props.trip.canceled){
            this.props.navigation.navigate('OfferList');
        }
        if(this.props.trip.currencyTrip){
            if(this.props.trip.currencyTrip.cancel){
                alert('Se ha cancelado el viaje');
                this.props.navigation.navigate('OfferList');
            }
        }
    }
    componentWillMount() {
        this.props.tripCurrencyLoadProps(this.props.auth.id_driver);
        this.updatePosition();
        simpleTimer2().then(_ => {
            this.setState({cardCollapsible: false});
        });
    }
    updatePosition(){
        if(!this.props.trip.evaluate && !this.props.trip.canceled && this.props.active){
            simpleTimer10().then( _ => {
                _getLocationAsync().then( pos => {
                    this.props.this.props.tripUpdateProps({
                        longitude_driver: pos.longitude,
                        latitude_driver: pos.latitude
                    });

                });
                this.updatePosition();
            })
        }
    }
    typeHeader(){
        if(this.props.trip.currencyTrip){
        if(this.props.trip.currencyTrip.on_rute){
            return(
                <HeaderActionComponent activate={() => {this.setState({overlayAccident: true})}} title={'Informar de un problema'} />
            )
        } else {
            return(
                <HeaderActionComponent  activate={() => {this.setState({overlayCancel: true})}} title={'Cancelar'}/>
            )
        }}
    }
    addAccident(arg){
        generateUIDD().then( id_accident => {
            const accident = {
                id_driver: this.props.trip.currencyTrip.id_driver,
                id_rider: this.props.trip.currencyTrip.id_driver,
                id_trip: this.props.trip.currencyTrip.id_driver,
                name_driver: this.props.trip.currencyTrip.name_driver,
                last_name_driver: this.props.trip.currencyTrip.last_name_driver,
                name_rider: this.props.trip.currencyTrip.name_rider,
                last_name_rider: this.props.trip.currencyTrip.last_name_rider,
                mobile_rider: this.props.trip.currencyTrip.mobile_rider,
                mobile_driver: this.props.trip.currencyTrip.mobile_driver,
                photo: arg.photo,
                resolution: '',
                resolved: false,
                description: arg.description,
                date: new Date(),
                ref_accident: id_accident
            };
            this.props.accidentAddProps(accident);
            this.props.tripUpdateProps({
                id_driver: this.props.trip.currencyTrip.id_driver,
                id_rider: this.props.trip.currencyTrip.id_driver,
                ref_accident: id_accident,
                active: false
            });
        });

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
                    onPress={() => {this.setState({finishTrip: true})}}
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
    waitOrLoaded(){
        if(this.props.trip.loaded && this.props.trip.currencyTrip){
            return(
                <View style={stylesCommon.columnSpaceBetween}>
                    {this.mapWaitOrLoaded()}
                    {this.typeHeader()}
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
                    <AccidentOverlay Visible={this.state.overlayAccident} cancel={() => this.setState({overlayAccident: false})} addAccident={(accident) => {this.addAccident(accident), this.setState({overlayAccident: false})}}/>
                    <LoadOverlay Visible={this.props.accident.adding} message={languageJSON.send_accident}/>
                    <LoadOverlay Visible={this.props.trip.cancel} message={languageJSON.end_trip}/>
                    <AcceptOrCancelOverlay visible={this.state.finishTrip} message={languageJSON.ask_finish_trip} accept={() => {this.setState({finishTrip: false}); this.props.navigation.navigate('FinishTrip');}} cancel={() => {this.setState({finishTrip: false})}}/>
                    <AcceptOrCancelOverlay visible={this.state.overlayCancel} message={languageJSON.ask_cancel_trip} accept={() => {this.setState({overlayCancel: false}); this.cancelTrip()}} cancel={() => {this.setState({overlayCancel: false})}}/>
                </View>
            )
        } else{
            return(
                <View>
                    {this.typeHeader()}
                    <View style={[{marginVertical: 30}]}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
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
    cancelTrip(){
        const trip = { id_driver: this.props.trip.currencyTrip.id_driver, id_trip: this.props.trip.currencyTrip.id_trip, active: false, cancel: true };
        this.props.cancelTripProps(trip);
    }
    render() {
        return (
            this.waitOrLoaded()
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripScreen);
