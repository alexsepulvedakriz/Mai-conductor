import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {connect} from "react-redux";
import {Background} from "../components";
import stylesCommon from "../common/styles";
import languageJSON from "../common/language";
import {colors} from "../common/theme";
import {Button, CheckBox} from "react-native-elements";
import {AddVehicleModal, TermsAndConditions} from '../modals';
import {updateNewVehicleState, userSignUp} from "../actions/auth";
import {LoadOverlay} from "../overlays";
import {vehiclesAdd} from "../actions/vehicles";


const mapStateToProps = state => {
    return{
        auth: state.auth,
    }
}
const mapDispatchToProps = dispatch => ({
    updateNewVehicleStateProps: (new_vehicle) => dispatch(updateNewVehicleState(new_vehicle)),
    vehiclesAddProps: (vehicle) => dispatch(vehiclesAdd(vehicle)),
    userSignUpProps: (user) => dispatch(userSignUp(user))
});


class RegistrationPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show_modal_terms_and_conditions: false,
            show_modal_add_vehicle: false,
            accept_terms_and_conditions: false,
            allow_add_vehicle: false
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.auth.sing_up_loaded){
            alert(languageJSON.register_success);
            this.props.navigation.navigate('Login');
        }
        if (this.props.auth.sing_up_error){
            alert(languageJSON.register_fail);
        }
    }
    addVehicle(licence_plate, year, type, car_make, vehicle_roll, annotation_certificate, photo_authorization, photo_vehicle, permission_to_circulate, model){
        const new_vehicle = {
            licence_plate: licence_plate,
            year: year,
            type: type,
            car_make: car_make,
            vehicle_roll: vehicle_roll,
            annotation_certificate: annotation_certificate,
            photo_authorization: photo_authorization,
            photo_vehicle: photo_vehicle,
            permission_to_circulate: permission_to_circulate,
            model: model,
        };
        this.props.updateNewVehicleStateProps(new_vehicle);
    }
    validateInputs(){
        // validar las reglas, falta confirmar la foto
        if ( this.state.accept_terms_and_conditions && this.state.allow_add_vehicle) {
            this.props.userSignUpProps({new_user: this.props.auth.new_user, new_vehicle: this.props.auth.new_vehicle, new_driver: this.props.auth.new_driver });
            this.props.vehiclesAddProps(this.props.auth.new_vehicle);
        } else{

        }
    }
    render() {
        return (
            <View style={{height: '100%'}}>
                <Background>
                    <ScrollView>
                        <View style={stylesCommon.imageRegister}>
                            <Image source={require('../../assets/images/logo.png')} />
                        </View>
                        <View style={[stylesCommon.columnSpaceBetween, {marginHorizontal: 40}]}>
                            <Text style={stylesCommon.headerTitleStyle}>{languageJSON.registration_vehicle}</Text>
                            <View >
                                <Button
                                    onPress={() => this.setState({show_modal_add_vehicle: true})}
                                    title={languageJSON.register_add_new_vehicle}
                                    titleStyle={stylesCommon.buttonRegisterTitle}
                                    buttonStyle={stylesCommon.buttonRegisterInput}
                                    icon={{ type: 'font-awesome', name: 'plus-square', color: 'white' }}
                                    iconRight={true}
                                />
                            </View>
                            <View style={{
                                flexDirection:'row',
                                alignItems: "center",
                                marginLeft:20,
                                marginRight:20,
                            }}>
                                <CheckBox
                                    checked={this.state.accept_terms_and_conditions}
                                    checkedColor={'white'}
                                    uncheckedColor={'white'}
                                    onPress={()=>{this.setState({accept_terms_and_conditions: !this.state.accept_terms_and_conditions})}}
                                />
                                <Text
                                    style={stylesCommon.buttonRegisterTitle}
                                    onPress={() => {this.setState({show_modal_terms_and_conditions: true})}}>{languageJSON.terminos_condiciones_link}</Text>
                            </View>
                            <View>
                                <Button
                                    onPress={()=>{this.validateInputs()}}
                                    title={languageJSON.button_continue}
                                    titleStyle={{
                                        color: colors.BLUE.Deep_Blue,
                                        fontWeight: "600",
                                        fontSize: 14}}
                                    buttonStyle={stylesCommon.buttonRegisterWhite}
                                />
                            </View>
                            <View>
                                <Button
                                    onPress={()=>{this.props.navigation.navigate('RegisterDriver')}}
                                    title={languageJSON.come_back_button}
                                    titleStyle={{
                                        fontWeight: "500",
                                        fontSize: 16,
                                        width:"100%",
                                    }}
                                    buttonStyle={stylesCommon.buttonRegisterTransparent}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </Background>
                <TermsAndConditions
                    modalVisible={this.state.show_modal_terms_and_conditions}
                    close={() => this.setState({show_modal_terms_and_conditions: false})}
                    accept={() => this.setState({show_modal_terms_and_conditions: false, accept_terms_and_conditions: true})}
                />
                <AddVehicleModal
                    modalVisible={this.state.show_modal_add_vehicle}
                    close={() => this.setState({show_modal_add_vehicle: false})}
                    addVehicle={(licence_plate, year, type, car_make, vehicle_roll, annotation_certificate, photo_authorization, photo_vehicle, permission_to_circulate, model) => {this.setState({show_modal_add_vehicle: false, allow_add_vehicle: true});
                        this.addVehicle(licence_plate, year, type, car_make, vehicle_roll, annotation_certificate, photo_authorization, photo_vehicle, permission_to_circulate, model)}}
                />
                <LoadOverlay message={languageJSON.register_loading} Visible={this.props.auth.sing_up_loading}/>
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
