import React from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Platform,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Image, Text, ActivityIndicator
} from 'react-native';
import {MapComponent, LocationInputModal, HeaderComponent, DatePickerOverlay} from '../components';
import {Button, Card, Input} from 'react-native-elements';
import { colors } from '../common/theme';
import * as Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {offerUpdate} from "../actions/offer";
import { connect } from 'react-redux';
import stylesCommon from "../common/styles";
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import languageJSON from "../common/language";

var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        profile: state.profile,
        offer: state.offer
    }
};
const mapDispatchToProps = dispatch => ({
    updateOffer: (offer) => dispatch(offerUpdate(offer)),
});

class MapScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        loadingModal:false,
        modalInit: false,
        modalEnd: false,
        cardCollapsible: true,
        region: {
            latitude: -33.4724228,
            longitude: -70.769914,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        loaded: false,
        datePicker: false
    }

  }
    updateOffer(){
        const data = {
            id_pasajero: this.props.profile.id_pasajero,
            nombre_pasajero: this.props.profile.nombre + " " + this.props.profile.apellido,
            evaluacion_pasajero: this.props.profile.evaluacion,
            movil_pasajero: this.props.profile.movil,
            conductores_bloqueados: this.props.profile.conductores_bloqueados,
            fecha: new Date()
        };
        this.props.updateOffer(data);
    }
    //go to next step on offer
   continueOffer() {
        if(this.props.offer.latitude_inicio && this.props.offer.latitude_fin) {
            this.updateOffer();
            this.props.navigation.navigate('TypeTruck');
        } else {
            alert('Ingresa Origen Destino');
        }
    }
 // determina la posciion
  componentDidMount() {
      this._getLocationAsync();
      this.simpleTimer().then( _ => {
          this.setState({cardCollapsible: false, loaded: true});
      });
  }

    simpleTimer() {
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function(){ resolve(); }, 4000);
        });
        return promise;
    }
   _getLocationAsync = async () => {
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
             if(pos){
                 this.setState({
                     region: {
                         latitude: pos.latitude,
                         longitude: pos.longitude,
                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421,
                     }
                 })
            }
          }
   }
   // modal direcciones
    closeModal(){
        this.setState({modalEnd: false, modalInit: false});
    }
   updateInit(direccion, coordenadas) {
       this.setState({modalInit: false});
       const coordenadasFormatoMapsDirections =  {latitude: coordenadas.lat, longitude: coordenadas.lng};
       const data = {
           geohash_inicio: coordenadasFormatoMapsDirections,
           direccion_inicio: direccion,
           latitude_inicio: coordenadas.lat,
           longitude_inicio: coordenadas.lng
       };
       this.props.updateOffer(data);
   }
    updateEnd(direccion, coordenadas) {
        this.setState({modalEnd: false});
        const coordenadasFormatoMapsDirections =  {latitude: coordenadas.lat, longitude: coordenadas.lng};
        const data = {
            geohash_fin: coordenadasFormatoMapsDirections,
            direccion_fin: direccion,
            latitude_fin: coordenadas.lat,
            longitude_fin: coordenadas.lng
        };
        this.props.updateOffer(data);
    }
    addDistance(distance){
      const data = {
          distancia: distance
      };
        this.props.updateOffer(data);
    }
    _onPress = () => {
        this.AnimationRef.pulse();
        this.setState({datePicker: true})
    }
    loadOrNot(){
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        const nearbyMarkers = this.state.nearby || [];
        if(this.state.loaded){
            return(
                <View style={stylesCommon.backgroundMap}>
                    <MapComponent
                        markerRef={marker => { this.marker = marker; }}
                        mapStyle={stylesCommon.map}
                        mapRegion={this.state.region}
                        nearby = {nearbyMarkers}
                        origen={{latitude: this.props.offer.latitude_inicio, longitude: this.props.offer.longitude_inicio}}
                        destination={{latitude: this.props.offer.latitude_fin, longitude: this.props.offer.longitude_fin}}
                        distance = {(distance) => this.addDistance(distance)}
                    />
                </View>
            )
        } else {
            return(
                <View style={{marginVertical: 90}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
    }
  render() {
    return (
      <View style={stylesCommon.columnSpaceBetween}>
        <View style={stylesCommon.backgroundMap}>
            {this.loadOrNot()}
        </View>
        <View>
            <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={'ProCarga'} type={'color'}/>
        </View>
        <View>
            <TouchableHighlight onPress={() => {this.setState({cardCollapsible: !this.state.cardCollapsible});}} onLongPress={() => {this.setState({cardCollapsible: !this.state.cardCollapsible});}} style={{width: '100%'}} underlayColor={'transparent'}>
                <Collapsible collapsed={this.state.cardCollapsible}
                             collapsedHeight={50}
                >
                    <Card containerStyle={styles.cardWithMargin}>
                        <View style={stylesCommon.rowSpaceAround}>
                            <View
                                style={{ backgroundColor: 'transparent', borderTopWidth: 4, borderColor: colors.GREY.secondary, width: 60, marginVertical: 0}}
                            />
                        </View>
                        <View style={stylesCommon.rowSpaceAround}>
                            <TouchableOpacity onPress={() => this.setState({modalInit: true})} style={{width: '100%'}}>
                                <Input
                                    placeholder='Desde'
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
                            </TouchableOpacity>
                        </View>
                        <View style={stylesCommon.rowSpaceAround}>
                            <TouchableOpacity onPress={() => this.setState({modalEnd: true})} style={{width: '100%'}}>
                                <Input
                                    placeholder='Hasta'
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
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonsContainer2}>
                            <Animatable.View ref={ref => (this.AnimationRef = ref)}>
                                <Button
                                    onPress={this._onPress}
                                    icon={{
                                        name: 'calendar',
                                        type: 'font-awesome',
                                        size: 15,
                                        color: 'white',
                                    }}
                                    linearGradientProps={{
                                        colors: ['#245b84', '#3ea1c0'],
                                        start: [1, 0],
                                        end: [0.2, 0],
                                    }}
                                    title='Agendar'
                                    buttonStyle={{
                                        borderWidth: 0,
                                        borderRadius: 10,
                                        paddingHorizontal: 15,
                                        width: width/2 - 30
                                    }}
                                    underlayColor="transparent"
                                />
                            </Animatable.View>

                            <Button
                                title="Solicitar ahora"
                                titleStyle={{ fontWeight: '500' }}
                                onPress={()=>{this.continueOffer()}}
                                buttonStyle={{
                                    backgroundColor: '#f7ab00',
                                    borderColor: 'transparent',
                                    borderWidth: 0,
                                    borderRadius: 10,
                                    paddingHorizontal: 30,
                                    width: width/2 - 30
                                }}
                            />
                        </View>
                    </Card>
                </Collapsible>
            </TouchableHighlight>
          </View>
          <DatePickerOverlay Visible={this.state.datePicker} close={() => this.setState({datePicker: false})}/>
          <LocationInputModal modalVisible={this.state.modalInit} direccion={(direccion, coordenadas) => this.updateInit(direccion, coordenadas)} close={() => this.closeModal()}/>
          <LocationInputModal modalVisible={this.state.modalEnd} direccion={(direccion, coordenadas) => this.updateEnd(direccion, coordenadas)} close={() => this.closeModal()}/>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

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
    buttonsContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop:10
    }
});
