import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Button, Card, Overlay} from "react-native-elements";
import stylesCommon from '../common/styles';
import {colors} from "../common/theme";
import languageJSON from "../common/language";
import {documentPicker} from "../functions/documentPicker";

export default class AccidentOverlay extends Component {
    constructor(props){
        super(props);
        this.state = {
            photo: null,
            description: ''
        }
    }
    render(){
        const {Visible} = this.props;
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
                height={320}
                overlayStyle={{borderRadius: 20}}
            >
                <Card containerStyle={styles.cardWithMargin}>
                    <View style={styles.horizontal}>
                        <Text style={styles.headerTitleStyle}>{languageJSON.accident}</Text>
                    </View>
                    <View style={styles.horizontal}>
                        <View style = {stylesCommon.searchSection}>
                            <TextInput
                                style={stylesCommon.inputSearch}
                                editable={true}
                                multiline={true}
                                numberOfLines={3}
                                value={this.state.description}
                                onChangeText={(Text) => {this.setState({description: Text})}}
                            />
                        </View>
                    </View>
                    <View style={styles.horizontal}>
                        <Button
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            onPress={() => documentPicker().then(res => this.setState({photo: res}))}
                            title={languageJSON.photo_accident}
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={[stylesCommon.buttonPositive, {width: '100%'}]}
                            icon={{ type: 'font-awesome', name: 'image', color: 'white' }}
                            iconRight={true}
                        />
                    </View>
                    <View style={styles.horizontal}>
                        <Button
                            title={languageJSON.accept_button}
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={styles.acceptButton}
                            onPress={() => this.props.addAccident({
                                photo: this.state.photo,
                                description: this.state.description
                            })}
                        />
                        <Button
                            title={languageJSON.cancel_button}
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={styles.cancelButton}
                            onPress={() => this.props.cancel()}
                        />
                    </View>
                </Card>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    cancelButton: {
        backgroundColor: colors.RED,
        height: 40,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        marginTop:30,
        paddingHorizontal: 30,
        borderRadius:10,
    },
    acceptButton: {
        backgroundColor: colors.GREEN.default,
        height: 40,
        paddingHorizontal: 30,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        marginTop:30,
        borderRadius:10,
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
