import React, { Component } from 'react';
import {Modal, View, StyleSheet, Text, ScrollView} from 'react-native';
import { Header, Button, Card, ListItem, Rating} from 'react-native-elements';
import {colors} from "../common/theme";
import {TimerProgressBarComponent} from "../components";

export default class ListOfferModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            progress: 100,
            progressWithOnComplete: 0,
            progressCustomized: 0,
            timeLimit: 0
        }
    }
    acceptOffer(offerDriver){
        this.props.accept(offerDriver);
    }
    declineOffer(offerDriver){
        this.props.decline(offerDriver);
    }
    cancelOffer(){
        this.props.cancel();
    }
    listItem(data){
        if(data){
            return (
                <View style={[styles.container, styles.horizontal]}>
                    {
                        data.map((item, i) => (
                                <Card containerStyle={styles.cardAcceptDecline} key={i}>
                                <ListItem
                                    title={
                                        <View style={styles.listContainer}>
                                            <View style={{marginLeft: 0}}>
                                                <Text style={{fontSize:17, fontWeight: 'bold'}}>{item.nombre_completo}</Text>
                                                <Rating
                                                    imageSize={16}
                                                    readonly
                                                    startingValue={item.evaluacion_conductor}
                                                    style={{ marginRight: 80}}
                                                />
                                            </View>
                                            <View style={{marginRight: 0}}>
                                                <Text style={{fontSize:17, fontWeight: 'bold'}}>${item.precio}</Text>
                                                <Text style={{fontSize:8}}> {item.minutos_llegada} min</Text>
                                                <Text style={{fontSize:12}}>{item.distancia} Km</Text>
                                            </View>
                                        </View>
                                    }
                                    leftAvatar={{ source: {uri: item.id_photo_conductor}}}
                                />
                                <View style={{marginVertical: 10}}>
                                    <TimerProgressBarComponent finish={()=> {this.declineOffer(item)}}/>
                                </View>
                                <View style={styles.buttonsContainer}>
                                    <Button
                                        icon={{
                                            name: 'check',
                                            type: 'font-awesome',
                                            size: 15,
                                            color: 'white',
                                        }}
                                        linearGradientProps={{
                                            colors: ['#245b84', '#3ea1c0'],
                                            start: [1, 0],
                                            end: [0.2, 0],
                                        }}
                                        title='Aceptar'
                                        buttonStyle={{
                                            borderWidth: 0,
                                            borderRadius: 10,
                                            paddingHorizontal: 25
                                        }}
                                        onPress={() => {this.acceptOffer(item)}}
                                    />
                                    <Button
                                        title="Declinar"
                                        icon={{
                                            name: 'times',
                                            type: 'font-awesome',
                                            size: 15,
                                            color: 'white',
                                        }}
                                        titleStyle={{ fontWeight: '500' }}
                                        buttonStyle={{
                                            backgroundColor: '#f7ab00',
                                            borderColor: 'transparent',
                                            borderWidth: 0,
                                            borderRadius: 10,
                                            paddingHorizontal: 25
                                        }}
                                        onPress={() => {this.declineOffer(item)}}
                                    />
                                </View>
                            </Card>
                            ))
                    }
                </View>
            )
        }
    }

    render(){
        const { modalVisible, data} = this.props;
        return (
            <Modal
                animationType="slide"
                visible={modalVisible}
                animationType={'slide'}
                transparent={true}
                presentationStyle="fullScreen"
            >
                <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.7)'}}>
                    <Header
                        backgroundColor={'white'}
                        containerStyle={styles.headerStyle}
                        rightComponent={<Text onPress={() => this.cancelOffer()} style={styles.headerTitleStyle}>{'Cancelar'}</Text>}
                    />
                    {this.listItem(data)}
                </ScrollView>

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
        flexDirection: "column",
        padding: 10
    },
    cardAcceptDecline: {
        borderWidth: 1, // Remove Border
        shadowColor: 'black', // Remove Shadow IOS
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        borderRadius: 10,
        elevation: 0 // This is for Android
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    headerTitleStyle: {
        color: colors.GREY.default,
        fontFamily:'Roboto-Bold',
        fontSize: 17
    },
    headerStyle: {
        margin:0,
        padding:0,
        borderBottomWidth: 0
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
});
