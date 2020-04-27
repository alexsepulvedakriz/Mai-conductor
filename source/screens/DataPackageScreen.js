import React from 'react';
import {StyleSheet, View, Dimensions, Text, Picker, ScrollView, TextInput, LayoutAnimation, Alert, Image} from 'react-native';
import {Button, Card, CheckBox} from 'react-native-elements';
import { colors } from '../common/theme';
import stylesCommon from '../common/styles';
import {offerUpdate} from "../actions/offer";
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import {HeaderComponent, WarningOverlay} from '../components';
import  languageJSON  from '../common/language';
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        offer: state.offer,
    }
};
const mapDispatchToProps = dispatch => ({
    updateOffer: (offer) => dispatch(offerUpdate(offer)),
});

class DataPackageScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mostrarErrorDimensiones: false,
            mostrarErrorDescripcion: false,
            mostrarErrorPrecio: false,
            mostrarCamposObligatorios: false
        }
    }
    componentDidMount(){
        this.getPermissionAsync();
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

    //
    messageErrorDimension(){
        if(this.state.mostrarErrorDimensiones) {
            return (
                <View style={stylesCommon.errorTextContainer}>
                    <Text style={stylesCommon.errorMessageStyle}> {languageJSON.dimensions_error}</Text>
                </View>
            )
        }
    }
    messageErrorDescription(){
        if(this.state.mostrarErrorDescripcion) {
            return (
                <View style={stylesCommon.errorTextContainer}>
                    <Text style={stylesCommon.errorMessageStyle}> {languageJSON.description_error}</Text>
                </View>
            )
        }
    }
    messageErrorPrice(){
        if(this.state.mostrarErrorPrecio) {
            return (
                <View style={stylesCommon.errorTextContainer}>
                    <Text style={stylesCommon.errorMessageStyle}> {languageJSON.price_error}</Text>
                </View>
            )
        }
    }
    messageErrorRequiredField(){
        if(this.state.mostrarCamposObligatorios) {
            return (
                <View style={stylesCommon.errorTextContainer}>
                    <Text style={stylesCommon.errorMessageStyle}> {languageJSON.required_field}</Text>
                </View>
            )
        }
    }
    imageLoadOrNot(){
        if(this.props.offer.foto){
            return(
                <Image
                    style={{ height: 100, width: 100}}
                    source={require('../../assets/images/photo-upload.png')}
                />
            )
        } else {
            return(
                <Image
                    style={{ height: 100, width: 100}}
                    source={require('../../assets/images/photo-upload.png')}
                />
            )
        }
    }
    // validadores
    validateFieldsComplete() {
        if(!this.validateDimensions(this.props.offer.largo)) {
            this.setState({mostrarCamposObligatorios: true});
            return false;
        }
        if(!this.validateDimensions(this.props.offer.largo)) {
            this.setState({mostrarCamposObligatorios: true});
            return false;
        }
        if(!this.validateDimensions(this.props.offer.largo)) {
            this.setState({mostrarCamposObligatorios: true});
            return false;
        }
        if(!this.validatePrice(this.props.offer.precio)) {
            this.setState({mostrarCamposObligatorios: true});
            return false;
        }
        if(!this.validateDescription(this.props.offer.descripcion)) {
            this.setState({mostrarCamposObligatorios: true});
            return false;
        }
        if(!this.validateSelectOptionPay()) {
            this.setState({mostrarCamposObligatorios: true});
            return false;
        }
        if(!this.validatePhoto()) {
            this.setState({mostrarCamposObligatorios: true});
            return false;
        }
        this.setState({mostrarCamposObligatorios: false});
        return true;
    }
    validateDimensions(value){
        if(parseFloat(value) == 0 || isNaN(parseFloat(value))) {
            this.setState({mostrarErrorDimensiones: true});
            return false;
        }
        this.setState({mostrarErrorDimensiones: false});
        return true;
    }
    validateDescription(value){
        if(value = '' || undefined) {
            return false;
            this.setState({mostrarErrorDescripcion: true});
            LayoutAnimation.easeInEaseOut()
            this.precioInput.shake();
        }
        return true;
    }
    validatePrice(value){
        if(parseFloat(value) < 999 || isNaN(parseFloat(value))) {
            this.setState({mostrarErrorPrecio: true});
            return false;
        }
        this.setState({mostrarErrorPrecio: false});
        return true;
    }
    validatePhoto(){
        if(this.props.offer.foto){
            return true;
        } else {
            return false;
        }
    }
    validateSelectOptionPay(){
        if(this.props.offer.efectivo ||  this.props.offer.webpay || this.props.offer.transferencia){
            return true;
        } else {
            return false;
        }
    }
    // update
    updateOffer(object, allow = true){
        if(allow){
            this.props.updateOffer(object);
        }
    }
    continueOffer() {
        if(this.validateFieldsComplete()){
            this.props.navigation.navigate('AcceptTrip');
        }
    }
    comeBackOffer() {
        this.props.navigation.navigate('TypeTruck');
    }
    uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        this.updateOffer({foto: blob});
        return true;
    }
    render() {
        return (
            <View style={stylesCommon.columnSpaceBetween}>
                <ScrollView>
                    <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={'Detalles'} type={'color'}/>
                    <LinearGradient
                        colors={ ['#245b84', '#3ea1c0']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View>
                            <Card containerStyle={stylesCommon.cardTransparent}>
                                <View>
                                    <Text style={stylesCommon.inputTextStyle}>
                                        {languageJSON.description}
                                    </Text>
                                    <TextInput
                                        style={stylesCommon.textInputMultiRow}
                                        value={this.props.offer.descripcion}
                                        multiline={true}
                                        textAlignVertical={"top"}
                                        numberOfLines={5}
                                        onChangeText={(value) => {this.updateOffer({descripcion: value}), this.validateDescription(value)}}
                                    />
                                </View>
                                {this.messageErrorDescription()}
                                {this.messageErrorRequiredField()}
                                <View style={stylesCommon.rowSpaceBetween}>
                                    <View>
                                        <Text style={stylesCommon.inputTextStyle}>
                                            {languageJSON.height}
                                        </Text>
                                        <TextInput
                                            style={[stylesCommon.textInputSimple, styles.rowDistribution]}
                                            value={this.props.offer.alto}
                                            onChangeText={(value) => {this.updateOffer({alto: value}), this.validateDimensions(value)}}
                                        />
                                    </View>
                                    <View>
                                        <Text style={stylesCommon.inputTextStyle}>
                                            {languageJSON.long}
                                        </Text>
                                        <TextInput
                                            style={[stylesCommon.textInputSimple, styles.rowDistribution]}
                                            value={this.props.offer.largo}
                                            onChangeText={(value) => {this.updateOffer({largo: value}), this.validateDimensions(value)}}
                                        />
                                    </View>
                                    <View>
                                        <Text style={stylesCommon.inputTextStyle}>
                                            {languageJSON.width}
                                        </Text>
                                        <TextInput
                                            style={[stylesCommon.textInputSimple, styles.rowDistribution]}
                                            value={this.props.offer.ancho}
                                            onChangeText={(value) => {this.updateOffer({ancho: value}), this.validateDimensions(value)}}
                                        />
                                    </View>
                                </View>
                                {this.messageErrorDimension()}
                                {this.messageErrorRequiredField()}
                                <View>
                                    <Text style={stylesCommon.inputTextStyle}>
                                        {languageJSON.weight}
                                    </Text>
                                    <View style = {{borderColor: colors.GREY.Deep_Nobel, borderWidth: 1, borderRadius: 10, marginBottom: 10 }}>
                                        <Picker
                                            selectedValue={this.props.offer.peso}
                                            onValueChange={(itemValue, itemIndex) => this.updateOffer({peso: itemValue})}
                                        >
                                            <Picker.Item label="0-10 kg" value="0-10 kg" />
                                            <Picker.Item label="11-50 Kg" value="11-50 Kg" />
                                            <Picker.Item label="51-100 kg" value="51-100 Kg" />
                                            <Picker.Item label="101-200 Kg" value="101-200 Kg" />
                                        </Picker>
                                    </View>
                                </View>
                                <View style={stylesCommon.rowSpaceAround}>
                                    <Button
                                        title={'Foto Carga'}
                                        titleStyle={{ fontWeight: '500' }}
                                        buttonStyle={[stylesCommon.buttonPositive, {paddingHorizontal: 30}]}
                                        onPress={this._pickImage}
                                    />
                                    {this.imageLoadOrNot()}
                                </View>
                                {this.messageErrorRequiredField()}
                                <View>
                                    <Text style={stylesCommon.inputTextStyle}>
                                        {languageJSON.offer_price}
                                    </Text>
                                    <TextInput
                                        style={stylesCommon.textInputSimple}
                                        value={this.props.offer.precio}
                                        onChangeText={(value) => {this.updateOffer({precio: value}), this.validatePrice(value)}}
                                    />
                                </View>
                                {this.messageErrorPrice()}
                                {this.messageErrorRequiredField()}
                                <Text style={stylesCommon.inputTextStyle}>
                                    {languageJSON.payment_type}
                                </Text>
                                <View style={[styles.buttonsContainer]}>
                                    <CheckBox
                                        center
                                        checkedColor={'red'}
                                        title='Efectivo'
                                        checkedColor={'#f7ab00'}
                                        uncheckedColor={'#f7ab00'}
                                        checkedIcon='circle'
                                        uncheckedIcon='circle-o'
                                        checked={this.props.offer.efectivo}
                                        onPress={() => this.updateOffer({efectivo: true, webpay: false, transferencia: false})}
                                        iconRight
                                        containerStyle={{backgroundColor: 'white', borderWidth: 0 , paddingHorizontal: 0, margin:0}}
                                    />
                                    <CheckBox
                                        center
                                        title='Webpay'
                                        checkedColor={'#f7ab00'}
                                        uncheckedColor={'#f7ab00'}
                                        checkedIcon='circle'
                                        uncheckedIcon='circle-o'
                                        checked={this.props.offer.webpay}
                                        onPress={() => this.updateOffer({efectivo: false, webpay: true, transferencia: false})}
                                        iconRight
                                        containerStyle={{backgroundColor: 'white', borderWidth: 0, paddingHorizontal: 0}}
                                    />
                                    <CheckBox
                                        center
                                        title='Transferencia'
                                        checkedColor={'#f7ab00'}
                                        uncheckedColor={'#f7ab00'}
                                        checkedIcon='circle'
                                        uncheckedIcon='circle-o'
                                        checked={this.props.offer.transferencia}
                                        onPress={() => this.updateOffer({efectivo: false, webpay: false, transferencia: true})}
                                        iconRight
                                        containerStyle={{backgroundColor: 'white', borderWidth: 0, paddingHorizontal: 0}}
                                    />
                                </View>
                                {this.messageErrorRequiredField()}
                                <View>
                                    <Button
                                        title={languageJSON.button_continue}
                                        titleStyle={{ fontWeight: '500' }}
                                        linearGradientProps={{
                                            colors: ['#245b84', '#3ea1c0'],
                                            start: [1, 0],
                                            end: [0.2, 0],
                                        }}
                                        buttonStyle={stylesCommon.buttonPositive}
                                        onPress={() => {this.continueOffer()}}
                                    />
                                </View>
                                <View>
                                    <Button
                                        title={languageJSON.button_come_back}
                                        titleStyle={{ fontWeight: '500' }}
                                        buttonStyle={stylesCommon.buttonNegative}
                                        onPress={() => {this.comeBackOffer()}}
                                    />
                                </View>
                            </Card>
                        </View>
                    </LinearGradient>
                </ScrollView>
                <WarningOverlay />
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPackageScreen);

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    indicationText: {
        fontSize: 13,
        marginBottom: 10
    },
    rowDistribution: {
        width: (width/3)-20,
    },
});
