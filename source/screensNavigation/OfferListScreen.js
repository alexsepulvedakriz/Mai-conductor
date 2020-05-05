import React from 'react';
import {View, Dimensions, Text, Button, TouchableOpacity} from 'react-native';
import { Avatar, Rating} from "react-native-elements";
import { connect } from 'react-redux';
import  languageJSON  from '../common/language';
import { colors } from '../common/theme';
import stylesCommon from '../common/styles';
import {HeaderComponent} from "../components";
import {offersLoad} from "../actions/offer";
import {offerDriverAdd} from "../actions/offer_driver";
import {profileLoad} from "../actions/profile";
import {DetailOfferModal} from "../modals";
import {LoadOverlay} from "../overlays";

var { height, width } = Dimensions.get('window');


const mapStateToProps = state => {
    return{
        auth: state.auth,
        offer: state.offer,
        profile: state.profile,
        offer_driver: state.offer_driver
    }
}
const mapDispatchToProps = dispatch => ({
    offersLoadProps: (id_driver) => dispatch(offersLoad(id_driver)),
    offerDriverAddProps: (offer_driver) => dispatch(offerDriverAdd(offer_driver)),
    profileLoadProps: (id_driver) => dispatch(profileLoad(id_driver))
});

class OfferListScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModalDetail: false,
            item: null
        }
    }
    componentWillMount() {
        this.props.profileLoadProps(this.props.auth.id_driver);
        this.props.offersLoadProps(this.props.auth.id_driver);
    }
    componentDidUpdate(prevProps, prevState, snapshot){
    }
    addNewOfferDriver(offer){
        const offer_driver = {
            id_rider: offer.id_rider,
            id_driver: this.props.profile.profile.id_driver,
            last_name_driver: this.props.profile.profile.last_name,
            name_driver: this.props.profile.profile.name,
            ref_photo_driver: this.props.profile.profile.ref_photo,
            review_driver: this.props.profile.profile.review,
            longitude_driver: 0,
            latitude_driver: 0,
            price: offer.price,
            time_to_arrive: offer.time_to_arrive,
            accept: false,
        };
        this.props.offerDriverAddProps(offer_driver);
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

        }

    }
    render() {
        return (
            <View>
                <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={languageJSON.offer_list_header} type={'color'}/>
                {this.listOffers()}
                <DetailOfferModal
                    modalVisible={this.state.showModalDetail}
                    offerDriver={(offer) => {this.addNewOfferDriver(offer); this.setState({showModalDetail: false, item: null})}}
                    item={this.state.item}
                    close={() => this.setState({showModalDetail: false, item: null})}
                />
                <LoadOverlay Visible={this.props.offer_driver.adding} message={languageJSON.adding_offer_driver}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferListScreen);
