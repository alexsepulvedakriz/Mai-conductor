import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Card, Overlay, Rating} from "react-native-elements";
import {colors} from "../common/theme";
import Timer from "react-native-timekeeper-new";
import {transformTimeStampToDateToString} from "../functions/others";

export default class PossibleTripOverlay extends Component {
    constructor(props){
        super(props);
        this.state = {
            cardCollapsible: false
        }
    }
    detailTrip(item){
        if(item){
            return(
                <View style={styles.horizontal}>
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
                        <Text style={{fontSize: 18, color: 'black'}}>{item.address_from}</Text>
                        <Text style={{fontSize: 18, color: 'black'}}>{item.address_to}</Text>
                        <Text style={{fontSize: 14, color: colors.GREY.iconSecondary}}>${item.price} {item.distance} km</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.horizontal}>

                </View>
            )
        }
    }
    render(){
        const { Visible, item} = this.props;
        let visible = false;
        if(Visible){
            visible = true;
        }
        return (
            <Overlay
                isVisible={visible}
                windowBackgroundColor="rgba(0, 0, 0, .3)"
                overlayBackgroundColor="white"
                width="90%"
                height={350}
                overlayStyle={{borderRadius: 20}}
            >
                <Card containerStyle={styles.cardWithMargin}>
                    {this.detailTrip(item)}
                    <View style={styles.horizontal}>
                        <Timer
                            beat={false}
                            seconds={30}
                            radius={35}
                            borderWidth={6}
                            color='#3ea1c0'
                            bgColor='#3ea1c0'
                            bgColorSecondary="#245b84"
                            bgColorThirt="#3ea1c0"
                            shadowColor='#245b84'
                            textStyle={{ fontSize: 20, color: '#FFF', }}
                            subTextStyle={{ fontSize: 5, color: '#FFF', }}
                            onTimeElapsed={() => {console.log('Time elapsed')} }
                            isPausable={false}
                            onPause={() => console.log('Pause')}
                            onResume={() => console.log('Resume')}
                            timeDisplay={'30'}
                        />
                    </View>
                </Card>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    cardWithMargin: {
        borderWidth: 0, // Remove Border
        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow IOS
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        width: '100%',
        marginHorizontal:0,
        elevation: 0 // This is for Android
    },
    horizontal: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-around",
        marginHorizontal: 0,
        marginTop: 10
    },
    headerTitleStyle: {
        color: colors.GREY.iconSecondary,
        fontFamily:'Roboto-Bold',
        fontSize: 20,
        marginBottom: 10
    },
    textStyle: {
        color: colors.WHITE,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
});
