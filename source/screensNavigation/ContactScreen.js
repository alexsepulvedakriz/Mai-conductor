import React from 'react';
import {Dimensions, View, Text} from 'react-native';
import  languageJSON  from '../common/language';
import {HeaderComponent,} from '../components';
import { connect } from 'react-redux';
import {Button} from "react-native-elements";
import {_contactWhatsapp, _pressCall} from "../functions/others";

var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
    }
};
const mapDispatchToProps = dispatch => ({
});

class ContactScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
    }


    render() {
        return (
            <View>
                <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={languageJSON.contact_page_title} type={'color'}/>
                <View style={{marginHorizontal: 20, marginTop: 20}}>
                    <Text>{languageJSON.contact_text}</Text>
                </View>
                <View style={{marginHorizontal: 20}}>
                    <Button
                        onPress={() => _contactWhatsapp()}
                        icon={{
                            name: 'whatsapp',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white',
                        }}

                        title='Whatsapp'
                        buttonStyle={{
                            backgroundColor: '#00e676',
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            width: width - 40,
                            marginTop: 20
                        }}
                        underlayColor="transparent"
                    />
                </View>
                <View style={{marginHorizontal: 20}}>
                    <Button
                        onPress={() => _pressCall('95332854') }
                        icon={{
                            name: 'phone-square',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white',
                        }}

                        title='Llamar'
                        buttonStyle={{
                            backgroundColor: '#245b84',
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            width: width - 40,
                            marginTop: 20
                        }}
                        underlayColor="transparent"
                    />
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);
