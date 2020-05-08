import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import { Header, Button} from 'react-native-elements'
import { colors } from '../common/theme';
import stylesCommon from "../common/styles";
import {hideModalSocial, showModalSocial} from "../actions/modals";
import {connect} from "react-redux";
import {ShareOverlay} from '../overlays';

const mapStateToProps = state => {
    return{
        modal: state.modal
    }
};
const mapDispatchToProps = dispatch => ({
    showModalSocial: () => dispatch(showModalSocial()),
    hideModalSocial: () => dispatch(hideModalSocial())
});

class HeaderSwitchComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            active: true
        }
    }
    typeButton(){
        if(this.state.active){
            return(
                <Button
                    title={'Activo'}
                    buttonStyle={{
                        borderWidth: 0,
                        padding:10,
                        marginHorizontal:5,
                        backgroundColor: '#0DDF1A',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        width: 120,
                        height: 40
                    }}
                    onPress={() => {this.setState({active: false}); this.props.stop()}}
                />
            )
        } else {
            return(
                <Button
                    title={'Inactivo'}
                    buttonStyle={{
                        borderWidth: 0,
                        padding:10,
                        marginHorizontal:5,
                        backgroundColor: '#DF0D20',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        width: 120,
                        height: 40
                    }}
                    onPress={() => {this.setState({active: true}); this.props.active()}}
                />
            )
        }
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
                    leftComponent={{icon:'md-menu', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback, onPress: ()=>{this.props.navigation();} }}
                    centerComponent={this.typeButton()}
                    containerStyle={stylesCommon.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                    rightComponent={{icon:'md-share', type:'ionicon', color:colors.WHITE, onPress: ()=>{this.props.showModalSocial();}}}
                />
                <ShareOverlay modalVisible={this.props.modal.showModalSocial} hide={() => this.props.hideModalSocial()}/>
            </View>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSwitchComponent);
