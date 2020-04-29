import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { colors } from '../common/theme';
import { tripLoad} from "../actions/trip";
import stylesCommon from '../common/styles';
import { connect } from 'react-redux';
import {HeaderComponent, SmallMapComponent} from "../components";
import {RideDetailModal} from '../modals'


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
        this.props.loadTrip({id_driver: this.props.profile.profile.id_driver});
        console.log('trip id', this.props.profile.profile.id_driver);
        console.log('trip detail', this.props.trip);
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
        if(this.props.trip.trips){
            if(this.props.trip.trips.length > 0){
                return(
                    this.props.trip.trips.map((item, i) => (
                        <TouchableOpacity key={i} onPress={() => {this.setState({item: item, showDetail: true})}}>
                            <View >
                                <View style={ {marginHorizontal: 20, marginVertical: 10}}>
                                    <View style={[stylesCommon.rowSpaceBetween ]}>
                                        <Text style={{fontSize:16 , color: colors.BLACK}}>{this.date(item.date)}</Text>
                                        <Text style={{fontSize:16, color: colors.BLACK}}>CLP ${item.price}</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize:14, color: colors.GREY.Deep_Nobel}}>{item.vehicle} {item.name_driver} {item.last_name_driver}</Text>
                                    </View>
                                </View>
                                <View style={{height: 200}}>
                                    <SmallMapComponent
                                        markerRef={marker => { this.marker = marker; }}
                                        mapStyle={stylesCommon.map}
                                        mapRegion={region}
                                        origen={{latitude: item.latitude_init, longitude: item.longitude_init}}
                                        destination={{latitude: item.latitude_end, longitude: item.longitude_end}}
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
