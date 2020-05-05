import React from 'react';
import {View, Dimensions, Text, TouchableWithoutFeedback, ScrollView, TextInput, Image} from 'react-native';
import {Button, Card, Header, Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import  languageJSON  from '../common/language';
import { colors } from '../common/theme';
import stylesCommon from '../common/styles';
import {HeaderActionComponent, HeaderComponent} from "../components";
import {tripFinish, tripUpdate} from "../actions/trip";
import {documentPicker} from "../functions/documentPicker";

var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        trip: state.trip,
        auth: state.auth,
    }
}
const mapDispatchToProps = dispatch => ({
    tripFinishProps: (info) => dispatch(tripFinish(info)),
    tripUpdateProps: (trip) => dispatch(tripUpdate(trip)),
});

class FinishTripScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            observation_driver:'',
            ref_photo_receiver: null,
            ref_photo_package: null
        }
    }
    finishTrip(){
        if(this.state.ref_photo_receiver && this.state.ref_photo_package){
            const trip = {
                id_driver: this.props.trip.currencyTrip.id_driver,
                id_trip: this.props.trip.currencyTrip.id_trip,
                observation_driver: this.state.observation_driver,
                ref_photo_receiver: this.state.ref_photo_receiver,
                ref_photo_package: this.state.ref_photo_receiver
            };
            this.props.tripFinishProps(trip);
        } else {
            alert('Todos los campos son obligatorios');
        }
    }
    render() {
        return (
            <View style={stylesCommon.columnSpaceBetween}>
                <HeaderActionComponent  activate={() => {this.props.navigation.navigate('Trip');}} title={'Cancelar'}/>
                <ScrollView style={{marginHorizontal: 20}}>
                    <View style={stylesCommon.rowSpaceBetween}>
                        <Button
                            title={languageJSON.photo_package}
                            titleStyle={{ fontWeight: '500' }}
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            buttonStyle={[stylesCommon.buttonPositive,{ paddingHorizontal: 50}]}
                            onPress={() => documentPicker().then(res => {this.setState({ref_photo_package: res})})}
                        />
                        <Image
                            style={{backgroundColor: 'white', height: 100, width: 100}}
                            source={require('../../assets/images/photo-upload.png')}
                        />
                    </View>
                    <View style={stylesCommon.rowSpaceBetween}>
                        <Button
                            title={languageJSON.photo_receiver_id_card}
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={[stylesCommon.buttonPositive,{ paddingHorizontal: 50}]}
                            onPress={() => documentPicker().then(res => {this.setState({ref_photo_receiver: res})})}
                        />
                        <Image
                            style={{backgroundColor: 'white', height: 100, width: 100}}
                            source={require('../../assets/images/photo-upload.png')}
                        />
                    </View>
                    <View>
                        <Text style={stylesCommon.indicationText}>
                            {languageJSON.observation_driver}
                        </Text>
                        <View style = {stylesCommon.searchSection}>
                            <TextInput
                                style={stylesCommon.inputSearch}
                                editable={true}
                                multiline={true}
                                numberOfLines={3}
                                value={this.state.observation_driver}
                                onChangeText={(Text) => {this.setState({observation_driver: Text})}}
                            />
                            <Icon
                                iconStyle={stylesCommon.searchIcon}
                                name='map-marker'
                                size={16}
                                type='font-awesome'
                                color={'white'}/>
                        </View>
                    </View>

                </ScrollView>
                <View style={{marginHorizontal: 20, marginBottom: 20}}>
                    <View>
                        <Button
                            title={languageJSON.button_accept}
                            titleStyle={{ fontWeight: '500' }}
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            buttonStyle={stylesCommon.buttonPositive}
                            onPress={() => {}}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishTripScreen);
