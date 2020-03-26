import React from 'react';
import { Text, View, Image,TouchableOpacity, Platform, StatusBar } from 'react-native';
import {Card, Icon, Rating} from 'react-native-elements'
import { colors } from '../common/theme';
import {
    ListItem,
} from 'react-native-elements';
//make a compontent
const SideMenuHeader = ({headerStyle,userPhoto,userName,userEmail}) =>{
    return (
        <Card containerStyle={styles.cardPerfil}>
            <ListItem
                title={userName?userName:""}
                titleStyle={{color: 'white'}}
                subtitle={userEmail?userEmail:""}
                subtitleStyle={{color: 'white', fontSize: 10}}
                containerStyle={{backgroundColor: 'transparent', margin: 0, padding: 0}}
                leftAvatar={{ source: {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg'} }}
                rightIcon={{ type: 'font-awesome', name: 'angle-right', color: 'white'}}
            />
        </Card>
    );

};

const styles = {
    viewStyle:{
        backgroundColor: 'transparent',
        justifyContent:'center',
        alignItems:'center',
        height:180,
        paddingTop:Platform.OS=='ios'?20:StatusBar.currentHeight,
        shadowColor:colors.BLACK,
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.2,
        elevation:2,
        position:'relative',
        flexDirection:'column'
    },
    textStyle:{
        fontSize:20,
        color:colors.WHITE
    },
    headerTextStyle:{
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 10
    },
    cardPerfil: {
        borderWidth: 1, // Remove Border
        borderColor: 'white',
        backgroundColor: 'transparent',
        borderRadius: 20,
        marginTop: 30,
        elevation: 0 // This is for Android
    },
    userImageView: {
        width: 84,
        height: 84,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    ProfileNameStyle:{
        fontWeight: 'bold',
        color: colors.WHITE,
        fontSize: 15
    },
    iconViewStyle:{
        width:150,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    emailStyle:{
        color: colors.WHITE,
        fontSize: 13,
        marginLeft: 4,
        textAlign:'center'
    },
    imageStyle:{
        width: 80,
        height:80
    }
}
//make the component available to other parts of the app
export default SideMenuHeader;

