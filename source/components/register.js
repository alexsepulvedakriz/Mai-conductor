import React from 'react';
import {View, Text, Dimensions,Modal, ScrollView, KeyboardAvoidingView, Image, TouchableWithoutFeedback, LayoutAnimation, Platform, Alert} from 'react-native';
import Background from './Background';
import {Button, Header, Input, CheckBox } from 'react-native-elements'
import { colors } from '../common/theme';
import  languageJSON  from '../common/language';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

var { width, height } = Dimensions.get('window');

export default class Registration extends React.Component {
    
     constructor(props){
        super(props);
        this.state={
          nombre:this.props.reqData?this.props.reqData.profile.first_name:'',
          apellido:this.props.reqData?this.props.reqData.profile.last_name:'',
          email:this.props.reqData?this.props.reqData.profile.email:'',
          rut: '',
          movil:'',
          password:'',
          confPassword:'',
          nombreValid: true,
          rutValid: true,
          apellidoValid: true,
          movilValid: true,
          emailValid: true,
          passwordValid: true,
          cnfPwdValid: true,
          pwdErrorMsg: '',
          allInfo:'',
          reffralIdValid:true,
          loadingModal:false,
          pin1: '0',
          pin2: '0',
          pin3: '0',
          pin4: '0',
          checkBox: false,
          openModalVerification: false,
          openModalTerminosYCondiciones: false,
          photo: null,
          photoValid: true
        } 
      }
      componentDidMount(){
          this.getPermissionAsync();
      }
    
    // first name validation
    validateFirstName() {
        const { nombre } = this.state;
        const nombreValid = nombre.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ nombreValid });
        nombreValid || this.nombreInput.shake();
        return nombreValid
    }
    validateLastname() {
        const { apellido } = this.state;
        const apellidoValid = apellido.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ apellidoValid });
        apellidoValid || this.apellidoInput.shake();
        return apellidoValid
    }
    // movil number validation
    validateMovil() {
        const { movil } = this.state;
        const movilValid = (movil.length >0);
        LayoutAnimation.easeInEaseOut();
        this.setState({ movilValid });
        movilValid || this.movilInput.shake();
        return movilValid
    }
    // rut number validation
    validateRut() {
        const { rut } = this.state;
        const regularRut1 = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/;
        const regularRut2 = /^\d{7,8}[-][0-9kK]{1}$/;
        const regularRut3 = /^\d{7,8}[0-9kK]{1}$/;
        const rutValid = regularRut1.test(rut) || regularRut2.test(rut) || regularRut3.test(rut);
        LayoutAnimation.easeInEaseOut();
        this.setState({ rutValid });
        rutValid || this.rutInput.shake();
        return rutValid
    }
    // email validation
    validateEmail() {
        const { email } = this.state;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const emailValid = re.test(email)
        LayoutAnimation.easeInEaseOut()
        this.setState({ emailValid })
        emailValid || this.emailInput.shake()
        return emailValid
    }
    // password validation
    validatePassword() {
        const { complexity } = this.props;
        const { password } = this.state;
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
        this.setState({ passwordValid });
        passwordValid || this.passwordInput.shake();
        return passwordValid
    }
    // confirm password validation
    validateConfPassword() {
        const { password, confPassword } = this.state;
        const cnfPwdValid = (password == confPassword);
        LayoutAnimation.easeInEaseOut();
        this.setState({ cnfPwdValid });
        cnfPwdValid || this.cnfPwdInput.shake();
        return cnfPwdValid
    }
    // confirmar photo
    validatePhoto() {
        const { photo } = this.state;
        const photoValid = (photo != null);
        LayoutAnimation.easeInEaseOut();
        this.setState({ photoValid });
        return photoValid
    }
    validateCheckBox() {
        const { checkBox } = this.state;
        return checkBox;
    }


    //register button press for validation
    onPressRegister(){
        const { onPressRegister } = this.props;
        LayoutAnimation.easeInEaseOut();
        onPressRegister( this.state.nombre, this.state.apellido, this.state.email, this.state.movil, this.state.password, this.state.photo);
        this.setState({nombre:'', apellido:'',email: '', movil:'', rut:'',  password: '', confPassword: '', photo: null})
    }
    validateInputs(){
        LayoutAnimation.easeInEaseOut();

        const nombreValid = this.validateFirstName();
        const apellidoValid = this.validateLastname();
        const emailValid = this.validateEmail();
        const movilValid = this.validateMovil();
        const passwordValid = this.validatePassword();
        const cnfPwdValid = this.validateConfPassword();
        const photoValid = this.validatePhoto();
        const rutValid = this.validateRut();
        const checkBoxValid = this.validateCheckBox();
        // validar las reglas, falta confirmar la foto
        if ( nombreValid && apellidoValid && emailValid && movilValid && passwordValid && cnfPwdValid && photoValid && rutValid && checkBoxValid) {
            this.setState({openModalVerification: true})
        }
        if(!checkBoxValid) {
            Alert.alert('', 'Debes aceptar terminos y condiciones', null, {cancelable: true});
        }
        if(!photoValid && checkBoxValid) {
            Alert.alert('', 'Debes subir una foto de perfil', null, {cancelable: true});
        }
    }
    verifyMobile() {
        return(
            <Modal
                animationType="slide"
                presentationStyle="fullScreen"
                transparent={false}
                visible={this.state.openModalVerification}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centerContainer}>
                    <Text style={styles.title}>{languageJSON.verification_title}</Text>
                </View>
                <View style={styles.centerContainer}>
                    <Image
                        style={{width: 120, height: 120}}
                        source={require( '../../assets/images/verification.png')}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Input
                        // ref={input => (this.passwordInput = input)}
                        editable={true}
                        blurOnSubmit={true}
                        underlineColorAndroid={colors.TRANSPARENT}
                        placeholder={languageJSON.verification_placeholder}
                        placeholderTextColor={colors.WHITE}
                        value={this.state.pin1}
                        inputStyle={styles.inputTextStyle2}
                        onChangeText={(text)=>{this.setState({pin1:text})}}
                        // onSubmitEditing={() => { this.validatePassword() }}
                        // errorStyle={styles.errorMessageStyle}
                        containerStyle={styles.InputContainer}
                    />
                    <Input
                        // ref={input => (this.passwordInput = input)}
                        editable={true}
                        blurOnSubmit={true}
                        underlineColorAndroid={colors.TRANSPARENT}
                        placeholder={languageJSON.verification_placeholder}
                        placeholderTextColor={colors.WHITE}
                        value={this.state.pin2}
                        inputStyle={styles.inputTextStyle2}
                        onChangeText={(text)=>{this.setState({pin2:text})}}
                        //  errorMessage={this.state.passwordValid ? null : this.state.pwdErrorMsg}
                        // onSubmitEditing={() => { this.validatePassword() }}
                        // errorStyle={styles.errorMessageStyle}
                        containerStyle={styles.InputContainer}
                    />
                    <Input
                        // ref={input => (this.passwordInput = input)}
                        editable={true}
                        blurOnSubmit={true}
                        underlineColorAndroid={colors.TRANSPARENT}
                        placeholder={languageJSON.verification_placeholder}
                        placeholderTextColor={colors.WHITE}
                        value={this.state.pin3}
                        inputStyle={styles.inputTextStyle2}
                        onChangeText={(text)=>{this.setState({pin3:text})}}
                        //  errorMessage={this.state.passwordValid ? null : this.state.pwdErrorMsg}
                        // onSubmitEditing={() => { this.validatePassword() }}
                        // errorStyle={styles.errorMessageStyle}
                        containerStyle={styles.InputContainer}
                    />
                    <Input
                        // ref={input => (this.passwordInput = input)}
                        editable={true}
                        blurOnSubmit={true}
                        underlineColorAndroid={colors.TRANSPARENT}
                        placeholder={languageJSON.verification_placeholder}
                        placeholderTextColor={colors.WHITE}
                        value={this.state.pin4}
                        inputStyle={styles.inputTextStyle2}
                        onChangeText={(text)=>{this.setState({pin4:text})}}
                        //  errorMessage={this.state.passwordValid ? null : this.state.pwdErrorMsg
                        // onSubmitEditing={() => { this.validatePassword() }}
                        // errorStyle={styles.errorMessageStyle}
                        containerStyle={styles.InputContainer}
                    />
                </View>
                <View style={styles.centerContainer}>
                    <Text>{languageJSON.verification_text}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={()=>{this.onPressRegister()}}
                        title={languageJSON.verify_mobile}
                        titleStyle={styles.buttonTitle2}
                        buttonStyle={styles.verifyButton}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={()=>{this.setState({openModalVerification: false})}}
                        title={languageJSON.cancel_button}
                        titleStyle={styles.buttonTitle2}
                        buttonStyle={styles.cancelButton}
                    />
                </View>
            </Modal>
        );
    }
    terminosCondiciones() {
        return(
            <Modal
                animationType="fade"
                presentationStyle="fullScreen"
                transparent={false}
                visible={this.state.openModalTerminosYCondiciones}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centerContainer}>
                    <Text style={styles.title}>{languageJSON.terminos_condiciones_titulo}</Text>
                </View>
                <View style={styles.centerContainer}>
                    <Text>{languageJSON.terminos_condiciones}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={()=>{this.setState({openModalTerminosYCondiciones: false}); this.setState({checkBox: true})}}
                        title={languageJSON.accept_button}
                        titleStyle={styles.buttonTitle2}
                        buttonStyle={styles.verifyButton}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={()=>{this.setState({openModalTerminosYCondiciones: false})}}
                        title={languageJSON.cancel_button}
                        titleStyle={styles.buttonTitle2}
                        buttonStyle={styles.cancelButton}
                    />
                </View>
            </Modal>
        );
    }
    loading(){
     return(
        <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.loadingModal}
                onRequestClose={() => {
                this.setState({loadingModal:false})
            }}
            >
            <View style={{flex: 1, backgroundColor: "rgba(22,22,22,0.8)", justifyContent: 'center', alignItems: 'center' }}>
                <View style={{width: '85%', backgroundColor: "#DBD7D9", borderRadius: 10, flex: 1, maxHeight: 70}}> 
                <View style={{ alignItems: 'center',flexDirection:'row',flex:1,justifyContent:"center"}}>
                     <Image
                        style={{width:80,height:80,backgroundColor:colors.TRANSPARENT}}
                        source={require('../../assets/images/loader.gif')}
                        />
                   <View style={{flex:1}}>
                        <Text style={{color:"#000",fontSize:16,}}>{languageJSON.refferal_code_validation_modal}</Text>
                    </View>
                </View>
                </View>
            </View>
            </Modal>
     )
    }
    // image picker
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if(!result.cancelled) {
            this.uploadImage(result.uri)
                .then(()=> {Alert.alert("Mensaje", 'La foto se ha subido con exito', null, {cancelable: true})})
                .catch((error)=> {Alert.alert("Alerta", 'Ha ocurrido un error, intentalo nuevamente', null, {cancelable: true})});
        }
    }
    uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        this.setState({photo: blob});
        return true;
    }

    render(){

        const { onPressBack,registrationData,reqData, loading }=this.props;
        return(
            <ScrollView style={styles.scrollViewStyle}>
                <View style={styles.logo}>
                    <Image source={require('../../assets/images/logo.png')} />
                </View>
                <KeyboardAvoidingView behavior={Platform.OS=='ios'?"padding":"padding"} style={styles.form}>
                    <View style={styles.containerStyle}>
                        <Text style={styles.headerStyle}>{languageJSON.registration_title}</Text>
                        <View style={styles.textInputContainerStyle}>
                            <Input
                                ref={input => (this.nombreInput = input)}
                                editable={true}
                                underlineColorAndroid={colors.TRANSPARENT}
                                placeholder={languageJSON.first_name_placeholder}
                                placeholderTextColor={colors.WHITE}
                                value={this.state.nombre}
                                keyboardType={'email-address'}
                                inputStyle={styles.inputTextStyle}
                                onChangeText={(text)=>{this.setState({nombre: text})}}
                                errorMessage={this.state.nombreValid ? null : languageJSON.first_name_blank_error}
                                secureTextEntry={false}
                                blurOnSubmit={true}
                                onSubmitEditing={() => { this.validateFirstName(); this.apellidoInput.focus()}}
                                errorStyle={styles.errorMessageStyle}
                                containerStyle={styles.textInputStyle}
                                rightIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
                            />
                        </View>
                        <View style={styles.textInputContainerStyle}>
                            <Input
                                ref={input => (this.apellidoInput = input)}
                                editable={true}
                                underlineColorAndroid={colors.TRANSPARENT}
                                placeholder={languageJSON.last_name_placeholder}
                                placeholderTextColor={colors.WHITE}
                                value={this.state.apellido}
                                keyboardType={'email-address'}
                                inputStyle={styles.inputTextStyle}
                                onChangeText={(text)=>{this.setState({apellido: text})}}
                                errorMessage={this.state.apellidoValid ? null : languageJSON.last_name_blank_error}
                                secureTextEntry={false}
                                blurOnSubmit={true}
                                onSubmitEditing={() => { this.validateLastname(); this.emailInput.focus()}}
                                errorStyle={styles.errorMessageStyle}
                                containerStyle={styles.textInputStyle}
                                rightIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
                            />
                        </View>
                        <View style={styles.textInputContainerStyle}>
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
                                errorMessage={this.state.rutValid ? null : languageJSON.rut_blank_error}
                                secureTextEntry={false}
                                blurOnSubmit={true}
                                onSubmitEditing={() => { this.validateRut(); this.rutInput.focus()}}
                                errorStyle={styles.errorMessageStyle}
                                containerStyle={styles.textInputStyle}
                                rightIcon={{ type: 'font-awesome', name: 'id-card', color: 'white' }}
                            />
                        </View>
                        <View style={styles.textInputContainerStyle}>
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
                                errorMessage={this.state.emailValid ? null : languageJSON.valid_email_check}
                                secureTextEntry={false}
                                blurOnSubmit={true}
                                onSubmitEditing={() => { this.validateEmail(); this.movilInput.focus()}}
                                errorStyle={styles.errorMessageStyle}
                                containerStyle={styles.textInputStyle}
                                rightIcon={{ type: 'font-awesome', name: 'envelope-o', color: 'white' }}
                            />
                        </View>
                        <View style={styles.textInputContainerStyle}>
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
                                errorMessage={this.state.movilValid ? null : languageJSON.movil_no_blank_error}
                                secureTextEntry={false}
                                blurOnSubmit={true}
                                onSubmitEditing={() => { this.validateMovil(); this.passwordInput.focus()}}
                                errorStyle={styles.errorMessageStyle}
                                containerStyle={styles.textInputStyle}
                                rightIcon={{ type: 'font-awesome', name: 'mobile-phone', color: 'white' }}
                            />
                        </View>
                        <View style={styles.textInputContainerStyle}>
                            <Input
                                ref={input => (this.passwordInput = input)}
                                editable={true}
                                underlineColorAndroid={colors.TRANSPARENT}
                                placeholder={languageJSON.password_placeholder}
                                placeholderTextColor={colors.WHITE}
                                value={this.state.password}
                                inputStyle={styles.inputTextStyle}
                                onChangeText={(text)=>{this.setState({password: text})}}
                                errorMessage={this.state.passwordValid ? null : this.state.pwdErrorMsg}
                                secureTextEntry
                                blurOnSubmit={true}
                                onSubmitEditing={() => { this.validatePassword(); this.cnfPwdInput.focus()}}
                                errorStyle={styles.errorMessageStyle}
                                containerStyle={styles.textInputStyle}
                                rightIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
                            />
                        </View>
                        <View style={styles.textInputContainerStyle}>
                            <Input
                                ref={input => (this.cnfPwdInput = input)}
                                editable={true}
                                underlineColorAndroid={colors.TRANSPARENT}
                                placeholder={languageJSON.confrim_password_placeholder}
                                placeholderTextColor={colors.WHITE}
                                value={this.state.confPassword}
                                inputStyle={styles.inputTextStyle}
                                onChangeText={(text)=>{this.setState({confPassword: text})}}
                                errorMessage={this.state.cnfPwdValid ? null : languageJSON.confrim_password_not_match_err}
                                secureTextEntry
                                blurOnSubmit={true}
                                onSubmitEditing={() => { this.validateConfPassword(); this.refferalInput.focus() }}
                                errorStyle={styles.errorMessageStyle}
                                containerStyle={styles.textInputStyle}
                                rightIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
                            />
                        </View>
                        <View style={styles.textInputContainerStyle}>
                            <Button
                                onPress={this._pickImage}
                                title={languageJSON.upload_photo}
                                loading={loading}
                                titleStyle={styles.photoButtonTitle}
                                buttonStyle={styles.photoButton}
                                icon={{ type: 'font-awesome', name: 'image', color: 'white' }}
                                iconRight={true}
                            />
                        </View>
                        <View style={styles.textInputContainerStyle}>
                            <CheckBox
                                checked={this.state.checkBox}
                                containerStyle={styles.checkboxStyle}
                                checkedColor={'white'}
                                uncheckedColor={'white'}
                                onPress={()=>{this.setState({checkBox: !this.state.checkBox})}}
                            />
                            <Text
                                style={styles.inputTextStyleTerminos}
                                onPress={() => {this.setState({openModalTerminosYCondiciones: true})}}>{languageJSON.terminos_condiciones_link}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={()=>{this.validateInputs()}}
                                title={languageJSON.register_button}
                                loading={loading}
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.registerButton}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={()=>{this.props.onPressBack()}}
                                title={languageJSON.come_back_button}
                                titleStyle={styles.volverTitleStyle}
                                buttonStyle={styles.volverButton}
                            />
                        </View>
                        <View style={styles.gapView}/>
                    </View>
                </KeyboardAvoidingView>
                {this.loading()}
                {this.verifyMobile()}
                {this.terminosCondiciones()}
            </ScrollView>
        ); 
    }
};

const styles={
    headerContainerStyle: { 
        backgroundColor: colors.TRANSPARENT, 
        borderBottomWidth: 0 ,
        marginTop:0
    },
    headerInnerContainer: {
        marginLeft:10, 
        marginRight: 10
    },
    textInputStyle:{
        borderRadius:10,
        backgroundColor: '#5ba2be',
        width: width-80,
        marginBottom: 0
    },
    iconContainer: {
        paddingTop:8
    },
    gapView: {
        height:40,
        width:'100%'
    },
    buttonContainer: { 
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:40
    },
    registerButton: {
        backgroundColor: colors.WHITE,
        width: 250,
        height: 50,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        marginTop:30,
        borderRadius:30,
    },
    volverButton: {
        backgroundColor: '#3ea1c0',
        borderColor: 'white',
        width: 250,
        borderWidth: 2,
        borderRadius: 30,
        margin: 20
    },
    volverTitleStyle: {
        fontWeight: "500",
        fontSize: 16,
        width:"100%",
    },
    photoButton: {
        backgroundColor: '#5ba2be',
        width: width-80,
        height: 40,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        borderRadius:10,
    },
    buttonTitle: {
        color: colors.BLUE.Deep_Blue,
        fontSize:16
    },
    photoButtonTitle: {
        color: colors.WHITE,
        fontSize:10
    },
    inputTextStyle: {
        color:colors.WHITE,
        fontSize:13,
        marginLeft:0,
        height:32,
    },
    errorMessageStyle: { 
        fontSize: 12, 
        fontWeight:'bold',
        marginLeft:0 
    },
    containerStyle:{
        flexDirection:'column',
        marginTop:20
    },
    form: {
        flex: 1,
    },
    logo:{
        width:'90%',
        justifyContent:"flex-start",
        marginTop:10,
        alignItems:'center', 
    },
    scrollViewStyle:{
        height: height,
        marginTop: 20
    },
    textInputContainerStyle:{
        flexDirection:'row', 
        alignItems: "center",  
        marginLeft:20,
        marginRight:20,
        padding: 15,
    },
    headerStyle:{
        fontSize:18,
        color:colors.WHITE,
        textAlign:'center',
        flexDirection:'row',
        marginTop:0
    },
    containerView:{ flex:1 },
    textContainer:{textAlign:"center"},
    centerContainer: {
        flexDirection:'row',
        justifyContent:'center',
        margin: 10
    },
    InputContainer: {
        borderRadius:10,
        backgroundColor: colors.GREY.secondary,
        width: width/5,
        margin: 5
    },
    inputTextStyle2: {
        color:colors.WHITE,
        fontSize:15
    },
    inputTextStyleTerminos: {
        color:colors.WHITE,
        fontSize:15
    },
    titleContainer: {
        flexDirection:'row',
        justifyContent:'center',
        marginTop:30
    },
    title: {
        fontSize:26
    },
    buttonTitle2: {
        fontSize:16
    },
    verifyButton: {
        backgroundColor: colors.GREEN.default,
        width: 180,
        height: 50,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        marginTop:30,
        borderRadius:15,
    },
    cancelButton: {
        backgroundColor: colors.RED,
        width: 180,
        height: 50,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        marginTop:30,
        borderRadius:15,
    },
    checkboxStyle: {
        backgroundColor: colors.TRANSPARENT,
        borderWidth: 0
    }
}
