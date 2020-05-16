import React from 'react';
import {View, Text, Modal, TextInput, Dimensions} from 'react-native';
import stylesCommon from '../common/styles';
import {Button, Header, Icon} from "react-native-elements";
import {colors} from "../common/theme";
import  languageJSON  from '../common/language';

var { height, width } = Dimensions.get('window');

export default class AddComplaintModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: ''
        }
    }

    addComplaint(){
        this.props.addComplaint(this.state.description);
        this.setState({description: ''});
    }

    render() {
        const { Visible} = this.props;
        let visible = false;
        if(Visible){
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
                <Header
                    linearGradientProps={{
                        colors: ['#245b84', '#3ea1c0'],
                        start: [0, 1],
                        end: [1, 1],
                    }}
                    centerComponent={<Text style={stylesCommon.headerTitleStyle}>{languageJSON.add_complaint}</Text>}
                    containerStyle={stylesCommon.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                    leftComponent={{icon:'arrow-left', type:'font-awesome', color: 'white', onPress: ()=>{this.props.close();}}}
                />
                <View style={[{marginHorizontal: 20, marginTop: 10}, stylesCommon.bottomDistance]}>
                    <View>
                        <Text style={{fontSize: 16, marginBottom: 10, color: colors.GREY.iconSecondary}}>
                            {languageJSON.description}
                        </Text>
                        <TextInput
                            style={stylesCommon.textInputMultiRow}
                            numberOfLines={3}
                            value={this.state.description}
                            onChangeText={(value) => {this.setState({description: value})}}
                        />
                    </View>
                </View>
                <View style={{marginHorizontal: 20, marginTop: 10}}>
                    <Button
                        title={languageJSON.add_complaint}
                        titleStyle={{ fontWeight: '500' }}
                        linearGradientProps={{
                            colors: ['#245b84', '#3ea1c0'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        onPress={() => { this.addComplaint()}}
                        buttonStyle={stylesCommon.buttonPositive}
                    />
                </View>
            </Modal>
        );
    }
}
