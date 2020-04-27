import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button, Overlay} from "react-native-elements";
import stylesCommon from '../common/styles';
import {colors} from "../common/theme";
var { height, width } = Dimensions.get('window');

export default class AcceptOrCancelOverlay extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const { visible, message } = this.props;
        let visibleReview = false;
        if(visible){
            visibleReview = true;
        }
        return (
            <Overlay
                isVisible={visibleReview}
                windowBackgroundColor="rgba(0, 0, 0, .3)"
                overlayBackgroundColor="white"
                width="80%"
                height="20%"
            >
                <View style={styles.container}>
                    <View style={styles.horizontal} >
                        <Text style={styles.headerTitleStyle}></Text>
                    </View>
                    <View style={styles.horizontal} >
                        <Text>{message}</Text>
                    </View>
                    <View style={styles.horizontal}>
                        <Button
                            title="SI"
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={{
                                borderColor: 'transparent',
                                backgroundColor: 'red',
                                borderWidth: 0,
                                borderRadius: 10,
                                width: width * 0.4 - 20,
                                marginVertical: 20
                            }}
                            onPress={() => this.props.accept()}
                        />
                        <Button
                            title="NO"
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={{
                                borderColor: 'transparent',
                                backgroundColor: 'green',
                                borderWidth: 0,
                                borderRadius: 10,
                                width: width * 0.4 - 20,
                                marginVertical: 20
                            }}
                            onPress={() => this.props.cancel()}
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
