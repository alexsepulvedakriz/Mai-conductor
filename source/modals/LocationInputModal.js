import React, {Component} from 'react';
import { Modal, StyleSheet, View, Button} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Icon } from 'react-native-elements'
import { colors } from '../common/theme';

const homePlace = { description: 'Casa', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Trabajo', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};



export default class LocationInputModal extends Component {
    constructor(props){
        super(props);
    }
    getDirections = (origin) => {
        return fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+origin+'&key='+'AIzaSyDl3WK-NQNDqGJwbqH71FIYYtnlx5JwtDY')
            .then((res) => res.json())
            .then((resJson) => {
                this.props.direccion(origin,resJson.results[0].geometry.location);
            })
            .catch((err) => {
                console.error(err)
            })
    }

    render(){
        const { modalVisible} = this.props;
        let visible = false;
        if(modalVisible){
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
                <View style={[styles.container, styles.horizontal]}>
                    <GooglePlacesAutocomplete
                        placeholder='Buscar'
                        minLength={3} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'default'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            if(details.geometry){
                                this.props.direccion(details.formatted_address, details.geometry.location);
                            } else {
                                this.getDirections(details.formatted_address);
                            }

                        }}
                        getDefaultValue={() => ''}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyDl3WK-NQNDqGJwbqH71FIYYtnlx5JwtDY',
                            language: 'en', // language of the results// default: 'geocode'
                        }}
                        styles={{
                            textInputContainer: {
                                width: '100%',
                                backgroundColor: colors.GREY.Deep_Nobel,
                                height: 51
                            },
                            textInput: {
                                borderColor: colors.GREY.Deep_Nobel,
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                                color: colors.GREY.default
                            },
                        }}
                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Posición actual"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            type: 'cafe'
                        }}
                        GooglePlacesDetailsQuery={{
                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                            fields: 'formatted_address',
                        }}
                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        predefinedPlaces={[homePlace, workPlace]}
                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        /*renderLeftButton={()  => <Text>C</Text>}
                        renderRightButton={() => <Text>Custom text after the input</Text>}*/
                    />
                    <Icon
                        name='close'
                        type='font-awesome'
                        size= {30}
                        color='white'
                        iconStyle={{backgroundColor: colors.GREY.Deep_Nobel, padding: 10}}
                        onPress={() => {this.props.close()}}
                    />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
    }
});
