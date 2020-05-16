import React from 'react';
import {View, Text, Modal} from 'react-native';
import stylesCommon from '../common/styles';
import {SmallMapComponent} from "../components";
import {Header, ListItem, Rating, Button} from "react-native-elements";
import {colors} from "../common/theme";
import  languageJSON  from '../common/language';

export default class RideDetailModal extends React.Component {
    constructor(props){
        super(props);
    }
    date(date){
        const a = new Date(date.seconds * 1000);
        const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date2 = a.getDate();
        const time = date2 + ' ' + month + ' ' + year;
        return(time);
    }
    itemLoaded(item){
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
                            markerCord={this.passData}
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
                        <Text style={stylesCommon.listItem}>{languageJSON.date +this.date(item.date)}</Text>
                        <Text style={stylesCommon.listItem}>{languageJSON.money +item.price}</Text>
                    </View>
                </View>
            )
        }
    }
    render() {

        const { Visable, item } = this.props;
        let visible = false;
        if(Visable){
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
                    centerComponent={<Text style={stylesCommon.headerTitleStyle}>{'Detalle viaje'}</Text>}
                    containerStyle={stylesCommon.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                    leftComponent={{icon:'arrow-left', type:'font-awesome', color: 'white', onPress: ()=>{this.props.close();}}}
                />
                <View>
                    {this.itemLoaded(item)}
                </View>
            </Modal>
        );
    }
}
