import React from 'react';
import {View, Text, Dimensions, ScrollView, KeyboardAvoidingView, Image, LayoutAnimation, Platform, Alert} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements'
import { colors } from '../common/theme';
import  languageJSON  from '../common/language';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

var { width, height } = Dimensions.get('window');

export default class ProfileComponent extends React.Component {

    constructor(props){
        super(props);
        this.state={
            nombre:this.props.dataUser?this.props.dataUser.name:'desconocido',
            apellido:this.props.dataUser?this.props.dataUser.last_name:'desconocido',
            email:this.props.dataUser?this.props.dataUser.email:'desconocido',
            rut: this.props.dataUser?this.props.dataUser.rut:'desconocido',
            movil:  this.props.dataUser?this.props.dataUser.movil:'desconocido',
            id_photo: this.props.dataUser?this.props.dataUser.ref_photo:'desconocido',
            nombreValid: true,
            rutValid: true,
            apellidoValid: true,
            allInfo:'',
            loadingModal:false,
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
    //register button press for validation
    onPressRegister(){
        LayoutAnimation.easeInEaseOut();
        this.props.onPressRegister( this.state.nombre, this.state.apellido, this.state.rut, this.state.photo);
    }
    validateInputs(){
        LayoutAnimation.easeInEaseOut();
        const nombreValid = this.validateFirstName();
        const apellidoValid = this.validateLastname();
        // validar las reglas, falta confirmar la foto
        if ( nombreValid && apellidoValid) {
            this.onPressRegister();
        }
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
        return(
            <ScrollView style={styles.scrollViewStyle}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{
                            uri: this.state.id_photo,
                        }}
                        style={{
                            width:  width - 100,
                            height: width - 100,
                            borderRadius: 10,
                        }}
                        onPress={() => this._pickImage()}
                    />
                    <Icon name={'edit'}
                          type={'font_awesome'}
                          reverse
                          containerStyle={
                              {
                                position: 'absolute',
                                right: 50,
                                bottom: -30}
                                }
                          size={20}
                          color={colors.GREY.Deep_Nobel}
                          onPress={() => this._pickImage()}/>
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
                                rightIcon={{ type: 'font-awesome', name: 'user', color: colors.GREY.Deep_Nobel }}
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
                                rightIcon={{ type: 'font-awesome', name: 'user', color: colors.GREY.Deep_Nobel }}
                            />
                        </View>
                        <View style={styles.textInputContainerStyle}>
                            <Input
                                ref={input => (this.rutInput = input)}
                                editable={false}
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
                                rightIcon={{ type: 'font-awesome', name: 'id-card', color: colors.GREY.Deep_Nobel }}
                            />
                        </View>
                        <View style={styles.textInputContainerStyle}>
                            <Input
                                ref={input => (this.emailInput = input)}
                                editable={false}
                                underlineColorAndroid={colors.TRANSPARENT}
                                placeholder={languageJSON.email_placeholder}
                                placeholderTextColor={colors.WHITE}
                                value={this.state.email}
                                keyboardType={'email-address'}
                                inputStyle={styles.inputTextStyle}
                                secureTextEntry={false}
                                blurOnSubmit={true}
                                containerStyle={styles.textInputStyle}
                                rightIcon={{ type: 'font-awesome', name: 'envelope-o', color: colors.GREY.Deep_Nobel }}
                            />
                        </View>
                        <View style={styles.textInputContainerStyle}>
                            <Input
                                ref={input => (this.movilInput = input)}
                                editable={false}
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
                                rightIcon={{ type: 'font-awesome', name: 'mobile-phone', color: colors.GREY.Deep_Nobel }}
                            />
                        </View>
                        <View style={styles.textInputContainerStyle}>
                            <Button
                                onPress={()=>{this.validateInputs()}}
                                linearGradientProps={{
                                    colors: ['#245b84', '#3ea1c0'],
                                    start: [1, 0],
                                    end: [0.2, 0],
                                }}
                                title={languageJSON.edit_button}
                                titleStyle={styles.buttonTitle}
                                buttonStyle={styles.buttonStyle}
                            />
                        </View>
                        <View style={styles.gapView}/>
                    </View>
                </KeyboardAvoidingView>
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
        backgroundColor: 'transparent',
        width: width-80,
        marginBottom: 0
    },
    inputTextStyle: {
        color:colors.BLACK,
        fontSize:13,
        marginLeft:0,
        height:32,
    },
    iconContainer: {
        paddingTop:8
    },
    gapView: {
        height:200,
        width:'100%'
    },
    buttonContainer: {
        flexDirection:'row',
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
    buttonStyle: {
        width: width-80,
        height: 40,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        borderRadius:10,
    },
    buttonTitle: {
        color: colors.WHITE,
        fontSize:16
    },
    photoButtonTitle: {
        color: colors.WHITE,
        fontSize:10
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
        marginVertical: 5,
        paddingHorizontal: 15
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
