import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Overlay, AirbnbRating, Card} from "react-native-elements";
import stylesCommon from '../common/styles';
import {colors} from "../common/theme";
import  languageJSON  from '../common/language';

export default class EvaluatingTripOverlay extends Component {
    constructor(props){
        super(props);
        this.state = {
            review_driver: 3.5
        }
    }
    updateTrip(){
        this.props.sendReview(this.state.review_driver);
    }
    render(){
        const {Visible} = this.props;
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
                height={300}
                overlayStyle={{borderRadius: 20}}
            >
                <Card containerStyle={styles.cardWithMargin}>
                    <View style={styles.horizontal}>
                        <Text style={styles.headerTitleStyle}>{languageJSON.evaluate}</Text>
                    </View>
                    <View style={styles.horizontal}>
                        <AirbnbRating
                            fractions={1}
                            reviews={["Terrible", "Mal", "Meh", "OK", "Bien", "Hmm...", "Muy bien", "Excelente"]}
                            imageSize={40}
                            startingValue={this.state.review_driver}
                            onFinishRating={(value) => {this.setState({review_driver: value })}}
                        />
                    </View>
                    <View style={styles.horizontal}>
                        <Button
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            title={languageJSON.send_review}
                            titleStyle={{ fontWeight: '500' }}
                            buttonStyle={[stylesCommon.buttonPositive, {width: '100%'}]}
                            onPress={() => this.updateTrip()}
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
