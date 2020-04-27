import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Overlay} from "react-native-elements";
import stylesCommon from '../common/styles';
import languageJSON from "../common/language";
import DatePicker from 'react-native-datepicker';
import {colors} from "../common/theme";

export default class DatePickerOverlay extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            mode: 'time',
            show: false,
            hora: '13:00'
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
                windowBackgroundColor="rgba(0, 0, 0, .5)"
                overlayBackgroundColor="white"
                width="80%"
                height={300}
                overlayStyle={{borderRadius: 20}}
            >
                <View style={styles.horizontal} >
                    <Text style={styles.headerTitleStyle}>Selecciona fecha y hora</Text>
                </View>
                <View style={styles.horizontal} >
                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.date} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36,
                            },
                        }}
                        onDateChange={date => {
                            this.setState({ date: date });
                        }}
                    />
                </View>
                <View style={styles.horizontal} >
                    <DatePicker
                        style={{ width: 200 }}//initial date from state
                        mode="time" //The enum of date, datetime and time
                        placeholder="selecciona hora"
                        date={this.state.hora}
                        is24Hour={true}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 36,
                            },
                        }}
                        onDateChange={date => {
                            this.setState({ hora: date });
                        }}
                    />
                </View>
                <View style={styles.horizontal}>
                    <Button
                        title={languageJSON.confirm_button}
                        titleStyle={{ fontWeight: '500' }}
                        buttonStyle={[stylesCommon.buttonPositive, {width: '100%'}]}
                        onPress={() => {}}
                    />
                </View>
                <View style={styles.horizontal}>
                    <Button
                        title={languageJSON.cancel_button}
                        titleStyle={{ fontWeight: '500' }}
                        buttonStyle={[stylesCommon.buttonNegative, {width: '100%'}]}
                        onPress={() => {this.props.close()}}
                    />
                </View>
            </Overlay>

        )
    }
}

const styles = StyleSheet.create({
    cardWithMargin: {
        borderWidth: 1, // Remove Border
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
