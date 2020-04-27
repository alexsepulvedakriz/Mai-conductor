import React, { Component } from 'react';
import { ActivityIndicator, View,Text} from 'react-native';
import {Overlay} from "react-native-elements";
import stylesCommon from '../common/styles';

export default class LoadOverlay extends Component {
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
                windowBackgroundColor="rgba(0, 0, 0, .3)"
                overlayBackgroundColor="white"
                width="80%"
                height="20%"
            >
                <View style={stylesCommon.columnSpaceBetween}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <View style={stylesCommon.rowSpaceAround}>
                        <Text>{message}</Text>
                    </View>
                </View>
            </Overlay>
        )
    }
}
