import React, { Component } from 'react';
import {StyleSheet, View, Dimensions, LayoutAnimation} from 'react-native';
import {Input, Button, Text, SearchBar} from 'react-native-elements';
import {  colors } from '../common/theme';
var { width } = Dimensions.get('window');
import  languageJSON  from '../common/language';
import stylesCommon from "../common/styles";

export default class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'alexander.sepulveda@ug.uchile.cl',
            password:'S@1234',
            emailValid: true,
            passwordValid: true,
            pwdErrorMsg: ''
        }
    }

    //validation for email
    validateEmail() {
        const { email } = this.state
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const emailValid = re.test(email)
        LayoutAnimation.easeInEaseOut()
        this.setState({ emailValid })
        emailValid || this.emailInput.shake()
        return emailValid
    }

    //validation for password
    validatePassword() {
        const { complexity } = this.props
        const { password } = this.state
        const regx1 = /^([a-zA-Z0-9@*#]{8,15})$/
        const regx2 = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
        if(complexity == 'any') {
            var passwordValid = password.length >=1;
            this.setState({pwdErrorMsg: languageJSON.password_blank_messege})
        }
        else if(complexity == 'alphanumeric') {
            var passwordValid = regx1.test(password);
            this.setState({pwdErrorMsg: languageJSON.password_alphaNumeric_check});
        }
        else if (complexity == 'complex') {
            var passwordValid = regx2.test(password);
            this.setState({pwdErrorMsg: languageJSON.password_complexity_check})
        }
        LayoutAnimation.easeInEaseOut()
        this.setState({ passwordValid })
        passwordValid || this.passwordInput.shake()
        return passwordValid
    }

    //login press for validation check
    onPressLogin(){
        const { onPressLogin } = this.props;
        LayoutAnimation.easeInEaseOut();
        const emailValid = this.validateEmail();
        const passwordValid = this.validatePassword();
        
       if ( emailValid && passwordValid ) {
           //login function of smart component
            onPressLogin(this.state.email, this.state.password);
            this.setState({email: '', password: ''})
        }
    }
    
    render() {
        const { onPressRegister, onPressForgotPassword } = this.props;

        return (
            <View  style={stylesCommon.columnSpaceBetween}>
                <View style={{width: 50, height: 100}} />
                <View style={styles.containerLogin}>
                    <Input
                        ref={input => (this.emailInput = input)}
                        editable={true}
                        placeholder={languageJSON.email_placeholder}
                        placeholderTextColor={colors.WHITE}
                        value={this.state.email}
                        keyboardType={'email-address'}
                        inputStyle={styles.inputTextStyle}
                        onChangeText={(text)=>{this.setState({email: text})}}
                        errorMessage={this.state.emailValid ? null : languageJSON.valid_email_check}
                        secureTextEntry={false}
                        blurOnSubmit={true}
                        onSubmitEditing={() => { this.validateEmail(); this.passwordInput.focus()}}
                        errorStyle={styles.errorMessageStyle}
                        containerStyle={styles.InputContainer}

                        rightIcon={{ type: 'font-awesome', name: 'envelope', color: 'white'}}
                    />
                    <Input
                        ref={input => (this.passwordInput = input)}
                        editable={true}
                        blurOnSubmit={true}
                        underlineColorAndroid={colors.TRANSPARENT}
                        placeholder={languageJSON.password_placeholder}
                        placeholderTextColor={colors.WHITE}
                        value={this.state.password}
                        inputStyle={styles.inputTextStyle}
                        onChangeText={(text)=>{this.setState({password:text})}}
                        errorMessage={this.state.passwordValid ? null : this.state.pwdErrorMsg}
                        secureTextEntry={true}
                        onSubmitEditing={() => { this.validatePassword() }}
                        errorStyle={styles.errorMessageStyle}
                        containerStyle={styles.InputContainer}
                        rightIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
                    />
                </View>
                <View style={styles.containerLogin}>
                    <Button
                        type={"clear"}
                        title={languageJSON.login_button}
                        loading={false}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={styles.buttonTitleStyle}
                        onPress={()=>{this.onPressLogin()}}
                        buttonStyle={{
                            backgroundColor: 'white',
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 20,
                            marginBottom: 20
                        }}
                    />
                    <Button
                        title={languageJSON.register_link}
                        loading={false}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={styles.forgotTitleStyle}
                        onPress={onPressRegister}
                        buttonStyle={{
                            backgroundColor: '#3ea1c0',
                            borderColor: 'white',
                            borderWidth: 2,
                            borderRadius: 20,
                            marginBottom: 20
                        }}
                    />
                    <View
                        style={{
                            borderBottomColor: '#4ca8c1',
                            borderBottomWidth: 2,
                            marginTop: 10,
                            marginBottom: 10
                        }}
                    />
                    <Button
                        title={languageJSON.forgot_password_link}
                        loading={false}
                        onPress={onPressForgotPassword}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={styles.forgotTitleStyle}
                        titleProps={{ numberOfLines: 2, ellipsizeMode: 'tail' }}
                        buttonStyle={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        borderWidth: 0,
                    }}
                    />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    containerLogin: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '80%',
        margin: 20
    },
    buttonStyle: { 
        backgroundColor: colors.BLUE.default.secondary, 
        height: 45 
    },
    InputContainer: {
        borderRadius:10,
        backgroundColor: '#5ba2be',
        width: width-80,
        marginBottom: 10
    },
    inputTextStyle: {
        color:colors.WHITE,
        fontSize:15
    },
    emailInputContainerStyle: {
        paddingBottom: 15
    },
    errorMessageStyle: { 
        fontSize: 12, 
        fontWeight:'bold',
        color: "#FD2323"
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
        width:"100%"
    },
    forgotTitleStyle: { 
        fontWeight: "500",
        fontSize: 16,
        width:"100%"
    },
    buttonContainerStyle: {
        flex: 1
    },
   
});
