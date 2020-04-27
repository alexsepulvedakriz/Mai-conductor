import React, { Component } from 'react';
import {Modal, View, StyleSheet, Text, Dimensions} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import {colors} from "../common/theme";
import  languageJSON  from '../common/language';

var { height, width } = Dimensions.get('window');



export default class WarningOverlay extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { Visible, message } = this.props;
        let visible = false;
        if(Visible){
            visible = true;
        }
        return (
            <Overlay
                isVisible={visible}
                windowBackgroundColor="rgba(0, 0, 0, .5)"
                overlayBackgroundColor="white"
                width="80%"
                height="50%"
                borderRadius={10}
            >
                <View style={styles.container}>
                    <View style={styles.horizontal} >
                        <Text style={styles.headerTitleStyle}>{languageJSON.alert}</Text>
                    </View>
                    <View style={styles.horizontal} >
                        <Text>{message}</Text>
                    </View>
                    <View style={styles.horizontal}>
                        <Button
                            title="CANCELAR"
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={{
                                borderColor: 'transparent',
                                backgroundColor: 'red',
                                borderWidth: 0,
                                borderRadius: 10,
                                width: width * 0.4 - 20,
                                marginVertical: 20
                            }}
                            onPress={() => {this.props.close()}}
                        />
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
                            onPress={() => {this.props.accept()}}
                        />
                    </View>
                </View>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    headerTitleStyle: {
        color: 'black',
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
