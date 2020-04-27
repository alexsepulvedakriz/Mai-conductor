import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';
import {Button, Overlay, AirbnbRating, Card} from "react-native-elements";
import stylesCommon from '../common/styles';
import {colors} from "../common/theme";
import  languageJSON  from '../common/language';

var { height, width } = Dimensions.get('window');

export default class EvaluatingTripOverlay extends Component {
    constructor(props){
        super(props);
        this.state = {
            descripcion: '',
            reclamo: '',
            evaluacion: 3.5
        }
    }
    updateTrip(){
        this.props.tripUpdate({descripcion: this.state.descripcion, reclamo: this.state.reclamo, evaluacion_conductor: this.state.evaluacion});
    }
    render(){
        const { viajeActual} = this.props;
        let visible = false;
        if(viajeActual){
            if(viajeActual.evaluando && !viajeActual.end){
                visible = true;
            }
        }
        return (
            <Overlay
                isVisible={visible}
                windowBackgroundColor="rgba(0, 0, 0, .3)"
                overlayBackgroundColor="white"
                width="90%"
                height={350}
                overlayStyle={{borderRadius: 20}}
            >
                <Card containerStyle={styles.cardWithMargin}>
                    <View style={styles.horizontal} >
                        <Text style={styles.headerTitleStyle}>Evalua el transporte</Text>
                    </View>
                    <View style={styles.horizontal}>
                        <AirbnbRating
                            fractions={1}
                            reviews={["Terrible", "Mal", "Meh", "OK", "Bien", "Hmm...", "Muy bien", "Excelente"]}
                            imageSize={40}
                            startingValue={this.state.evaluacion}
                            onFinishRating={(value) => {this.setState({evaluacion: value })}}
                        />
                    </View>
                    <View style={styles.horizontal} >
                        <TextInput
                            style={[{
                                height: 60,
                                borderColor: colors.GREY.Deep_Nobel,
                                borderWidth: 1,
                                borderRadius: 10,
                                color: colors.GREY.Deep_Nobel,
                                padding:10
                            }, {width: '100%'}]}
                            value={this.state.descripcion}
                            multiline={true}
                            textAlignVertical={"top"}
                            numberOfLines={3}
                            placeholder={'Descripcion'}
                            onChangeText={(value) => {this.setState({descripcion: value})}}
                        />
                    </View>
                    <View style={styles.horizontal}>
                        <Button
                            title="ENVIAR EVALUACION"
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={[stylesCommon.buttonPositive, {width: '100%'}]}
                            onPress={() => this.updateTrip()}
                        />
                    </View>
                </Card>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    cardWithMargin: {
        borderWidth: 0, // Remove Border
        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow IOS
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        width: '100%',
        marginHorizontal:0,
        elevation: 0 // This is for Android
    },
    horizontal: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-around",
        marginHorizontal: 0,
        marginTop: 10
    },
    headerTitleStyle: {
        color: colors.GREY.iconSecondary,
        fontFamily:'Roboto-Bold',
        fontSize: 20,
        marginBottom: 10
    },
    textStyle: {
        color: colors.WHITE,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
});
