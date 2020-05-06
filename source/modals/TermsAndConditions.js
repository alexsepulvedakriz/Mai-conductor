import React, { Component } from 'react';
import {Modal, View, StyleSheet, Text, Dimensions} from 'react-native';
import languageJSON from "../common/language";
import {Button} from "react-native-elements";
import {colors} from "../common/theme";

var { height, width } = Dimensions.get('window');

export default class TermsAndConditions extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { modalVisible } = this.props;
        let visible = false;
        if(modalVisible){
            visible = true;
        }
        return (
            <Modal
                animationType="fade"
                presentationStyle="fullScreen"
                transparent={false}
                visible={visible}
            >
                <View style={styles.centerContainer}>
                    <Text style={{fontSize:26}}>{languageJSON.terminos_condiciones_titulo}</Text>
                </View>
                <View style={styles.centerContainer}>
                    <Text>{languageJSON.terminos_condiciones}</Text>
                </View>
                <View>
                    <Button
                        onPress={()=>{this.props.accept()}}
                        title={languageJSON.accept_button}
                        titleStyle={{}}
                        buttonStyle={styles.acceptButton}
                    />
                </View>
                <View>
                    <Button
                        onPress={()=>{this.props.cancel()}}
                        title={languageJSON.cancel_button}
                        titleStyle={{}}
                        buttonStyle={styles.cancelButton}
                    />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    cancelButton: {
        backgroundColor: colors.RED,
        width: width - 80,
        marginHorizontal: 40,
        height: 50,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        marginTop:30,
        borderRadius:15,
    },
    acceptButton: {
        backgroundColor: colors.GREEN.default,
        width: width - 80,
        marginHorizontal: 40,
        height: 50,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        marginTop:30,
        borderRadius:15,
    },
    title: {},
    centerContainer: {
        flexDirection:'row',
        justifyContent:'center',
        margin: 10
    }
});
