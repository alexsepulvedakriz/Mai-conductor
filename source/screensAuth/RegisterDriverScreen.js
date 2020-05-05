import React from 'react';
import {Image, ScrollView, Text, View, Picker} from 'react-native';
import {connect} from "react-redux";
import {Background} from "../components";
import stylesCommon from "../common/styles";
import languageJSON from "../common/language";
import {Button, Input} from "react-native-elements";
import {colors} from "../common/theme";
import {documentPicker} from '../functions/documentPicker';
import {updateNewDriverState} from "../actions/auth";
import {
    validateConfPassword,
    validateEmail, validateFile,
    validatePassword,
    validateRut,
    validateText
} from "../functions/validations";

const mapStateToProps = state => {
    return{
        auth: state.auth,
    }
}
const mapDispatchToProps = dispatch => ({
    updateNewDriverStateProps: (new_driver) => dispatch(updateNewDriverState(new_driver))
});


class RegistrationPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showErrorMessage: false
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
    }
    validateInputs(){
        const typeLicence = validateText(this.props.auth.new_driver.type_licence);
        const photoDriverLicence = validateFile(this.props.auth.new_driver.photo_driver_licence);
        const fileCriminalRecord = validateFile(this.props.auth.new_driver.file_criminal_record);
        const idCard = validateFile(this.props.auth.new_driver.photo_id_card);
        const photoDriver = validateFile(this.props.auth.new_driver.photo_driver);
        // validar las reglas, falta confirmar la foto
        if ( typeLicence && photoDriverLicence && photoDriver && fileCriminalRecord && idCard) {
            this.props.navigation.navigate('RegisterVehicle');
            this.setState({showErrorMessage: false})
        } else {
            this.setState({showErrorMessage: true})
        }
    }
    showErrorMessage(){
        if(this.state.showErrorMessage){
            return(
                <Text style={{color: 'white', fontSize: 12}}>*Campo obligatorio</Text>
            )
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
                            <Text style={stylesCommon.headerTitleStyle}>{languageJSON.registration_driver}</Text>
                            <View style={[{borderColor: colors.GREY.Deep_Nobel, borderWidth: 1, borderRadius: 10, marginBottom: 15, height: 45}, stylesCommon.buttonRegisterInput]}>
                                <Picker
                                    selectedValue={this.props.auth.new_driver.type_licence}
                                    style={{color: 'white', padding: 0, textAlign: 'center'}}
                                    onValueChange={(itemValue, itemIndex) => {this.props.updateNewDriverStateProps({type_licence: itemValue})}}
                                >
                                    <Picker.Item label={'A4'}  value={'a4'} />
                                    <Picker.Item label={'B'}  value={'b'} />
                                    <Picker.Item label={'C'}  value={'c'} />
                                    <Picker.Item label={'A5'}  value={'a5'} />
                                </Picker>
                                {this.showErrorMessage()}
                            </View>
                            <View >
                                <Button
                                    onPress={() => documentPicker().then(res => this.props.updateNewDriverStateProps({photo_driver_licence: res}))}
                                    title={languageJSON.register_upload_driver_licence}
                                    titleStyle={stylesCommon.buttonRegisterTitle}
                                    buttonStyle={stylesCommon.buttonRegisterInput}
                                    icon={{ type: 'font-awesome', name: 'image', color: 'white' }}
                                    iconRight={true}
                                />
                                {this.showErrorMessage()}
                            </View>
                            <View >
                                <Button
                                    onPress={() => documentPicker().then(res => this.props.updateNewDriverStateProps({file_criminal_record: res}))}
                                    title={languageJSON.register_upload_criminal_record}
                                    titleStyle={stylesCommon.buttonRegisterTitle}
                                    buttonStyle={stylesCommon.buttonRegisterInput}
                                    icon={{ type: 'font-awesome', name: 'file-pdf-o', color: 'white' }}
                                    iconRight={true}
                                />
                                {this.showErrorMessage()}
                            </View>
                            <View >
                                <Button
                                    onPress={() => documentPicker().then(res => {this.props.updateNewDriverStateProps({photo_id_card: res}); console.log('res')})}
                                    title={languageJSON.register_upload_id_card}
                                    titleStyle={stylesCommon.buttonRegisterTitle}
                                    buttonStyle={stylesCommon.buttonRegisterInput}
                                    icon={{ type: 'font-awesome', name: 'file-pdf-o', color: 'white' }}
                                    iconRight={true}
                                />
                                {this.showErrorMessage()}
                            </View>
                            <View >
                                <Button
                                    onPress={() => documentPicker().then(res => this.props.updateNewDriverStateProps({photo_driver: res}))}
                                    title={languageJSON.register_upload_photo_driver}
                                    titleStyle={stylesCommon.buttonRegisterTitle}
                                    buttonStyle={stylesCommon.buttonRegisterInput}
                                    icon={{ type: 'font-awesome', name: 'image', color: 'white' }}
                                    iconRight={true}
                                />
                                {this.showErrorMessage()}
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
                                    onPress={()=>{this.props.navigation.navigate('RegisterUser')}}
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
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
