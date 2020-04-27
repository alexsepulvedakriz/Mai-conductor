import React, { Component } from 'react';
import { View,Text, Image} from 'react-native';
import {Overlay} from "react-native-elements";
import stylesCommon from '../common/styles';
import  languageJSON  from '../common/language';


export default class LoadOverlay extends Component {
    constructor(props){
        super(props);
    }
    wrongOrCorrect(correct){
        if(correct){
            return (
                <View style={stylesCommon.columnSpaceBetween}>
                    <View style={stylesCommon.rowSpaceAround}>
                        <Image
                            style={{ height: 30, width: 30}}
                            source={require('../../assets/images/check.png')}
                        />
                    </View>
                    <View style={stylesCommon.rowSpaceAround}>
                        <Text>{languageJSON.sent_data}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={stylesCommon.columnSpaceBetween}>
                    <View style={stylesCommon.rowSpaceAround}>
                        <Image
                            style={{ height: 30, width: 30}}
                            source={require('../../assets/images/wrong.png')}
                        />
                    </View>
                    <View style={stylesCommon.rowSpaceAround}>
                        <Text>{languageJSON.sent_data_fail}</Text>
                    </View>
                </View>
            )
        }
    }
    render(){
        const { Visible, correct } = this.props;
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
                {this.wrongOrCorrect(correct)}
            </Overlay>
        )
    }
}
