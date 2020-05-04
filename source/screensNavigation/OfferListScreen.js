import React from 'react';
import {View, Dimensions, Text, Button} from 'react-native';
import { Avatar, Rating} from "react-native-elements";
import { connect } from 'react-redux';
import  languageJSON  from '../common/language';
import { colors } from '../common/theme';
import stylesCommon from '../common/styles';
import {HeaderComponent} from "../components";
import {offersLoad} from "../actions/offer";
import {DetailOfferModal} from "../modals";

var { height, width } = Dimensions.get('window');

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
        name_rider: 'Chris',
        last_name_rider: 'Jackson',
        price: '3000',
        distance: '4',
        review_rider: 5,
        address_from: 'Santiago ventisqueros 500',
        address_to: 'moneda 973 santiago',
    },
    {
        name_rider: 'Chris',
        last_name_rider: 'Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
        address_from: 'Santiago',
        address_to: 'Valparaiso',
        price: '3000',
        distance: '4',
        review_rider: 5
    },
]

const mapStateToProps = state => {
    return{
        auth: state.auth,
        offer: state.offer
    }
}
const mapDispatchToProps = dispatch => ({
    offersLoadProps: (id_driver) => dispatch(offersLoad(id_driver))
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
        this.props.offersLoadProps(this.props.auth.id_driver)
    }
    componentDidUpdate(prevProps, prevState, snapshot){
    }
    listOffers(){
        if(this.props.offer.offers.length > 0){
            return (
                <View>
                    {
                        this.props.offer.offers.map((item, i) => (
                            <View
                                key={i}
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
                                <View>
                                    <Button title={'l'} onPress={() => {this.setState({showModalDetail: true, item: item})}}/>
                                </View>
                            </View>
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
                <DetailOfferModal modalVisible={this.state.showModalDetail} item={this.state.item} close={() => this.setState({showModalDetail: false, item: null})}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferListScreen);
