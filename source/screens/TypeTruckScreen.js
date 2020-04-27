import React from 'react';
import {View, Dimensions, Text, Switch, Image, ScrollView} from 'react-native';
import {Button, Card} from 'react-native-elements';
import { colors } from '../common/theme';
import {offerUpdate} from "../actions/offer";
import { connect } from 'react-redux';
import  languageJSON  from '../common/language';
import stylesCommon from "../common/styles";
import Carousel , { Pagination }from 'react-native-snap-carousel';
import {HeaderComponent} from "../components";

var { height, width } = Dimensions.get('window');


const mapStateToProps = state => {
    return{
        data: state.offer,
        modal: state.modal
    }
}
const mapDispatchToProps = dispatch => ({
    updateOffer: (offer) => dispatch(offerUpdate(offer))
});

class TypeTruckScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0,
            carouselItems: [
                {
                    title:"Furgoneta",
                    text: "Carga max: 500kg",
                    image: require('../../assets/images/trucks/vc2.png')
                },
                {
                    title:"Camioneta",
                    text: "Carga max: 200kg",
                    image: require('../../assets/images/trucks/vc3.png')
                },
                {
                    title:"Camion",
                    text: "Carga max: 1000kg",
                    image: require('../../assets/images/trucks/vc4.png')
                },
                {
                    title:"Camion con trailer",
                    text: "Carga max: 2200kg",
                    image: require('../../assets/images/trucks/vc5.png')
                },
            ]
        }
    }
    _renderItem({item,index}){
        return (
            <View style={{
                backgroundColor: 'transparent',
                borderRadius: 20,
                height: 220,
                alignItems:'center'
            }}>
                <Image source={item.image} />
                <Text style={{fontSize: 20}}>{item.title}</Text>
                <Text style={{fontSize: 14}}>{item.text}</Text>
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
    //go to next step on offer
    continueOffer() {
        this.props.navigation.navigate('DataPackage');
    }
    //go to next step on offer
    comeBackOffer() {
        this.props.navigation.navigate('Map');
    }
    updateOffer(object){
        this.props.updateOffer(object);
    }
    render() {
        return (
            <View style={stylesCommon.columnSpaceBetween}>
{/*                <Image style= { stylesCommon.backgroundImage } source={{uri: 'https://i.pinimg.com/564x/bc/9c/33/bc9c3358ac98dd61229ac794596636eb.jpg'}}>
                </Image>*/}
                <ScrollView>
                    <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={'Datos transporte'} type={'white'}/>
                <View style={{marginVertical: 0}}>
                    <Carousel
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.state.carouselItems}
                        sliderWidth={width}
                        itemWidth={280}
                        renderItem={this._renderItem}
                        onSnapToItem = { index => {this.updateOffer({tipo_camion: index});this.setState({activeIndex:index})} } />
                    { this.pagination }
                </View>
                <View>
                    <Card containerStyle={stylesCommon.cardTransparent}>
                        <View style={stylesCommon.rowSpaceBetween}>
                            <Text>
                                {languageJSON.driver_help}
                            </Text>
                            <Switch
                                value={this.props.data.ayuda_chofer}
                                onValueChange = {(value => this.updateOffer({ayuda_chofer: value}))}
                            />
                        </View>
                        <View style={stylesCommon.rowSpaceBetween}>
                            <Text>
                                {languageJSON.aditional_help}
                            </Text>
                            <Switch
                                value={this.props.data.ayuda_adicional}
                                onValueChange = {(value => this.updateOffer({ayuda_adicional: value}))}
                            />
                        </View><View style={stylesCommon.rowSpaceBetween}>
                        <Text>
                            {languageJSON.rider_travel}
                        </Text>
                        <Switch
                            value={this.props.data.viajar_pasajero_vehiculo}
                            onValueChange = {(value => this.updateOffer({viajar_pasajero_vehiculo: value}))}
                        />
                    </View><View>
                        <Text>
                            {languageJSON.rider_help}
                        </Text>
                        <Switch
                            value={this.props.data.ayudaras_en_flete}
                            onValueChange = {(value => this.updateOffer({ayudaras_en_flete: value}))}
                        />
                    </View>
                        <View>
                            <Button
                                title={languageJSON.button_continue}
                                titleStyle={{ fontWeight: '500' }}
                                linearGradientProps={{
                                    colors: ['#245b84', '#3ea1c0'],
                                    start: [1, 0],
                                    end: [0.2, 0],
                                }}
                                buttonStyle={stylesCommon.buttonPositive}
                                onPress={() => {this.continueOffer()}}
                            />
                        </View>
                        <View>
                            <Button
                                title={languageJSON.button_come_back}
                                titleStyle={{ fontWeight: '500' }}
                                buttonStyle={stylesCommon.buttonNegative}
                                onPress={() => {this.comeBackOffer()}}
                            />
                        </View>
                    </Card>
                </View>
                </ScrollView>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeTruckScreen);

