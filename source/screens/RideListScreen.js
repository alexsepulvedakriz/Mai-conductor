import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { colors } from '../common/theme';
import { tripLoad} from "../actions/trip";
import stylesCommon from '../common/styles';
import { connect } from 'react-redux';
import {HeaderComponent, SmallMapComponent, RideDetailModal} from "../components";;


const mapStateToProps = state => {
    return{
        profile: state.profile,
        trip: state.trip
    }
}
const mapDispatchToProps = dispatch => ({
    // para cambiar el precio y para cancelar la oferta
    loadTrip:(info) => dispatch(tripLoad(info))
});

class RideListPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item: null,
            showDetail: false
        }
        this.props.loadTrip({id_pasajero: this.props.profile.id_pasajero,});
    }
    date(date){
        const a = new Date(date.seconds * 1000);
        const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date2 = a.getDate();
        const time = date2 + ' ' + month + ' ' + year;
        return(time);
    }
    listTrips(){
        let region = {
            latitude: -33.4488897,
            longitude: -70.66926,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        if(this.props.trip.viajes){
            if(this.props.trip.viajes.length > 0){
                return(
                    this.props.trip.viajes.map((item, i) => (
                        <TouchableOpacity key={i} onPress={() => {this.setState({item: item, showDetail: true})}}>
                            <View >
                                <View style={ {marginHorizontal: 20, marginVertical: 10}}>
                                    <View style={[stylesCommon.rowSpaceBetween ]}>
                                        <Text style={{fontSize:16 , color: colors.BLACK}}>{this.date(item.fecha)}</Text>
                                        <Text style={{fontSize:16, color: colors.BLACK}}>CLP ${item.precio}</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize:14, color: colors.GREY.Deep_Nobel}}>{item.vehiculo} {item.nombre_conductor}</Text>
                                    </View>
                                </View>
                                <View style={{height: 200}}>
                                    <SmallMapComponent
                                        markerRef={marker => { this.marker = marker; }}
                                        mapStyle={stylesCommon.map}
                                        mapRegion={region}
                                        origen={{latitude: item.latitude_inicio, longitude: item.longitude_inicio}}
                                        destination={{latitude: item.latitude_fin, longitude: item.longitude_fin}}
                                        distance = {() => {}}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )

            } else {
                return (
                    <View style={{marginVertical: 90}}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )
            }
        }
    }
  render() {
    return (
        <View>
            <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={'Detalles viajes'} type={'color'}/>
            <View>
                {this.listTrips()}
            </View>
            <RideDetailModal Visable={this.state.showDetail} item={this.state.item} close={() => {this.setState({showDetail: false})}}></RideDetailModal>
        </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RideListPage);
