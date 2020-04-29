import React, { Component } from 'react';
import {Modal, View, StyleSheet} from 'react-native';

export default class DriverModal extends Component {
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
                animationType="slide"
                visible={visible}
                animationType={'slide'}
                transparent={false}
                presentationStyle="fullScreen"
            >
                <View>
                </View>
            </Modal>
        )
    }
}
