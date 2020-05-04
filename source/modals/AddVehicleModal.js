import React, { Component } from 'react';
import {Modal, View, StyleSheet, Text, TextInput, Dimensions, ScrollView, Picker} from 'react-native';
import {Button, Header, Icon} from "react-native-elements";
import stylesCommon from "../common/styles";
import languageJSON from "../common/language";
import {colors} from "../common/theme";
import {documentPicker} from '../functions/documentPicker';

var { height, width } = Dimensions.get('window');

export default class AddVehicleModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            licence_plate: '',
            year: '',
            type: '',
            car_make: '',
            vehicle_roll: null,
            annotation_certificate: null,
            photo_authorization: null,
            photo_vehicle: null,
            permission_to_circulate: null,
            model: '',
        }
    }

    addVehicle(){
        this.props.addVehicle(
            this.licence_plate,
            this.year,
            this.type,
            this.car_make,
            this.vehicle_roll,
            this.annotation_certificate,
            this.photo_authorization,
            this.photo_vehicle,
            this.permission_to_circulate,
            this.model,
            );
        this.setState({
            licence_plate: '',
            year: '',
            type: '',
            car_make: '',
            vehicle_roll: null,
            annotation_certificate: null,
            photo_authorization: null,
            photo_vehicle: null,
            permission_to_circulate: null,
            model: null,
        });
    }

    render() {
        const { modalVisible} = this.props;
        let visible = false;
        if(modalVisible){
            visible = true;
        }
        return (
            <Modal
                animationType="slide"
                visible={visible}
                animationType={'slide'}
                transparent={false}
                presentationStyle="fullScreen"
            >
                <Header
                    linearGradientProps={{
                        colors: ['#245b84', '#3ea1c0'],
                        start: [0, 1],
                        end: [1, 1],
                    }}
                    centerComponent={<Text style={stylesCommon.headerTitleStyle}>{languageJSON.add_new_vehicle}</Text>}
                    containerStyle={stylesCommon.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                    leftComponent={{icon:'arrow-left', type:'font-awesome', color: 'white', onPress: ()=>{this.props.close();}}}
                />
                <ScrollView >
                    <View style={{marginHorizontal: 20, marginTop: 10}}>
                        <Text style={{fontSize: 16, marginBottom: 10, color: colors.GREY.iconSecondary}}>
                            {languageJSON.licence_plate}
                        </Text>
                        <TextInput
                            style={stylesCommon.textInputSimple}
                            placeholder={'JJJJ11-1'}
                            value={this.state.licence_plate}
                            onChangeText={(value) => {this.setState({ licence_plate: value})}}
                        />
                    </View>
                    <View style={{marginHorizontal: 20, marginTop: 10}}>
                        <Text style={{fontSize: 16, marginBottom: 10, color: colors.GREY.iconSecondary}}>
                            {languageJSON.year}
                        </Text>
                        <TextInput
                            style={stylesCommon.textInputSimple}
                            placeholder={'AAAA'}
                            value={this.state.year}
                            onChangeText={(value) => {this.setState({ year: value})}}
                        />
                    </View>
                    <View style={{marginHorizontal: 20, marginTop: 10}}>
                        <Text style={{fontSize: 16, marginBottom: 10, color: colors.GREY.iconSecondary}}>
                            {languageJSON.car_make}
                        </Text>
                        <View style = {{borderColor: colors.GREY.Deep_Nobel, borderWidth: 1, borderRadius: 10, marginBottom: 10 }}>
                            <Picker
                                selectedValue={this.state.car_make}
                                onValueChange={(itemValue, itemIndex) => this.setState({car_make: itemValue})}
                            >
                                <Picker.Item label="0-10 kg" value="0-10 kg" />
                                <Picker.Item label="11-50 Kg" value="11-50 Kg" />
                                <Picker.Item label="51-100 kg" value="51-100 Kg" />
                                <Picker.Item label="101-200 Kg" value="101-200 Kg" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20, marginTop: 10}}>
                        <Text style={{fontSize: 16, marginBottom: 10, color: colors.GREY.iconSecondary}}>
                            {languageJSON.type}
                        </Text>
                        <View style = {{borderColor: colors.GREY.Deep_Nobel, borderWidth: 1, borderRadius: 10, marginBottom: 10 }}>
                            <Picker
                                selectedValue={this.state.type}
                                onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}
                            >
                                <Picker.Item label="0-10 kg" value="0-10 kg" />
                                <Picker.Item label="11-50 Kg" value="11-50 Kg" />
                                <Picker.Item label="51-100 kg" value="51-100 Kg" />
                                <Picker.Item label="101-200 Kg" value="101-200 Kg" />
                            </Picker>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20, marginTop: 10}}>
                        <Text style={{fontSize: 16, marginBottom: 10, color: colors.GREY.iconSecondary}}>
                            {languageJSON.model}
                        </Text>
                        <View style = {{borderColor: colors.GREY.Deep_Nobel, borderWidth: 1, borderRadius: 10, marginBottom: 10 }}>
                            <Picker
                                selectedValue={this.state.model}
                                onValueChange={(itemValue, itemIndex) => this.setState({model: itemValue})}
                            >
                                <Picker.Item label="Mercedes" value="0-10 kg" />
                                <Picker.Item label="Toyota" value="11-50 Kg" />
                                <Picker.Item label="Chrevrolet" value="51-100 Kg" />
                                <Picker.Item label="101-200 Kg" value="101-200 Kg" />
                            </Picker>
                        </View>
                    </View>
                    <Button
                        title={languageJSON.vehicle_roll}
                        titleStyle={{ fontWeight: '500' }}
                        linearGradientProps={{
                            colors: ['#245b84', '#3ea1c0'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        onPress={() => documentPicker().then(res => this.setState({vehicle_roll: res}))}
                        buttonStyle={[stylesCommon.buttonPositive,{marginHorizontal: 20, marginTop: 10}]}
                        icon={{ type: 'font-awesome', name: 'file-image-o', color: 'white' }}
                        iconRight={true}
                    />
                    <Button
                        title={languageJSON.annotation_certificate}
                        titleStyle={{ fontWeight: '500' }}
                        linearGradientProps={{
                            colors: ['#245b84', '#3ea1c0'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        onPress={() =>  documentPicker().then(res => this.setState({annotation_certificate: res}))}
                        buttonStyle={[stylesCommon.buttonPositive,{marginHorizontal: 20, marginTop: 10}]}
                        icon={{ type: 'font-awesome', name: 'file-image-o', color: 'white' }}
                        iconRight={true}
                    />
                    <Button
                        title={languageJSON.photo_authorization}
                        titleStyle={{ fontWeight: '500' }}
                        linearGradientProps={{
                            colors: ['#245b84', '#3ea1c0'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        onPress={() =>  documentPicker().then(res => this.setState({photo_authorization: res}))}
                        buttonStyle={[stylesCommon.buttonPositive,{marginHorizontal: 20, marginTop: 10}]}
                        icon={{ type: 'font-awesome', name: 'file-image-o', color: 'white' }}
                        iconRight={true}
                    />
                    <Button
                        title={languageJSON.photo_vehicle}
                        titleStyle={{ fontWeight: '500' }}
                        linearGradientProps={{
                            colors: ['#245b84', '#3ea1c0'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        onPress={() => documentPicker().then(res => this.setState({photo_vehicle: res}))}
                        buttonStyle={[stylesCommon.buttonPositive,{marginHorizontal: 20, marginTop: 10}]}
                        icon={{ type: 'font-awesome', name: 'file-image-o', color: 'white' }}
                        iconRight={true}
                    />
                    <Button
                        title={languageJSON.permission_to_circulate}
                        titleStyle={{ fontWeight: '500' }}
                        linearGradientProps={{
                            colors: ['#245b84', '#3ea1c0'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        onPress={() => documentPicker().then(res => this.setState({permission_to_circulate: res}))}
                        buttonStyle={[stylesCommon.buttonPositive,{marginHorizontal: 20, marginTop: 10}]}
                        icon={{ type: 'font-awesome', name: 'file-image-o', color: 'white' }}
                        iconRight={true}
                    />
                    <Button
                        title={languageJSON.add_vehicle}
                        titleStyle={{ fontWeight: '500' }}
                        linearGradientProps={{
                            colors: ['#245b84', '#3ea1c0'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        onPress={() => { this.addVehicle()}}
                        icon={{ type: 'font-awesome', name: 'truck', color: 'white' }}
                        iconRight={true}
                        buttonStyle={[stylesCommon.buttonPositive,{marginHorizontal: 20, marginTop: 10}]}
                    />
                </ScrollView>
            </Modal>
        )
    }
}
