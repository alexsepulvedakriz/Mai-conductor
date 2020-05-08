import React from 'react';
import {View, Dimensions, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import  languageJSON  from '../common/language';
import { colors } from '../common/theme';
import stylesCommon from '../common/styles';
import {HeaderComponent} from "../components";
import {vehiclesAdd, vehiclesLoad} from "../actions/vehicles";
import {Avatar, Button, Rating} from "react-native-elements";
import {AddVehicleModal} from "../modals";

var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        vehicles: state.vehicles,
        auth: state.auth,
    }
}
const mapDispatchToProps = dispatch => ({
    vehiclesAddProps: (vehicle) => dispatch(vehiclesAdd(vehicle)),
    vehicleLoadProps: (id_driver) => dispatch(vehiclesLoad(id_driver))
});

class VehiclesScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show_modal_add_vehicle: false
        }
    }
    componentWillMount() {
        this.props.vehicleLoadProps(this.props.auth.id_driver);
    }
    listVehicles(){
        if(this.props.vehicles.vehicles.length > 0){
            return (
                <View>
                    {
                        this.props.vehicles.vehicles.map((item, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[ { flexDirection: 'row', width: '100%',borderBottomWidth: 1, borderColor: colors.GREY.Deep_Nobel,}]}
                            >
                                <View style={{marginVertical: 10, marginHorizontal: 10}}>
                                    <Avatar
                                        source={{
                                            uri: item.ref_photo_vehicle,
                                        }}
                                        rounded
                                        size={"medium"}
                                    />
                                    <Text style={{marginTop: 5, fontSize: 10, color: colors.GREY.iconSecondary, textAlign: 'center'}}>{item.model}</Text>
                                </View>
                                <View style={{marginVertical: 10, marginLeft: 5}}>
                                    <Text style={{fontSize: 18, color: 'black'}}>{item.car_make}</Text>
                                    <Text style={{fontSize: 18, color: 'black'}}>{item.type}</Text>
                                    <Text style={{fontSize: 14, color: colors.GREY.iconSecondary}}>${item.year}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            )
        } else {
            return(
                <View style={{marginVertical: 30}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot){
    }
    render() {
        return (
            <View>
                <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={languageJSON.my_vehicles_header} type={'color'}/>
                <View style={stylesCommon.columnSpaceBetween}>
                    <View style={{height: height - 200}}>
                        {this.listVehicles()}
                    </View>
                    <View style={{width: width - 40, marginHorizontal: 20}}>
                        <Button
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            title={languageJSON.add_new_vehicle}
                            buttonStyle={stylesCommon.buttonPositive}
                            onPress={() => {this.setState({show_modal_add_vehicle: true})}}
                        />
                    </View>
                </View>
                <AddVehicleModal
                    modalVisible={this.state.show_modal_add_vehicle}
                    close={() => this.setState({show_modal_add_vehicle: false})}
                    addVehicle={(licence_plate, year, type, car_make, vehicle_roll, annotation_certificate, photo_authorization, photo_vehicle, permission_to_circulate, model) => {this.setState({show_modal_add_vehicle: false, allow_add_vehicle: true});
                        this.props.vehiclesAddProps(licence_plate, year, type, car_make, vehicle_roll, annotation_certificate, photo_authorization, photo_vehicle, permission_to_circulate, model)}}
                />
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesScreen);
