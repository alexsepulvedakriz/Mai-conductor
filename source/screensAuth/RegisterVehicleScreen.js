import React from 'react';
import {Image, Picker, ScrollView, Text, View} from 'react-native';
import {connect} from "react-redux";
import {Background} from "../components";
import stylesCommon from "../common/styles";
import languageJSON from "../common/language";
import {colors} from "../common/theme";
import {Button, CheckBox} from "react-native-elements";
import {AddVehicleModal, TermsAndConditions} from '../modals';
import {updateNewVehicleState, userSignUp} from "../actions/auth";
import {validateFile, validateText} from "../functions/validations";


const mapStateToProps = state => {
    return{
        auth: state.auth,
    }
}
const mapDispatchToProps = dispatch => ({
    updateNewVehicleStateProps: (new_vehicle) => dispatch(updateNewVehicleState(new_vehicle)),
    userSignUpProps: (user) => dispatch(userSignUp(user))
});


class RegistrationPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show_modal_terms_and_conditions: false,
            show_modal_add_vehicle: false,
            accept_terms_and_conditions: false
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
    }
    validateInputs(){
        const anyInformation = validateText(this.props.auth.new_vehicle.annotation_certificate);
        // validar las reglas, falta confirmar la foto
        if ( this.state.accept_terms_and_conditions && anyInformation) {
            this.props.userSignUpProps({new_user: this.props.auth.new_user, new_vehicle: this.props.auth.new_vehicle, new_driver: this.props.auth.new_driver })
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
                    addVehicle={(licence_plate, year, type, car_make, vehicle_roll, annotation_certificate, photo_authorization, photo_vehicle, permission_to_circulate, model) => {this.setState({show_modal_add_vehicle: false});
                        this.props.updateNewVehicleStateProps(licence_plate, year, type, car_make, vehicle_roll, annotation_certificate, photo_authorization, photo_vehicle, permission_to_circulate, model)}}
                />
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
