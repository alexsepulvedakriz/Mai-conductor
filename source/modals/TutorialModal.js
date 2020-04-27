import React, { Component } from 'react';
import {Dimensions, Image, Modal, Text, View} from 'react-native';
import Carousel , { Pagination }from 'react-native-snap-carousel';
import {colors} from "../common/theme";
import {Button} from "react-native-elements";
import  languageJSON  from '../common/language';

var { height, width } = Dimensions.get('window');

export default class TutorialModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:true,
            activeIndex:0,
            carouselItems: [
                {
                    title: languageJSON.tutorial_offer_title,
                    text: languageJSON.tutorial_offer_subtitle,
                    image: require('../../assets/images/tutorial/offers.png')
                },
                {
                    title:languageJSON.tutorial_fast_title,
                    text: languageJSON.tutorial_fast_subtitle,
                    image: require('../../assets/images/tutorial/fast.png')
                },
                {
                    title:languageJSON.tutorial_money_title,
                    text: languageJSON.tutorial_money_subtitle,
                    image: require('../../assets/images/tutorial/money.png')
                }
            ]
        }
    }
    _renderItem({item,index}){
        return (
            <View style={{
                backgroundColor: 'transparent',
                borderRadius: 20,
                height: height - 200,
                width: width,
                alignItems:'center'
            }}>
                <Image source={item.image} style={{width: 300, height: 300}}/>
                <Text style={{fontSize: 20, marginHorizontal: 20}}>{item.title}</Text>
                <Text style={{fontSize: 16, marginHorizontal: 20, marginTop: 10, textAlign: 'center'}}>{item.text}</Text>
            </View>

        )
    }
    get pagination () {
        const { carouselItems, activeIndex } = this.state;
        return (
            <Pagination
                dotsLength={carouselItems.length}
                activeDotIndex={activeIndex}
                containerStyle={{ backgroundColor: colors.WHITE, margin: 0, padding: 0}}
                dotContainerStyle={{ margin: 0, padding: 0}}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    marginVertical: 0,
                    backgroundColor: colors.BLACK
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    render(){
        const { modalVisible } = this.props;
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
                <View style={{marginTop: 20}}>
                    <Carousel
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.state.carouselItems}
                        sliderWidth={width}
                        itemWidth={width}
                        renderItem={this._renderItem}
                        onSnapToItem = { index => {this.setState({activeIndex:index})} } />
                    { this.pagination }
                </View>
                <View style={{marginHorizontal: 20}}>
                    <Button
                        onPress={() => this.props.close()}
                        icon={{
                            name: 'arrow-right',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white',
                        }}
                        linearGradientProps={{
                            colors: ['#245b84', '#3ea1c0'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        title='Continuar'
                        buttonStyle={{
                            borderWidth: 0,
                            borderRadius: 10,
                            paddingHorizontal: 15
                        }}
                        iconRight={true}
                        underlayColor="transparent"
                    />
                </View>
            </Modal>
        )
    }
}
