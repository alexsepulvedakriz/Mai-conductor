import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import { Header} from 'react-native-elements'
import { colors } from '../common/theme';
import stylesCommon from "../common/styles";
import {hideModalSocial, showModalSocial} from "../actions/modals";
import {connect} from "react-redux";
import {ShareOverlay} from "./index";

const mapStateToProps = state => {
    return{
        modal: state.modal
    }
};
const mapDispatchToProps = dispatch => ({
    showModalSocial: () => dispatch(showModalSocial()),
    hideModalSocial: () => dispatch(hideModalSocial())
});

class HeaderComponent extends React.Component {

    constructor(props){
        super(props);
    }

    typeHeader(title, type){
        if(type === 'color'){
            return(
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
            )
        } else {
            return (
                <Header
                    backgroundColor={'white'}
                    leftComponent={{icon:'md-menu', type:'ionicon', color:colors.GREY.Deep_Nobel, size: 30, component: TouchableWithoutFeedback, onPress: ()=>{this.props.navigation();} }}
                    centerComponent={<Text style={stylesCommon.headerTitleBlackStyle}>{title}</Text>}
                    containerStyle={stylesCommon.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                    rightComponent={{icon:'md-share', type:'ionicon', color:colors.GREY.Deep_Nobel, onPress: ()=>{this.props.showModalSocial();}}}
                />
            )
        }
    }

    render(){
        const {title, type} = this.props;
        return(
            <View>
                {this.typeHeader(title, type)}
                <ShareOverlay modalVisible={this.props.modal.showModalSocial} hide={() => this.props.hideModalSocial()}/>
            </View>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
