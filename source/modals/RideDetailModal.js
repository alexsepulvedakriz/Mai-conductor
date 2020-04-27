import React from 'react';
import {View, Text, Modal} from 'react-native';
import stylesCommon from '../common/styles';
import {SmallMapComponent} from "../components";
import {Header, ListItem} from "react-native-elements";
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
                            origen={{latitude: item.latitude_inicio, longitude: item.longitude_inicio}}
                            destination={{latitude: item.latitude_fin, longitude: item.longitude_fin}}
                            distance = {() => {}}
                        />
                    </View>

                    <View style={{marginHorizontal: 10, marginVertical: 20}}>
                        <ListItem
                            title={'Tu viaje con ' + item.nombre_conductor}
                            subtitle={item.vehiculo}
                            titleStyle={{fontSize:14, color: colors.GREY.iconSecondary}}
                            containerStyle={{backgroundColor: 'transparent', margin: 0, padding: 0}}
                            leftAvatar={{ source: {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg'} }}
                        />
                    </View>
                    <View style={{marginHorizontal: 10}}>
                        <Text style={stylesCommon.listItem}>{languageJSON.from + item.direccion_inicio}</Text>
                        <Text style={stylesCommon.listItem}>{languageJSON.to +item.direccion_fin}</Text>
                        <Text style={stylesCommon.listItem}>{languageJSON.description +item.descripcion}</Text>
                        <Text style={stylesCommon.listItem}>{languageJSON.date +this.date(item.fecha)}</Text>
                        <Text style={stylesCommon.listItem}>{languageJSON.money +item.precio}</Text>
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
