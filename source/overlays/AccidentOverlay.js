import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button, Card, Overlay} from "react-native-elements";
import stylesCommon from '../common/styles';
import {colors} from "../common/theme";
var { height, width } = Dimensions.get('window');

export default class AccidentOverlay extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const { viajeActual} = this.props;
        let visible = false;
        if(viajeActual){
            if(viajeActual.accidente && !viajeActual.end){
                visible = true;
            }
        }
        // todo foto de accidente o animacion
        return (
            <Overlay
                isVisible={visible}
                windowBackgroundColor="rgba(0, 0, 0, .3)"
                overlayBackgroundColor="white"
                width="80%"
                height={300}
                overlayStyle={{borderRadius: 20}}
            >
                <Card containerStyle={styles.cardWithMargin}>
                    <View style={styles.horizontal} >
                        <Text style={styles.headerTitleStyle}>Ha ocurrido un accidente</Text>
                    </View>
                    <View style={styles.horizontal}>
                        <Text>Te llamaremos a la brevedad para darte a conocer los detalles</Text>
                    </View>
                    <View style={styles.horizontal}>
                        <Text>No te preocupes tu carga esta asegurada</Text>
                    </View>
                    <View style={styles.horizontal}>
                        <Button
                            title="ACEPTAR"
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={{
                                borderColor: 'transparent',
                                backgroundColor: 'green',
                                borderWidth: 0,
                                borderRadius: 10,
                                width: width * 0.4 - 20,
                                marginVertical: 20
                            }}
                            onPress={() => this.props.accept()}
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
