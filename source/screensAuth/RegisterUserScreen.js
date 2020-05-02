import React from 'react';
import {ScrollView, Image, View, Dimensions, Text} from 'react-native';
import {connect} from "react-redux";
import {Background} from "../components";
import { colors } from '../common/theme';
import languageJSON from "../common/language";
import stylesCommon from "../common/styles";
import {Button, Input} from "react-native-elements";
import {validateRut, validateConfPassword, validateEmail, validatePassword, validateText} from "../functions/validations";
import {authCleanStore, updateNewUserState} from "../actions/auth";

var { width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        auth: state.auth,
    }
}
const mapDispatchToProps = dispatch => ({
    updateNewUserStateProps: (new_user) => dispatch(updateNewUserState(new_user)),
    cleanStore: () => dispatch(authCleanStore())
});

class RegistrationUserScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            confPassword: '',
            // validation
            name_valid: true,
            rut_valid: true,
            last_name_valid: true,
            movil_valid: true,
            email_valid: true,
            password_valid: true,
            cnf_pwd_valid: true,
            photo_valid: true,
            pwdErrorMsg: ''
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
    }
    validateInputs(){
        const nombreValid = validateText(this.props.auth.new_user.name);
        const apellidoValid = validateText(this.props.auth.new_user.last_name);
        const emailValid = validateEmail(this.props.auth.new_user.email);
        const movilValid = validateText(this.props.auth.new_user.movil);
        const passwordValid = validatePassword(this.props.auth.new_user.password);
        const cnfPwdValid = validateConfPassword(this.props.auth.new_user.password, this.state.confPassword);
        const rutValid = validateRut(this.props.auth.new_user.rut);
        // validar las reglas, falta confirmar la foto
        if ( nombreValid && apellidoValid && emailValid && movilValid && passwordValid && cnfPwdValid && rutValid) {
            this.props.navigation.navigate('RegisterDriver');
        }
        this.props.navigation.navigate('RegisterDriver');
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
                            <Text style={stylesCommon.headerTitleStyle}>{languageJSON.registration_user}</Text>
                            <View>
                                <Input
                                    ref={input => (this.nameInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={languageJSON.first_name_placeholder}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.props.auth.new_user.name}
                                    keyboardType={'email-address'}
                                    inputStyle={stylesCommon.inputRegisterStyle}
                                    onChangeText={(text)=>{this.props.updateNewUserStateProps({name: text})}}
                                    errorMessage={this.state.name_valid ? null : languageJSON.first_name_blank_error}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({name_valid : validateText(this.props.auth.new_user.name)}); this.nameInput.focus()}}
                                    errorStyle={stylesCommon.errorMessageStyle}
                                    containerStyle={stylesCommon.textInputRegister}
                                    rightIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
                                />
                            </View>
                            <View>
                                <Input
                                    ref={input => (this.last_nameInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={languageJSON.last_name_placeholder}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.props.auth.new_user.last_name}
                                    keyboardType={'email-address'}
                                    inputStyle={stylesCommon.inputRegisterStyle}
                                    onChangeText={(text)=>{this.props.updateNewUserStateProps({last_name: text})}}
                                    errorMessage={this.state.last_name_valid ? null : languageJSON.last_name_blank_error}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({last_name_valid : validateText(this.props.auth.new_user.last_name)}); this.last_nameInput.focus()}}
                                    errorStyle={stylesCommon.errorMessageStyle}
                                    containerStyle={stylesCommon.textInputRegister}
                                    rightIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
                                />
                            </View>
                            <View >
                                <Input
                                    ref={input => (this.rutInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={languageJSON.rut_placeholder}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.props.auth.new_user.rut}
                                    keyboardType={'email-address'}
                                    inputStyle={stylesCommon.inputRegisterStyle}
                                    onChangeText={(text)=>{this.props.updateNewUserStateProps({rut: text})}}
                                    errorMessage={this.state.rut_valid ? null : languageJSON.rut_blank_error}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({rut_valid : validateRut(this.props.auth.new_user.rut)}); this.rutInput.focus()}}
                                    errorStyle={stylesCommon.errorMessageStyle}
                                    containerStyle={stylesCommon.textInputRegister}
                                    rightIcon={{ type: 'font-awesome', name: 'id-card', color: 'white' }}
                                />
                            </View>
                            <View >
                                <Input
                                    ref={input => (this.emailInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={languageJSON.email_placeholder}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.props.auth.new_user.email}
                                    keyboardType={'email-address'}
                                    inputStyle={stylesCommon.inputRegisterStyle}
                                    onChangeText={(text)=>{this.props.updateNewUserStateProps({email: text})}}
                                    errorMessage={this.state.email_valid ? null : languageJSON.valid_email_check}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({email_valid : validateEmail(this.props.auth.new_user.email)}); this.emailInput.focus()}}
                                    errorStyle={stylesCommon.errorMessageStyle}
                                    containerStyle={stylesCommon.textInputRegister}
                                    rightIcon={{ type: 'font-awesome', name: 'envelope-o', color: 'white' }}
                                />
                            </View>
                            <View >
                                <Input
                                    ref={input => (this.movilInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={languageJSON.movil_no_placeholder}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.props.auth.new_user.movil}
                                    keyboardType={'number-pad'}
                                    inputStyle={stylesCommon.inputRegisterStyle}
                                    onChangeText={(text)=>{this.props.updateNewUserStateProps({movil: text})}}
                                    errorMessage={this.state.movil_valid ? null : languageJSON.movil_no_blank_error}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({movil_valid : validateText(this.props.auth.new_user.movil)}); this.movilInput.focus()}}
                                    errorStyle={stylesCommon.errorMessageStyle}
                                    containerStyle={stylesCommon.textInputRegister}
                                    rightIcon={{ type: 'font-awesome', name: 'mobile-phone', color: 'white' }}
                                />
                            </View>
                            <View >
                                <Input
                                    ref={input => (this.passwordInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={languageJSON.password_placeholder}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.props.auth.new_user.password}
                                    inputStyle={stylesCommon.inputRegisterStyle}
                                    onChangeText={(text)=>{this.props.updateNewUserStateProps({password: text})}}
                                    errorMessage={this.state.password_valid ? null : this.state.pwdErrorMsg}
                                    secureTextEntry
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({password_valid : validatePassword(this.props.auth.new_user.password)}); this.passwordInput.focus()}}
                                    errorStyle={stylesCommon.errorMessageStyle}
                                    containerStyle={stylesCommon.textInputRegister}
                                    rightIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
                                />
                            </View>
                            <View >
                                <Input
                                    ref={input => (this.cnfPwdInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={languageJSON.confirm_password_placeholder}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.state.confPassword}
                                    inputStyle={stylesCommon.inputRegisterStyle}
                                    onChangeText={(text)=>{this.setState({confPassword: text})}}
                                    errorMessage={this.state.cnf_pwd_valid ? null : languageJSON.confirm_password_not_match_err}
                                    secureTextEntry
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({cnf_pwd_valid : validateConfPassword(this.state.confPassword)}); this.cnfPwdInput.focus() }}
                                    errorStyle={stylesCommon.errorMessageStyle}
                                    containerStyle={stylesCommon.textInputRegister}
                                    rightIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
                                />
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
                                    onPress={()=>{this.props.navigation.navigate('Login'); this.props.cleanStore()}}
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
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationUserScreen);
