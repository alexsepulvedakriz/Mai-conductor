import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Header} from 'react-native-elements'
import { colors } from '../common/theme';
import stylesCommon from "../common/styles";

export default class HeaderActionComponent extends React.Component {

    constructor(props){
        super(props);
    }
    render(){
        const {title} = this.props;
        return(
            <View>
                <Header
                    backgroundColor={'transparent'}
                    linearGradientProps={{
                        colors: ['#245b84', '#3ea1c0'],
                        start: [0, 1],
                        end: [1, 1],
                    }}
                    leftComponent={<TouchableOpacity style={{width: 150, marginLeft: 0, padding: 0}} onPress={() => this.props.activate()}><Text style={stylesCommon.headerTitleStyle}>{title}</Text></TouchableOpacity>}
                    containerStyle={stylesCommon.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                />
            </View>
        );
    }
};

