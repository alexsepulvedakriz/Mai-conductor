import React from 'react';
import {StyleSheet, View, Dimensions, Text, Linking, TouchableHighlight, ActivityIndicator} from 'react-native';
import {Button, Card, ListItem, Rating, Input} from 'react-native-elements';
import { colors } from '../common/theme';
import stylesCommon from '../common/styles';
import { connect } from 'react-redux';
import {MapComponent, AcceptOrCancelOverlay, EvaluatingTripOverlay, LoadOverlay, AccidentOverlay, HeaderComponent} from '../components';
import  languageJSON  from '../common/language';
import {tripUpdate, tripFinish} from "../actions/trip";
import Collapsible from "react-native-collapsible";

var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        trip: state.trip,
        modal: state.modal
    }
}
const mapDispatchToProps = dispatch => ({
    // para cambiar el precio y para cancelar la oferta
    tripUpdate: (trip) => dispatch(tripUpdate(trip)),
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
        this.simpleTimer().then( _ => {
            this.setState({cardCollapsible: false});
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.trip.ended === true) {
            this.props.navigation.navigate('OfferList');
        }
    }
    simpleTimer() {
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function(){ resolve(); }, 2000);
        });
        return promise;
    }
    tripEvaluate(object){
        const {id_pasajero, id_viaje} = this.props.trip.currencyTrip;
        const tripData = {...object, id_pasajero: id_pasajero, id_viaje: id_viaje, evaluando: false, activo: false};
        this.props.endTrip(tripData);
    }
    // phone
    _pressCall=()=>{
        const url= 'tel:' + this.props.trip.currencyTrip.movil_conductor;
        Linking.openURL(url)
    }
    // Contra ofertas
    comeBackOffer() {
        this.props.navigation.navigate('DataPackage');
    }
    tripOncourse(){
        if(this.props.trip.currencyTrip) {
            if(this.props.trip.currencyTrip.en_curso){
            } else {
                return(
                    <Button
                        title={languageJSON.cancel_button}
                        titleStyle={{ fontWeight: '500' }}
                        buttonStyle={stylesCommon.buttonNegative}
                        onPress={() => {this.setState({overlayCancel: true})}}
                    />
                )
            }
        }
    }
    cardWaitOrLoaded(){
        if(this.props.trip.loaded && this.props.trip.currencyTrip){
            return(
                <View>
                    <TouchableHighlight onPress={() => {this.setState({cardCollapsible: !this.state.cardCollapsible});}} style={{width: '100%'}} underlayColor={'transparent'}>
                        <Collapsible collapsed={this.state.cardCollapsible}
                                     collapsedHeight={50}>
                            <Card containerStyle={styles.cardWithMargin}>
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
                                                    onPress={this._pressCall}
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
                                    />
                                    <View style={stylesCommon.rowSpaceAround}>
                                        <Input
                                            placeholder='Desde'
                                            value={this.props.trip.currencyTrip.adress_from}
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
                                            value={this.props.trip.currencyTrip.adress_to}
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
                                    <View style={{marginTop:10}}>
                                        {this.tripOncourse()}
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
            const nearbyMarkers =  [{latitude: this.props.trip.currencyTrip.latitude_conductor, longitude: this.props.trip.currencyTrip.longitude_conductor}];
            return(
                <View style={stylesCommon.backgroundMap}>
                    <MapComponent
                        markerRef={marker => { this.marker = marker; }}
                        mapStyle={stylesCommon.map}
                        mapRegion={region}
                        nearby = {nearbyMarkers}
                        origen={{latitude: this.props.trip.currencyTrip.latitude_inicio, longitude: this.props.trip.currencyTrip.longitude_inicio}}
                        destination={{latitude: this.props.trip.currencyTrip.latitude_fin, longitude: this.props.trip.currencyTrip.longitude_fin}}
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
                <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={'Viaje en curso'} type={'color'}/>
                {this.cardWaitOrLoaded()}
                <LoadOverlay Visible={this.props.trip.end} message={languageJSON.end_trip}/>
                <EvaluatingTripOverlay currencyTrip={this.props.trip.currencyTrip} tripUpdate={(info) => {this.tripEvaluate(info)}}/>
                <AccidentOverlay currencyTrip={this.props.trip.currencyTrip} accept={() =>{this.endTrip({activo: false})}} />
                <AcceptOrCancelOverlay visible={this.state.overlayCancel} message={'Esta seguro que quiere cancelar viaje?'} accept={() => {this.setState({overlayCancel: false}); this.endTrip({activo: false, cancelado: true})}} cancel={() => {this.setState({overlayCancel: false})}}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripScreen);

const styles = StyleSheet.create({
    cardWithMargin: {
        borderWidth: 0, // Remove Border
        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow IOS
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: width - 20,
        marginHorizontal:10,
        elevation: 0 // This is for Android
    },
    cardInside: {
        borderWidth: 2, // Remove Border
        shadowColor: 'black', // Remove Shadow IOS
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        borderRadius: 20,
        marginHorizontal: 0,
        elevation: 0 // This is for Android
    },
    horizontalContent:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingEnd: 200
    },
    spaceHorizontal1:{
        flex: 1.5,
        alignItems:'center'
    },
    searchText:{
        color: 'black',
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: 'bold'
    },
});
