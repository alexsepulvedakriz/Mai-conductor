import React from 'react';
import {StyleSheet, View, Dimensions, Text, TouchableHighlight} from 'react-native';
import {Button, Card, Input} from 'react-native-elements';
import { colors } from '../common/theme';
import stylesCommon from '../common/styles';
import {offerUpdate, offerAdd, offerCancel} from "../actions/offer";
import { connect } from 'react-redux';
import {ListOfferModal, MapComponent, LoadOverlay, HeaderComponent} from '../components';
import {offerDriverAccept, offerDriverDecline, offerDriverStopLoad} from "../actions/offer_driver";
import  languageJSON  from '../common/language';
import Collapsible from "react-native-collapsible";


var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        offer: state.offer,
        driverOffer: state.offer_driver
    }
}
const mapDispatchToProps = dispatch => ({
    // para cambiar el precio y para cancelar la oferta
    updateOffer: (offer) => dispatch(offerUpdate(offer)),
    addOffer: (offer) => dispatch(offerAdd(offer)),
    cancelOffer: (info) => dispatch(offerCancel(info)),
    declineDriverOffer: (offer) => dispatch(offerDriverDecline(offer)),
    acceptDriverOffer: (offer) => dispatch(offerDriverAccept(offer)),
    cancelLoadDriverOffer: (infoCancel) => dispatch(offerDriverStopLoad(infoCancel))
});

class AcceptTripScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cardCollapsible: true,
            region: {
                latitude: this.props.offer.latitude_inicio,
                longitude: this.props.offer.longitude_inicio,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            },
        }
    }
    componentWillMount() {
        this.simpleTimer().then( _ => {
            this.setState({cardCollapsible: false});
        });
    }
    simpleTimer() {
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function(){ resolve(); }, 2000);
        });
        return promise;
    }
    // Contra ofertas
    acceptedOffer() {
        if(this.props.offer.loaded === true) {
            return(
                <View>
                    <Button
                        title={languageJSON.button_update}
                        titleStyle={{ fontWeight: '500' }}
                        linearGradientProps={{
                            colors: ['#245b84', '#3ea1c0'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        buttonStyle={[stylesCommon.buttonPositive]}
                        onPress={() => {this.continueOffer()}}
                    />
                </View>
            )
        } else {
            return(
                <View>
                    <Button
                        title={languageJSON.button_accept}
                        titleStyle={{ fontWeight: '500' }}
                        linearGradientProps={{
                            colors: ['#245b84', '#3ea1c0'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        buttonStyle={[stylesCommon.buttonPositive]}
                        onPress={() => {this.continueOffer()}}
                    />
                </View>
            )
        }
    }
    acceptOfferDriver(offerDriver){
        offerDriver.aceptada = true;
        this.props.acceptDriverOffer(offerDriver);
        this.props.navigation.navigate('Trip');
    }
    declineOfferDriver(offerDriver){
        offerDriver.declinada = true;
        this.props.declineDriverOffer(offerDriver);
    }
    showModalOfferDriver(){
        if(this.props.driverOffer.contra_ofertas){
            if(this.props.driverOffer.contra_ofertas.length > 0){
                let showModal = false;
                this.props.driverOffer.contra_ofertas.map(info => {
                    if(info.fecha && !info.declinada && !info.aceptada){
                        showModal = true;
                    }
                });
                return showModal;
            }
            return false;
        }
        return false;
    }
    //go to next step on offer
    comeBackOffer() {
        this.props.navigation.navigate('DataPackage');
    }
    continueOffer() {
        const offer = Object.assign({}, this.props.offer);
        delete offer.loading;
        delete offer.error;
        delete offer.loaded;
        this.props.addOffer(offer);
    }
    cancelLoadOfferDriver(){
        const infoCancel = {cancelado: true, id_pasajero: this.props.offer.id_pasajero};
        this.props.cancelOffer(infoCancel);
        this.props.cancelLoadDriverOffer();
    }
    updateOffer(object){
        this.props.updateOffer(object);
    }
    messageWaitOffersDrivers(){
        if(this.props.driverOffer.loading || this.props.driverOffer.loaded){
            return (
                <Text style={stylesCommon.messageWaitOfferDriversStyle}>{languageJSON.accept_offer_driver}</Text>
            )
        }
    }
    render() {
        var nearbyMarkers = this.state.nearby || [];
        return (
            <View style={stylesCommon.columnSpaceBetween}>
                <View style={stylesCommon.backgroundMap}>
                    <MapComponent
                        markerRef={marker => { this.marker = marker; }}
                        mapStyle={stylesCommon.map} mapRegion={this.state.region}
                        origen={{latitude: this.props.offer.latitude_inicio, longitude: this.props.offer.longitude_inicio}}
                        destination={{latitude: this.props.offer.latitude_fin, longitude: this.props.offer.longitude_fin}}
                        distance = {() => {}}
                    />
                </View>
                <View>
                    <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={'Viaje'} type={'color'}/>
                    {this.messageWaitOffersDrivers()}
                </View>
                <View>
                    <TouchableHighlight onPress={() => {this.setState({cardCollapsible: !this.state.cardCollapsible});}} style={{width: '100%'}} underlayColor={'transparent'}>
                        <Collapsible collapsed={this.state.cardCollapsible}
                                     collapsedHeight={50}
                        >
                            <Card containerStyle={styles.cardWithMargin}>
                                <View style={stylesCommon.rowSpaceAround}>
                                    <View
                                        style={{ backgroundColor: 'transparent', borderTopWidth: 4, borderColor: colors.GREY.secondary, width: 60, marginVertical: 0}}
                                    />
                                </View>
                                <View>
                                    <View style={stylesCommon.rowSpaceAround}>
                                        <Input
                                            value={this.props.offer.direccion_inicio}
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
                                            value={this.props.offer.direccion_fin}
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
                                    <View style={stylesCommon.rowSpaceBetween}>
                                        <Button
                                            title="- $200"
                                            titleStyle={{ fontWeight: '500' }}
                                            buttonStyle={{
                                                backgroundColor: '#d8d8d8',
                                                borderColor: 'transparent',
                                                borderWidth: 0,
                                                borderRadius: 10,
                                                paddingHorizontal:20
                                            }}
                                            onPress={()=> this.updateOffer({precio: parseInt(this.props.offer.precio, 10) - 200})}
                                        />
                                        <Button
                                            linearGradientProps={{
                                                colors: ['#245b84', '#3ea1c0'],
                                                start: [1, 0],
                                                end: [0.2, 0],
                                            }}
                                            title={'$ ' + this.props.offer.precio}
                                            buttonStyle={{
                                                borderWidth: 0,
                                                borderRadius: 10,
                                                paddingHorizontal:20
                                            }}
                                        />
                                        <Button
                                            title="+ $200"
                                            titleStyle={{ fontWeight: '500' }}
                                            buttonStyle={{
                                                backgroundColor: '#d8d8d8',
                                                borderColor: 'transparent',
                                                borderWidth: 0,
                                                borderRadius: 10,
                                                paddingHorizontal:20
                                            }}
                                            onPress={()=> this.updateOffer({precio: parseInt(this.props.offer.precio, 10) + 200})}
                                        />
                                    </View>
                                    {this.acceptedOffer()}
                                    <View>
                                        <Button
                                            title={languageJSON.button_come_back}
                                            titleStyle={{ fontWeight: '500' }}
                                            buttonStyle={stylesCommon.buttonNegative}
                                            onPress={() => {this.comeBackOffer()}}
                                        />
                                    </View>
                                </View>
                            </Card>
                        </Collapsible>
                    </TouchableHighlight>
                </View>
                <ListOfferModal modalVisible={this.showModalOfferDriver()}
                                data={this.props.driverOffer.contra_ofertas}
                                accept={(offerDriver) => this.acceptOfferDriver(offerDriver)}
                                decline={(offerDriver) => this.declineOfferDriver(offerDriver)}
                                cancel={() => this.cancelLoadOfferDriver()}/>
                <LoadOverlay Visible={this.props.offer.loading} message={languageJSON.send_offer}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptTripScreen);

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
