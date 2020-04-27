import React from 'react';
import {View, Dimensions, StyleSheet, FlatList} from 'react-native';
import { ListItem} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import SideMenuHeader from './SideMenuHeader';
import { colors } from '../common/theme';
import  languageJSON  from '../common/language';
import { LinearGradient } from 'expo-linear-gradient';
import {userSignOut} from "../actions/auth";
import {connect} from "react-redux";

const { width,height } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        data: state.profile,
    }
}
const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(userSignOut())
});

class SideMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            heightIphoneSix : false,
            sideMenuList: [
                {key: 1, name: languageJSON.book_your_ride_menu, navigationName: 'Map', icon: 'home', type: 'font-awesome', child: 'firstChild'},
                {key: 2, name: languageJSON.profile_setting_menu, navigationName: 'Profile', icon: 'ios-person-add', type: 'ionicon', child: 'secondChild'},
                {key: 3, name: languageJSON.my_rides_menu, navigationName: 'RideList', icon: 'car-sports', type: 'material-community', child: 'fourthChild'},
                {key: 4, name: languageJSON.about_us_menu,  navigationName: 'About', icon: 'info', type: 'entypo', child: 'fifthChild'},
                {key: 5, name: languageJSON.cardsSettings,  navigationName: 'CardsSettings', icon: 'money', type: 'font-awesome', child: 'fifthChild'},
                {key: 6, name: languageJSON.logout, icon: 'sign-out', type: 'font-awesome', child: 'lastChild'}
            ],
            profile_image:null,
        }

    }

    componentDidMount(){
        this.heightReponsive();
        var curuser = firebase.auth().currentUser.uid;
        const userRoot=firebase.database().ref('users/'+curuser);
        userRoot.on('value',userData=>{
            if(userData.val()){
                this.setState(userData.val());
            }
        })
        this.tripSatusCheck()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
    }

    //check for device height(specially iPhone 6)
    heightReponsive(){
        if(height <= 667){
            this.setState({heightIphoneSix :true})
        }
    }

    //navigation to screens from side menu
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    //sign out and clear all async storage
    async signOut() {
        this.props.signOut();
    }

    //CHECKING TRIP END OR START
    tripSatusCheck(){
        var curuser = firebase.auth().currentUser;
        this.setState({currentUser:curuser},()=>{
            const userData=firebase.database().ref('users/'+this.state.currentUser.uid);
            userData.on('value',userData=>{
                if(userData.val()){
                    var data = userData.val()
                    if(data['my-booking']){
                        let bookingData = userData.val()['my-booking']
                        for(key in bookingData){

                            bookingData[key].bookingKey = key
                            if(bookingData[key].payment_status){
                                if(bookingData[key].payment_status == "WAITING" && bookingData[key].status == 'END' && bookingData[key].skip != true){
                                    console.log(bookingData[key].skip)
                                    bookingData[key].firstname = userData.val().firstName;
                                    bookingData[key].lastname = userData.val().lastName;
                                    bookingData[key].email =userData.val().email;
                                    bookingData[key].phonenumber =userData.val().mobile;
                                    this.props.navigation.navigate('CardDetails',{data:bookingData[key]});
                                }
                                else if( bookingData[key].rating_queue == true && bookingData[key].payment_mode == 'Card'){
                                    this.props.navigation.navigate('ratingPage',{data:bookingData[key]});
                                }
                            }

                        }
                    }
                }
            })
        })
    }




    render(){
        return(
            <LinearGradient style={ styles.imgBackground }
                            colors={ ['#245b84', '#3ea1c0']}
            >
                <View style={ styles.containerList}>
                    <SideMenuHeader userPhoto={this.props.data.id_photo} userEmail={this.props.data.email} userName ={this.props.data.nombre + ' '+ this.props.data.apellido} ></SideMenuHeader>
                    <FlatList
                        data={this.state.sideMenuList}
                        keyExtractor={(item,index) => index.toString()}
                        style={{ marginTop: 20}}
                        bounces = {false}
                        renderItem={({item, index}) =>
                            <ListItem
                                onPress={
                                    (item.name==languageJSON.logout)? ()=>this.signOut() :
                                        this.navigateToScreen(item.navigationName)
                                }
                                title={item.name}
                                titleStyle={{color: 'white'}}
                                containerStyle={{backgroundColor: 'transparent', margin: 10, padding: 0, paddingBottom: 5}}
                                leftIcon={{ type: item.type, name: item.icon, color: 'white'}}
                                rightIcon={{ type: 'font-awesome', name: 'angle-right', color: 'white'}}
                                bottomDivider
                            />
                        } />
                </View>
            </LinearGradient>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);

const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    containerList: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '95%',
        margin: 10
    },
    menuItemView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 18,
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginTop: 10,
        marginRight: 10
    },
    viewIcon: {
        width: 24,
        height: 24,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        left: 1
    },
    menuName: {
        color: colors.WHITE,
        fontWeight: 'bold',
        marginLeft: 8,
        width:"100%"
    },
    mainViewStyle:{
        height: '100%'
    },
    compViewStyle:{
        position: 'relative',
        flex: 3
    },
    iconStyle:{
        justifyContent: 'center',
        alignItems: 'center'
    }
});
