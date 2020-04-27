import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet, Dimensions, Linking, Alert, Share} from 'react-native';
import  languageJSON  from '../common/language';
import {Button} from "react-native-elements";

let facebookParameters = ""
let TwitterParameters = ""

// Whatsapp Brand Resources forcing to use ios icon for only ios so we heft to use different logos for be legal.
const WhatsappShareIcon = () => {
    if(Platform.OS == 'ios')
    {
        return(
            <Image style={{width:50, height:50, alignSelf:'center', marginBottom: 5}} source={require('../../assets/images/social_network/whatsapp-ios.png')}></Image>
        );
    }else if(Platform.OS == 'android')
    {
        return(
            <Image style={{width:50, height:50, alignSelf:'center', marginBottom: 5}} source={require('../../assets/images/social_network/whatsapp-android.png')}></Image>
        );
    }
}

export default class BoxedShare extends Component{
    componentDidMount(){

        // Check which props given and create url query
        if(this.props.FacebookShareURL != undefined)
        {
            if(facebookParameters.includes("?") == false)
            {
                facebookParameters = facebookParameters+"?u="+encodeURI(this.props.FacebookShareURL);
            }else{
                facebookParameters = facebookParameters+"&u="+encodeURI(this.props.FacebookShareURL);
            }
        }
        if(this.props.FacebookShareMessage != undefined)
        {
            if(facebookParameters.includes("?") == false)
            {
                facebookParameters = facebookParameters+"?quote="+encodeURI(this.props.FacebookShareMessage);
            }else{
                facebookParameters = facebookParameters+"&quote="+encodeURI(this.props.FacebookShareMessage);
            }
        }
        if(this.props.TwitterShareURL != undefined)
        {
            if(TwitterParameters.includes("?") == false)
            {
                TwitterParameters = TwitterParameters+"?url="+encodeURI(this.props.TwitterShareURL);
            }else{
                TwitterParameters = TwitterParameters+"&url="+encodeURI(this.props.TwitterShareURL);
            }
        }
        if(this.props.TwitterShareMessage != undefined)
        {
            if(TwitterParameters.includes("?") == false)
            {
                TwitterParameters = TwitterParameters+"?text="+encodeURI(this.props.TwitterShareMessage);
            }else{
                TwitterParameters = TwitterParameters+"&text="+encodeURI(this.props.TwitterShareMessage);
            }
        }
        if(this.props.TwitterViaAccount != undefined)
        {
            if(TwitterParameters.includes("?") == false)
            {
                TwitterParameters = TwitterParameters+"?via="+encodeURI(this.props.TwitterViaAccount);
            }else{
                TwitterParameters = TwitterParameters+"&via="+encodeURI(this.props.TwitterViaAccount);
            }
        }
    }
    render(){
        return(
            <View style={styles.ShareArea}>
                <View style={styles.ShareTitleArea}>
                    <Text style={styles.ShareTitle}>{languageJSON.share}</Text>
                </View>
                <View style={styles.ShareItems}>
                    <TouchableOpacity onPress={() => {
                        let url = 'whatsapp://send?text='+this.props.WhatsappMessage;
                        Linking.openURL(url).then((data) => {
                            console.log('open whatsapp');
                        }).catch(() => {
                            Alert.alert('Error',
                                'Make sure Whatsapp installed on your device',
                                {cancelable: true})
                        });
                    }}>
                        {WhatsappShareIcon()}
                        <Text>WhatsApp</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ShareItems}>
                    <TouchableOpacity onPress={() => {
                        let url = 'https://www.facebook.com/sharer/sharer.php'+facebookParameters;
                        Linking.openURL(url).then((data) => {
                            console.log('open facebook')
                        }).catch(() => {
                            Alert.alert('Error',
                                'An error occurred while share',
                                {cancelable: true})
                        });
                    }}>
                        <Image source={require('../../assets/images/social_network/facebook.png')} style={{width:50, height:50, alignSelf:'center', marginBottom: 5}}></Image>
                        <Text>Facebook</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ShareItems}>
                    <TouchableOpacity onPress={() => {
                        console.log(this.props.TwitterShareURL)
                        let url = 'https://twitter.com/intent/tweet'+TwitterParameters;
                        Linking.openURL(url).then((data) => {
                            console.log('open twitter')
                        }).catch(() => {
                            Alert.alert('Error',
                                'An error occurred while share',
                                {cancelable: true})
                        });
                    }}>
                        <Image source={require('../../assets/images/social_network/twitter.png')} style={{width:50, height:50, alignSelf:'center', marginBottom: 5}}></Image>
                        <Text>Twitter</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ShareItems}>
                    <TouchableOpacity onPress={() => {
                        Share.share({
                            message: this.props.NativeShareMessage != undefined?this.props.NativeShareMessage:null,
                            url: this.props.NativeShareURL != undefined?this.props.NativeShareURL:null, //only for ios
                            title: this.props.NativeShareTitle != undefined?this.props.NativeShareTitle:null
                        });
                    }}>
                        <Image source={require('../../assets/images/social_network/more.png')} style={{width:50, height:50, alignSelf:'center', marginBottom: 5}}></Image>
                        <Text style={{textAlign: 'center', fontSize: 13}}>More</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ShareTitleArea}>
                    <Button
                        title="Cancelar"
                        titleStyle={{ fontWeight: '500' }}
                        onPress={() => {this.props.cancel()}}
                        buttonStyle={{
                            backgroundColor: '#f7ab00',
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            marginBottom: 40
                        }}
                    />
                </View>
            </View>
        );
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    ShareArea: {
        backgroundColor: 'white',
        width: screenWidth-20,
        alignSelf: 'center',
        marginTop: 7,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ShareTitleArea: {
        height: 40,
        borderRadius: 20,
        width: screenWidth-20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ShareTitle:{
        fontSize: 20
    },
    ShareItems:{
        width: 70,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 7,
        marginRight: 7
    }
});
