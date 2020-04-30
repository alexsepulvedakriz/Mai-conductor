import React from 'react';
import {ScrollView, Image, View, StyleSheet, Dimensions, Text} from 'react-native';
import {userSignUp} from "../actions/auth";
import {connect} from "react-redux";
import {Background} from "../components";
import { colors } from '../common/theme';
import languageJSON from "../common/language";
import stylesCommon from "../common/styles";
import {Button, Input} from "react-native-elements";
import {validateRut, validateConfPassword, validateEmail, validatePassword, validatePhoto, validateText} from "../functions/validations";

var { width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        auth: state.auth,
    }
}
const mapDispatchToProps = dispatch => ({
    signUp: (credentials) => dispatch(userSignUp(credentials))
});


class RegistrationPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            last_name:'',
            email:'',
            rut: '',
            movil:'',
            password:'',
            active: false,
            review: 5,
            confPassword:'',
            photo: null,
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
    render() {
        return (
            <View style={{height: '100%'}}>
                <Background>
                    <ScrollView>
                        <View style={styles.logo}>
                            <Image source={require('../../assets/images/logo.png')} />
                        </View>
                        <View style={[stylesCommon.columnSpaceBetween, {marginHorizontal: 40}]}>
                            <Text style={styles.headerStyle}>{languageJSON.registration_title}</Text>
                            <View>
                                <Input
                                    ref={input => (this.nameInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={languageJSON.first_name_placeholder}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.state.name}
                                    keyboardType={'email-address'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({name: text})}}
                                    errorMessage={this.state.name_valid ? null : languageJSON.first_name_blank_error}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({name_valid : validateText(this.state.name)}); this.nameInput.focus()}}
                                    errorStyle={styles.errorMessageStyle}
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
                                    value={this.state.last_name}
                                    keyboardType={'email-address'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({last_name: text})}}
                                    errorMessage={this.state.last_name_valid ? null : languageJSON.last_name_blank_error}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({last_name_valid : validateText(this.state.last_name)}); this.last_nameInput.focus()}}
                                    errorStyle={styles.errorMessageStyle}
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
                                    value={this.state.rut}
                                    keyboardType={'email-address'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({rut: text})}}
                                    errorMessage={this.state.rut_valid ? null : languageJSON.rut_blank_error}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({rut_valid : validateRut(this.state.rut)}); this.rutInput.focus()}}
                                    errorStyle={styles.errorMessageStyle}
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
                                    value={this.state.email}
                                    keyboardType={'email-address'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({email: text})}}
                                    errorMessage={this.state.email_valid ? null : languageJSON.valid_email_check}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({email_valid : validateEmail(this.state.email)}); this.emailInput.focus()}}
                                    errorStyle={styles.errorMessageStyle}
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
                                    value={this.state.movil}
                                    keyboardType={'number-pad'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({movil: text})}}
                                    errorMessage={this.state.movil_valid ? null : languageJSON.movil_no_blank_error}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({movil_valid : validateText(this.state.movil)}); this.movilInput.focus()}}
                                    errorStyle={styles.errorMessageStyle}
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
                                    value={this.state.password}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({password: text})}}
                                    errorMessage={this.state.password_valid ? null : this.state.pwdErrorMsg}
                                    secureTextEntry
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({password_valid : validatePassword(this.state.password)}); this.passwordInput.focus()}}
                                    errorStyle={styles.errorMessageStyle}
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
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({confPassword: text})}}
                                    errorMessage={this.state.cnf_pwd_valid ? null : languageJSON.confirm_password_not_match_err}
                                    secureTextEntry
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.setState({cnf_pwd_valid : validateText(this.state.confPassword)}); this.cnfPwdInput.focus() }}
                                    errorStyle={styles.errorMessageStyle}
                                    containerStyle={stylesCommon.textInputRegister}
                                    rightIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
                                />
                            </View>
                            <View >
                                <Button
                                    onPress={this._pickImage}
                                    title={languageJSON.upload_photo}
                                    titleStyle={styles.photoButtonTitle}
                                    buttonStyle={{
                                        backgroundColor: '#5ba2be',
                                        width: width-80,
                                        height: 40,
                                        borderColor: colors.TRANSPARENT,
                                        borderWidth: 0,
                                        borderRadius:10,
                                        marginVertical: 15
                                    }}
                                    icon={{ type: 'font-awesome', name: 'image', color: 'white' }}
                                    iconRight={true}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={()=>{this.props.navigation.navigate('RegisterDriver')}}
                                    title={languageJSON.button_continue}
                                    titleStyle={{
                                        color: colors.BLUE.Deep_Blue,
                                        fontWeight: "600",
                                        fontSize: 14}}
                                    buttonStyle={{
                                        backgroundColor: colors.WHITE,
                                        width: '100%',
                                        height: 50,
                                        borderColor: colors.TRANSPARENT,
                                        borderWidth: 0,
                                        borderRadius:30,
                                        marginVertical: 15
                                    }}
                                />
                            </View>
                            <View>
                                <Button
                                    title={languageJSON.come_back_button}
                                    titleStyle={styles.volverTitleStyle}
                                    buttonStyle={{
                                        backgroundColor: '#3ea1c0',
                                        borderColor: 'white',
                                        width: '100%',
                                        borderWidth: 2,
                                        borderRadius: 30,
                                        marginVertical: 15
                                    }}
                                />
                            </View>
                            <View style={styles.gapView}/>
                        </View>
                    </ScrollView>
                </Background>
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);

const styles = StyleSheet.create({
    logo:{
        marginVertical:50,
        width:'100%',
        justifyContent:"flex-end",
        alignItems:'center'
    },
    headerStyle:{
        fontSize:18,
        color:colors.WHITE,
        textAlign:'center',
        flexDirection:'row',
        marginTop:0
    },
    InputContainer: {
        borderRadius:10,
        backgroundColor: colors.FOURTH,
        width: width-40,
        marginBottom: 10
    },
    inputTextStyle: {
        color:colors.WHITE,
        fontSize:15
    },
    emailInputContainerStyle: {
        paddingBottom: 15
    },
    pwdInputContainerStyle: {
        paddingBottom: 15
    },
    verticalLineStyle: {
        height: 25,
        width:2,
        top: 12,
        backgroundColor: colors.WHITE
    },
    buttonTitleStyle: {
        fontWeight: "700",
        width:"100%",
        color: 'white'
    },
    forgotTitleStyle: {
        fontWeight: "500",
        fontSize: 16,
        width:"100%"
    }
});
