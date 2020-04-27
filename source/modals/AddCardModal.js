import React from 'react';
import {View, Text, Modal, TextInput, Dimensions} from 'react-native';
import stylesCommon from '../common/styles';
import {Button, Header, Icon} from "react-native-elements";
import {colors} from "../common/theme";
import  languageJSON  from '../common/language';

var { height, width } = Dimensions.get('window');

export default class AddCardModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            card_number: '',
            expiration_date: '',
            cvv: '',
            name: '',
            lastName: '',
        }
    }

    addCard(){
        this.props.addCard(this.state.card_number, this.state.expiration_date, this.state.cvv, this.state.name, this.state.lastName);
        this.setState({card_number: '', expiration_date: '', cvv: '', name: '', lastName: ''});
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
                    centerComponent={<Text style={stylesCommon.headerTitleStyle}>{languageJSON.add_card}</Text>}
                    containerStyle={stylesCommon.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                    leftComponent={{icon:'arrow-left', type:'font-awesome', color: 'white', onPress: ()=>{this.props.close();}}}
                />
                <View style={[{marginHorizontal: 20, marginTop: 10}, stylesCommon.bottomDistance]}>
                    <View>
                        <Text style={{fontSize: 16, marginBottom: 10, color: colors.GREY.iconSecondary}}>
                            {languageJSON.card_number}
                        </Text>
                        <TextInput
                            style={stylesCommon.textInputSimple}
                            placeholder={'XXXX XXXX XXXX XXXX'}
                            value={this.state.card_number}
                            onChangeText={(value) => {this.setState({card_number: value})}}
                        />
                    </View>
                    <View style={stylesCommon.rowSpaceBetween}>
                        <View>
                            <Text style={{fontSize: 16, marginBottom: 10, color: colors.GREY.iconSecondary, width: (width/2)-30}}>
                                {languageJSON.expiration_date}
                            </Text>
                            <TextInput
                                style={stylesCommon.textInputSimple}
                                value={this.state.expiration_date}
                                placeholder={'MM/AA'}
                                onChangeText={(value) => {this.setState({expiration_date: value})}}
                            />
                        </View>
                        <View>
                            <Text style={{fontSize: 16, marginBottom: 10, color: colors.GREY.iconSecondary, width: (width/2)-30}}>
                                {languageJSON.cvv}
                            </Text>
                            <TextInput
                                style={stylesCommon.textInputSimple}
                                placeholder={'CVV'}
                                value={this.state.cvv}
                                onChangeText={(value) => {this.setState({cvv: value})}}
                            />
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={{fontSize: 16, marginBottom: 10, color: colors.GREY.iconSecondary}}>
                                {languageJSON.holder}
                            </Text>
                        </View>
                        <View style={stylesCommon.rowSpaceBetween}>
                            <TextInput
                                style={[stylesCommon.textInputSimple, {width: (width/2)-30}]}
                                placeholder={'Nombre'}
                                value={this.state.name}
                                onChangeText={(value) => {this.setState({name: value})}}
                            />
                            <TextInput
                                style={[stylesCommon.textInputSimple, {width: (width/2)-30}]}
                                placeholder={'Apellido'}
                                value={this.state.lastName}
                                onChangeText={(value) => {this.setState({lastName: value})}}
                            />
                        </View>
                    </View>
                    <View style={stylesCommon.rowSpaceBetween}>
                        <Icon
                            name='shield'
                            type='font-awesome'
                            color='#f50'
                            iconStyle={{width: 30, marginVertical: 5}}
                            />
                        <Text>{languageJSON.warning_add_card}</Text>
                    </View>

                </View>
                <View style={{marginHorizontal: 20, marginTop: 10}}>
                    <Button
                        title={languageJSON.add_card}
                        titleStyle={{ fontWeight: '500' }}
                        linearGradientProps={{
                            colors: ['#245b84', '#3ea1c0'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        onPress={() => { this.addCard()}}
                        buttonStyle={stylesCommon.buttonPositive}
                    />
                </View>
            </Modal>
        );
    }
}
