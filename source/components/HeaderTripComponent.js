import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Header} from 'react-native-elements'
import { colors } from '../common/theme';
import stylesCommon from "../common/styles";

export default class HeaderTripComponent extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <View>
                <Header
                    backgroundColor={'transparent'}
                    linearGradientProps={{
                        colors: ['#245b84', '#3ea1c0'],
                        start: [0, 1],
                        end: [1, 1],
                    }}
                    leftComponent={<TouchableOpacity style={{width: 200}} onPress={() => this.props.cancel()}><Text style={stylesCommon.headerTitleStyle}>{'Informar un problema'}</Text></TouchableOpacity>}
                    containerStyle={stylesCommon.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                />
            </View>
        );
    }
};

