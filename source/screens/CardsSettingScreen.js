import React from 'react';
import {ActivityIndicator, Dimensions, Image, Text, View} from "react-native";
import { connect } from 'react-redux';
import stylesCommon from "../common/styles";
import {AddCardModal, HeaderComponent, WarningOverlay, LoadOverlay} from "../components";
import {Button} from "react-native-elements";
import languageJSON from "../common/language";
import {CardAdd, CardDelete, CardLoad} from "../actions/card";
import {colors} from "../common/theme";


var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        cards: state.card,
        profile: state.profile,
    }
};
const mapDispatchToProps = dispatch => ({
    AddCard: (card) => dispatch(CardAdd(card)),
    DeleteCard: (id_card) => dispatch(CardDelete(id_card)),
    loadCards: (id_pasajero) => dispatch(CardLoad(id_pasajero))
});

class CardsSettingScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addCardModal: false,
            deleteCardModal: false,
            id_card_delete: '',
        }
    }
    componentDidMount() {
        this.props.loadCards(this.props.profile.id_pasajero);
    }
    cardAdd(card_number, expiration_date,cvv, name, lastName){
        this.props.AddCard({card_number: card_number,expiration_date: expiration_date,cvv: cvv, name: name, lastName: lastName, id_pasajero: this.props.profile.id_pasajero});
        this.setState({addCardModal: false})
    }
    cardDelete(){
        this.props.DeleteCard({id_pasajero: this.props.profile.id_pasajero, id_card: this.state.id_card_delete});
        this.setState({id_card_delete: '', deleteCardModal: false});
    }
    loadOrWait(){
        if(this.props.cards.loading){
            return(
                <View style={{marginVertical: 90}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        if(this.props.cards.cards.length === 0 ){
            return (
                <View>
                    <Image source={require('../../assets/images/background/cards.png')} tyle={{width: 300, height: 300}}/>
                    <Text style={{fontSize: 20, marginHorizontal: 20, marginTop: 10, textAlign: 'center'}}>{languageJSON.no_cards_title}</Text>
                    <Text style={{fontSize: 14, marginHorizontal: 20, marginTop: 10, textAlign: 'center'}}>{languageJSON.no_cards_message}</Text>
                </View>
            )
        }
        if(this.props.cards.cards.length > 0 ){
            return (
                <View>
                    <View style={stylesCommon.bottomDistance}>
                        {this.props.cards.cards.map((item, i) => (
                            <View key={i}>
                                <View style={ {marginHorizontal: 20, marginVertical: 10, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: colors.GREY.Deep_Nobel}}>
                                    <View style={[stylesCommon.rowSpaceBetween ]}>
                                        <View>
                                            <Text style={{fontSize:15 , color: colors.BLACK}}>{languageJSON.card_number}: {item.card_number}</Text>
                                            <Text style={{fontSize:13, color: colors.BLACK}}>{languageJSON.holder}: {item.name} {item.lastName}</Text>
                                        </View>
                                        <View>
                                            <Button
                                                icon={{
                                                    name: 'trash',
                                                    type: 'font-awesome',
                                                    size: 15,
                                                    color: 'white',
                                                }}
                                                buttonStyle={{
                                                    backgroundColor: '#f7ab00',
                                                    borderColor: 'transparent',
                                                    borderWidth: 0,
                                                    borderRadius: 10,
                                                }}
                                                onPress={() => {this.setState({id_card_delete: item.id_card, deleteCardModal: true})}}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Button
                            title={languageJSON.add_card}
                            titleStyle={{ fontWeight: '500' }}
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            buttonStyle={stylesCommon.buttonPositive}
                            onPress={() => {this.setState({addCardModal: true})}}
                        />
                    </View>
                </View>

            )
        }
    }

    render() {
        return (
            <View>
                <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={'Mis tarjetas'} type={'color'}/>
                {this.loadOrWait()}
                <AddCardModal
                    Visible={this.state.addCardModal}
                    addCard={(card_number, expiration_date,cvv, name, lastName)=> {this.cardAdd(card_number, expiration_date,cvv, name, lastName)}}
                    close={() => {this.setState({addCardModal: false})}}
                />
                <WarningOverlay
                    Visible={this.state.deleteCardModal}
                    message={languageJSON.delete_card_alert}
                    close={() => this.setState({deleteCardModal: false})}
                    accept={() => {this.cardDelete()}}
                />
                <LoadOverlay Visible={this.props.cards.adding} message={'Agregando la tarjeta'}/>
                <LoadOverlay Visible={this.props.cards.deleting} message={'Eliminando la tarjeta'}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsSettingScreen);

