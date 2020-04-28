import { createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
    ProfileScreen,
    RideListPage,
    RegistrationPage,
    LoginScreen,
    AboutPage,
    TripScreen,
    FinishTripScreen,
    OfferListScreen,
    PaymentInformationScreen
} from '../screens';
import SideMenu from '../components/SideMenu';

//app stack for user end
    export const AppStack = {
        RideList:{
            screen: RideListPage,
            navigationOptions:{
            header:null,
            }
            
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions:{
                header: null
            }
        },
        About: {
            screen: AboutPage,
            navigationOptions:{
                header: null
            }
        },
        Trip:{
            screen: TripScreen,
            navigationOptions:{
                header: null
            }
        },
        FinishTrip:{
            screen: FinishTripScreen,
            navigationOptions:{
                header: null
            }
        },
        OfferList:{
            screen: OfferListScreen,
            navigationOptions:{
                header: null
            }
        },
        PaymentInformation:{
            screen: PaymentInformationScreen,
            navigationOptions:{
                header: null
            }
        }
    }

    //authentication stack for user before login
    export const AuthStack = createStackNavigator({
        Reg: {
            screen: RegistrationPage,
            navigationOptions:{
            header:null,
            }
        },
        Login: {
            screen: LoginScreen,
            navigationOptions:{
                header:null,
            }
        }
           
    },{
        initialRouteName: 'Login',
    });

    //drawer routes, you can add routes here for drawer or sidemenu
    const DrawerRoutes = {
        'RideList': {
            name: 'RideList',
            screen: createStackNavigator(AppStack, { initialRouteName: 'RideList',headerMode: 'none' })
        },
        'Profile': {
            name: 'Profile',
            screen: createStackNavigator(AppStack, { initialRouteName: 'Profile', headerMode: 'none' })
        },
        'PaymentInformation': {
            name: 'PaymentInformation',
            screen: createStackNavigator(AppStack, { initialRouteName: 'PaymentInformation', headerMode: 'none' })
        },
        'OfferList': {
            name: 'OfferList',
            screen: createStackNavigator(AppStack, { initialRouteName: 'OfferList', headerMode: 'none' })
        },
        'FinishTrip': {
            name: 'FinishTrip',
            screen: createStackNavigator(AppStack, { initialRouteName: 'FinishTrip', headerMode: 'none' })
        },
        'About': {
            name: 'About',
            screen: createStackNavigator(AppStack, { initialRouteName: 'About', headerMode: 'none' })
        }
    };

    //main navigator for user end
    export const RootNavigator = createDrawerNavigator(
        DrawerRoutes,
        {
        drawerWidth: 300,
        initialRouteName:'RideList',
        contentComponent: SideMenu,
      });



