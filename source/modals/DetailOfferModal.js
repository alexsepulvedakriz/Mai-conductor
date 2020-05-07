import React, { Component } from 'react';
import stylesCommon from "../common/styles";
import languageJSON from "../common/language";
import {StyleSheet, View, Dimensions, Text, TouchableHighlight, Modal} from 'react-native';
import {Button, Card, Header, Avatar, Rating} from 'react-native-elements';
import {MapComponent} from "../components";
import {colors} from "../common/theme";
import Collapsible from "react-native-collapsible";

var { height, width } = Dimensions.get('window');

export default class DetailOfferModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            cardCollapsible: false,
            price: 0,
            time_to_arrive: 0
        }
    }
    sendOfferDriver(item){
        const offerDriver = {
            ... item,
            price: (this.state.price + parseFloat(item.price)),
            time_to_arrive: this.state.time_to_arrive
        };
        this.props.offerDriver(offerDriver);
    }
    detailRender(item){
        let region = {
            latitude: -33.4488897,
            longitude: -70.66926,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        if(item){
            return(
                <View style={[stylesCommon.columnSpaceBetween, {height: 500}]}>
                    <View style={stylesCommon.backgroundMap}>
                        <MapComponent
                            markerRef={marker => { this.marker = marker; }}
                            mapStyle={stylesCommon.map} mapRegion={region}
                            origen={{latitude: item.latitude_init, longitude: item.longitude_init}}
                            destination={{latitude: item.latitude_end, longitude: item.longitude_end}}
                            distance = {() => {}}
                        />
                    </View>
                    <View>
                        <Header
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [0, 1],
                                end: [1, 1],
                            }}
                            centerComponent={<Text style={stylesCommon.headerTitleStyle}>{languageJSON.offer_detail}</Text>}
                            containerStyle={stylesCommon.headerStyle}
                            innerContainerStyles={{marginLeft:10, marginRight: 10}}
                            leftComponent={{icon:'arrow-left', type:'font-awesome', color: 'white', onPress: ()=>{this.props.close();}}}
                        />
                    </View>
                    <View>
                        <TouchableHighlight onPress={() => {this.setState({cardCollapsible: !this.state.cardCollapsible});}} style={{width: '100%'}} underlayColor={'transparent'}>
                            <Collapsible collapsed={this.state.cardCollapsible}
                                         collapsedHeight={50}
                            >
                                <Card containerStyle={styles.cardWithMargin}>
                                    <View style={stylesCommon.rowSpaceAround}>
                                        <View
                                            style={{ backgroundColor: 'transparent', borderTopWidth: 4, borderColor: colors.GREY.secondary, width: 60, marginVertical: 0}}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', borderColor: colors.GREY.Deep_Nobel,}}>
                                        <View style={{marginVertical: 10, marginHorizontal: 10}}>
                                            <Avatar
                                                source={{
                                                    uri: item.ref_photo_rider,
                                                }}
                                                rounded
                                                size={"medium"}
                                            />
                                            <Text style={{marginTop: 5, fontSize: 10, color: colors.GREY.iconSecondary, textAlign: 'center'}}>{item.name_rider}</Text>
                                            <Rating
                                                style={{marginVertical: 5}}
                                                ratingCount={3}
                                                imageSize={10}
                                                readonly={true}
                                            />
                                        </View>
                                        <View style={{marginVertical: 10, marginLeft: 5}}>
                                            <Text style={{fontSize: 15, color: 'black'}}>{item.address_from}</Text>
                                            <Text style={{fontSize: 15, color: 'black'}}>{item.address_to}</Text>
                                            <Text style={{fontSize: 12, color: colors.GREY.iconSecondary}}>{item.duration} min {item.distance} km {item.type_truck}</Text>
                                            <Text style={{fontSize: 12, color: colors.GREY.iconSecondary}}>{item.description}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={stylesCommon.rowSpaceBetween}>
                                            <Button
                                                title="- $500"
                                                titleStyle={{ fontWeight: '500' }}
                                                linearGradientProps={{
                                                    colors: ['#245b84', '#3ea1c0'],
                                                    start: [1, 0],
                                                    end: [0.2, 0],
                                                }}
                                                buttonStyle={{
                                                    borderColor: 'transparent',
                                                    borderWidth: 0,
                                                    borderRadius: 10,
                                                    paddingHorizontal:10
                                                }}
                                                onPress={() => {this.setState({price: this.state.price - 500})}}
                                            />
                                            <Button
                                                linearGradientProps={{
                                                    colors: ['#245b84', '#3ea1c0'],
                                                    start: [1, 0],
                                                    end: [0.2, 0],
                                                }}
                                                title={'Ofrecer por $' + (parseFloat(item.price) + this.state.price)}
                                                buttonStyle={{
                                                    borderWidth: 0,
                                                    borderRadius: 10,
                                                    paddingHorizontal:10
                                                }}
                                                onPress={() => {this.sendOfferDriver(item)}}
                                            />
                                            <Button
                                                title="+ $500"
                                                titleStyle={{ fontWeight: '500' }}
                                                linearGradientProps={{
                                                    colors: ['#245b84', '#3ea1c0'],
                                                    start: [1, 0],
                                                    end: [0.2, 0],
                                                }}
                                                buttonStyle={{
                                                    borderColor: 'transparent',
                                                    borderWidth: 0,
                                                    borderRadius: 10,
                                                    paddingHorizontal:10
                                                }}
                                                onPress={() => {this.setState({price: this.state.price + 500})}}
                                            />
                                        </View>
                                        <View>
                                            <Button
                                                title={languageJSON.button_cancel}
                                                titleStyle={{ fontWeight: '500' }}
                                                buttonStyle={stylesCommon.buttonNegative}
                                                onPress={()=>{this.props.close();}}
                                            />
                                        </View>
                                    </View>
                                </Card>
                            </Collapsible>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        }
    }
    render(){
        const { modalVisible, item } = this.props;
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
                {this.detailRender(item)}
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
        padding: 10
    },
    cardWithMargin: {
        borderWidth: 0, // Remove Border
        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow IOS
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: width - 20,
        marginHorizontal:10,
        elevation: 0 // This is for Android
    },
    cardInside: {
        borderWidth: 2, // Remove Border
        shadowColor: 'black', // Remove Shadow IOS
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        borderRadius: 20,
        marginHorizontal: 0,
        elevation: 0 // This is for Android
    },
    horizontalContent:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingEnd: 200
    },
    spaceHorizontal1:{
        flex: 1.5,
        alignItems:'center'
    },
    searchText:{
        color: 'black',
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: 'bold'
    },
});
