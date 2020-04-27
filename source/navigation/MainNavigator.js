import { createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {
    ProfileScreen,
    RideListPage,
    MapScreen,
    RegistrationPage,
    LoginScreen,
    AboutPage,
    TypeTruckScreen,
    AcceptTripScreen,
    DataPackageScreen,
    PaymentScreen,
    TripScreen,
    CardsSettingScreen
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
        Map: {
            screen: MapScreen,
            navigationOptions:{
                header: null
            }
        },
        AcceptTrip:{
            screen: AcceptTripScreen,
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
        DataPackage:{
            screen: DataPackageScreen,
            navigationOptions:{
                header: null
            }
        },
        TypeTruck:{
            screen: TypeTruckScreen,
            navigationOptions:{
                header: null
            }
        },
        Payment:{
            screen: PaymentScreen,
            navigationOptions:{
                header: null
            }
        },
        CardsSettings:{
            screen: CardsSettingScreen,
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
        'Map': {
            name: 'Map',
            screen: createStackNavigator(AppStack, {
                initialRouteName: 'Map', 
                navigationOptions:{
                    header: null
                } 
            })
        },
        'RideList': {
            name: 'RideList',
            screen: createStackNavigator(AppStack, { initialRouteName: 'RideList',headerMode: 'none' })
        },
        'Profile': {
            name: 'Profile',
            screen: createStackNavigator(AppStack, { initialRouteName: 'Profile', headerMode: 'none' })
        },
        'About': {
            name: 'About',
            screen: createStackNavigator(AppStack, { initialRouteName: 'About', headerMode: 'none' })
        },
        'Payment': {
            name: 'Payment',
            screen: createStackNavigator(AppStack, { initialRouteName: 'Payment', headerMode: 'none' })
        },
        'CardsSettings': {
            name: 'CardsSettings',
            screen: createStackNavigator(AppStack, { initialRouteName: 'CardsSettings', headerMode: 'none' })
        },
    };

    //main navigator for user end
    export const RootNavigator = createDrawerNavigator(
        DrawerRoutes,
        {
        drawerWidth: 300,
        initialRouteName:'Map',
        contentComponent: SideMenu,
      });



