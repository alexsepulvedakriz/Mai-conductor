import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Avatar, Rating} from "react-native-elements";
import { connect } from 'react-redux';
import  languageJSON  from '../common/language';
import { colors } from '../common/theme';
import stylesCommon from '../common/styles';
import { HeaderSwitchComponent} from "../components";
import {offerCleanStore, offersLoad, offersLoadStop} from "../actions/offer";
import {offerDriverAdd} from "../actions/offer_driver";
import {profileLoad} from "../actions/profile";
import {DetailOfferModal} from "../modals";
import {LoadOverlay, PossibleTripOverlay, MinutesToArriveOverlay} from "../overlays";
import {tripCurrencyLoad} from "../actions/trip";
import {simpleTimer30} from "../functions/others";

const mapStateToProps = state => {
    return{
        auth: state.auth,
        offer: state.offer,
        profile: state.profile,
        offer_driver: state.offer_driver,
        trip: state.trip
    }
}
const mapDispatchToProps = dispatch => ({
    offersLoadProps: (id_driver) => dispatch(offersLoad(id_driver)),
    offerDriverAddProps: (offer_driver) => dispatch(offerDriverAdd(offer_driver)),
    profileLoadProps: (id_driver) => dispatch(profileLoad(id_driver)),
    tripCurrencyLoadProps: (id_driver) => dispatch(tripCurrencyLoad(id_driver)),
    offersLoadStopProps: () => dispatch(offersLoadStop()),
    offerCleanStoreProps: () => dispatch(offerCleanStore())
});

class OfferListScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModalDetail: false,
            showOverlayOfferDriver: false,
            showOverlayMinutes: false,
            item: null,
            id_rider: '',
            time_to_arrive: '',
            price: '',
        }
    }
    componentWillMount() {
        this.props.profileLoadProps(this.props.auth.id_driver);
        this.props.tripCurrencyLoadProps(this.props.auth.id_driver);
        this.activeLoadOffers();
    }
    stopLoadOffers(){
        this.props.offersLoadStopProps();
    }
    activeLoadOffers(){
        this.props.offersLoadProps(this.props.auth.id_driver);
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.trip.currencyTrip){
            if(this.props.trip.currencyTrip.active && !this.props.trip.currencyTrip.cancel){
                this.props.navigation.navigate('Trip');
            }
        }
    }
    listOffers(){
        if(this.props.offer.offers.length > 0){
            return (
                <View>
                    {
                        this.props.offer.offers.map((item, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => {this.setState({showModalDetail: true, item: item})}}
                                style={[ { flexDirection: 'row', width: '100%',borderBottomWidth: 1, borderColor: colors.GREY.Deep_Nobel,}]}
                            >
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
                            </TouchableOpacity>
                        ))
                    }
                </View>
            )
        } else {
            return(
                <View style={{marginVertical: 30}}>
                    <Text> {languageJSON.wait_for_offers}</Text>
                </View>
            )
        }

    }
    modalWaitOfferDriver(){
        const offer_driver = {
            id_rider: this.state.id_rider,
            id_driver: this.props.profile.profile.id_driver,
            last_name_driver: this.props.profile.profile.last_name,
            name_driver: this.props.profile.profile.name,
            ref_photo_driver: this.props.profile.profile.ref_photo,
            review_driver: this.props.profile.profile.review,
            longitude_driver: 0,
            latitude_driver: 0,
            price: this.state.price,
            time_to_arrive: this.state.time_to_arrive,
            accept: false,
        };
        this.props.offerDriverAddProps(offer_driver);
        this.setState({
            showModalDetail: false,
            showOverlayOfferDriver: true,
            showOverlayMinutes: false,
            id_rider: '',
            time_to_arrive: '',
            price: ''});
        simpleTimer30().then( a => {this.setState({showOverlayOfferDriver: false, item: null})});
    }
    render() {
        return (
            <View>
                <HeaderSwitchComponent
                    navigation = {() => {this.props.navigation.toggleDrawer();}} type={'color'}
                    stop={() => {this.stopLoadOffers(); this.props.offerCleanStoreProps()}}
                    active={() => {this.activeLoadOffers()}}
                />
                {this.listOffers()}
                <DetailOfferModal
                    modalVisible={this.state.showModalDetail}
                    offerDriver={(offer) => {this.setState({showOverlayMinutes: true, showModalDetail: false, id_rider: offer.id_rider, price: offer.price})}}
                    item={this.state.item}
                    close={() => {this.setState({showModalDetail: false})}}
                />
                <MinutesToArriveOverlay
                    Visible={this.state.showOverlayMinutes}
                    offerDriver={(time_to_arrive) => {this.setState({time_to_arrive: time_to_arrive}); this.modalWaitOfferDriver()}}
                    close={() => {this.setState({showOverlayMinutes: false})}}
                />
                <PossibleTripOverlay Visible={this.state.showOverlayOfferDriver} item={this.state.item}/>
                <LoadOverlay Visible={this.props.offer_driver.adding} message={languageJSON.adding_offer_driver}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferListScreen);
