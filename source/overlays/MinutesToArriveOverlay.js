import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Button, Card, Overlay, Rating} from "react-native-elements";
import stylesCommon from '../common/styles';
import {colors} from "../common/theme";
import languageJSON from "../common/language";

export default class MinutesToArriveOverlay extends Component {
    constructor(props){
        super(props);
        this.state = {
            time_to_arrive: '3 min'
        }
    }
    render(){
        const { Visible} = this.props;
        let visible = false;
        if(Visible){
            visible = true;
        }
        return (
            <Overlay
                isVisible={visible}
                windowBackgroundColor="rgba(0, 0, 0, .3)"
                overlayBackgroundColor="white"
                width="90%"
                height={450}
                overlayStyle={{borderRadius: 20}}
            >
                <Card containerStyle={styles.cardWithMargin}>
                    <View style={styles.horizontal}>
                        <Text> Cuanto tiempo le tomara en llegar al punto de reunion?</Text>
                    </View>
                    <View style={styles.horizontal}>
                        <Button
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            title={'3 min'}
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={styles.buttonMinutes}
                            onPress={() => {this.props.offerDriver( '3 min')}}
                        />
                    </View>
                    <View style={styles.horizontal}>
                        <Button
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            title={'5 min'}
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={styles.buttonMinutes}
                            onPress={() => {this.props.offerDriver( '5 min')}}
                        />
                    </View>
                    <View style={styles.horizontal}>
                        <Button
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            title={'10 min'}
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={styles.buttonMinutes}
                            onPress={() => {this.props.offerDriver( '10 min')}}
                        />
                    </View>
                    <View style={styles.horizontal}>
                        <Button
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            title={'15 min'}
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={styles.buttonMinutes}
                            onPress={() => {this.props.offerDriver( '15 min')}}
                        />
                    </View>
                    <View style={styles.horizontal}>
                        <Button
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            title={'20 min'}
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={styles.buttonMinutes}
                            onPress={() => {this.props.offerDriver( '20 min')}}
                        />
                    </View>
                </Card>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    buttonMinutes: {
        borderColor: 'transparent',
        backgroundColor: 'grey',
        borderWidth: 0,
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 40,
        width: '100%'
    },
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
