import { createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
    ProfileScreen,
    RideListPage,
    AboutPage,
    TripScreen,
    FinishTripScreen,
    OfferListScreen,
    PaymentInformationScreen,
    VehiclesScreen
} from '../screensNavigation';
import {
    LoginScreen,
    RegisterDriverScreen,
    RegisterUserScreen,
    RegisterVehicleScreen
} from '../screensAuth';
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
        },
        Vehicles:{
            screen: VehiclesScreen,
            navigationOptions:{
                header: null
            }
        }
    }

    //authentication stack for user before login
    export const AuthStack = createStackNavigator({
        Login: {
            screen: LoginScreen,
            navigationOptions:{
                header:null,
            }
        },
        RegisterUser: {
            screen: RegisterUserScreen,
            navigationOptions:{
                header:null,
            }
        },
        RegisterDriver: {
            screen: RegisterDriverScreen,
            navigationOptions:{
                header:null,
            }
        },
        RegisterVehicle: {
            screen: RegisterVehicleScreen,
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
        },
        'Vehicles': {
            name: 'Vehicles',
            screen: createStackNavigator(AppStack, { initialRouteName: 'Vehicles', headerMode: 'none' })
        },
        'Trip': {
            name: 'Trip',
            screen: createStackNavigator(AppStack, { initialRouteName: 'Trip', headerMode: 'none' })
        }
    };

    //main navigator for user end
    export const RootNavigator = createDrawerNavigator(
        DrawerRoutes,
        {
        drawerWidth: 300,
        initialRouteName:'Trip',
        contentComponent: SideMenu,
      });



