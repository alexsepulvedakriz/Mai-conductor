import React, { Component } from 'react';
import {Modal, View, StyleSheet, Text, Button} from 'react-native';
import stylesCommon from "../common/styles";
import languageJSON from "../common/language";
import {Avatar, Header, ListItem, Rating} from "react-native-elements";
import {SmallMapComponent} from "../components";
import {colors} from "../common/theme";

export default class DetailOfferModal extends Component {
    constructor(props){
        super(props);
    }
    detailRender(item){
        console.log(item);
        let region = {
            latitude: -33.4488897,
            longitude: -70.66926,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        if(item){
            return(
                <View>
                    <View style={{height: 200}}>
                        <SmallMapComponent
                            markerRef={marker => { this.marker = marker; }}
                            mapStyle={stylesCommon.map}
                            mapRegion={region}
                            origen={{latitude: item.latitude_init, longitude: item.longitude_init}}
                            destination={{latitude: item.latitude_end, longitude: item.longitude_end}}
                            distance = {() => {}}
                        />
                    </View>
                    <View style={{marginHorizontal: 10, marginVertical: 20}}>
                        <ListItem
                            title={'Tu viaje con ' + item.name_rider + ' ' + item.last_name_rider}
                            subtitle={
                                <View style={stylesCommon.rowSpaceBetween}>
                                    <Text style={{fontSize:12, color: colors.GREY.btnPrimary}}> {item.vehicle}</Text>
                                    <Rating
                                        imageSize={12}
                                        readonly
                                        startingValue={item.review_rider}
                                    />
                                </View>
                            }
                            titleStyle={{fontSize:14, color: colors.GREY.iconSecondary}}
                            containerStyle={{backgroundColor: 'transparent', margin: 0, padding: 0}}
                            leftAvatar={{ source: {uri: item.ref_photo_rider} }}
                        />
                    </View>
                    <View style={{marginHorizontal: 10}}>
                        <Text style={stylesCommon.listItem}>{languageJSON.from + item.address_from}</Text>
                        <Text style={stylesCommon.listItem}>{languageJSON.to + item.address_to}</Text>
                        <Text style={stylesCommon.listItem}>{languageJSON.description}:  {item.description}</Text>
                        <Text style={stylesCommon.listItem}>{languageJSON.money +item.price}</Text>
                    </View>
                    <View style={[ { flexDirection: 'row', justifyContent: 'space-between',marginHorizontal: 30, marginVertical: 10}]}>
                        <Button
                            title="- $200"
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={{
                                backgroundColor: '#d8d8d8',
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 10,
                                paddingHorizontal:20
                            }}
                            onPress={()=> {}}
                        />
                        <Button
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            title={'$ ' + item.price}
                            buttonStyle={{
                                borderWidth: 0,
                                borderRadius: 10,
                                paddingHorizontal:20
                            }}
                        />
                        <Button
                            title="+ $200"
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={{
                                backgroundColor: '#d8d8d8',
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 10,
                                paddingHorizontal:20
                            }}
                            onPress={()=> {}}
                        />
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
        console.log(item);
        return (
            <Modal
                animationType="slide"
                visible={visible}
                animationType={'slide'}
                transparent={false}
                presentationStyle="fullScreen"
            >
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
                    {this.detailRender(item)}
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
        padding: 10
    }
});
