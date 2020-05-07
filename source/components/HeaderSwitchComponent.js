import React from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Header} from 'react-native-elements'
import { colors } from '../common/theme';
import stylesCommon from "../common/styles";

export default class HeaderSwitchComponent extends React.Component {

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
                    leftComponent={{icon:'md-menu', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback, onPress: ()=>{this.props.navigation();} }}
                    centerComponent={<Text style={stylesCommon.headerTitleStyle}>{title}</Text>}
                    containerStyle={stylesCommon.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                    rightComponent={{icon:'md-share', type:'ionicon', color:colors.WHITE, onPress: ()=>{this.props.showModalSocial();}}}
                />
            </View>
        );
    }
};

