import React from 'react';
import { Header } from 'react-native-elements';
import { colors } from '../common/theme';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
    Image,
    ActivityIndicator
} from 'react-native';
import  languageJSON  from '../common/language';
import { aboutLoad} from "../actions/about";
import {connect} from "react-redux";

var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        about: state.about
    }
}
const mapDispatchToProps = dispatch => ({
    loadAbout: () => dispatch(aboutLoad())
});

class AboutPage extends React.Component {
    constructor(props){
        super(props);
        this.props.loadAbout();
    }
    loadOrNot(){
        if(this.props.about.loaded){
            return(
                <ScrollView styles={{marginTop:10}}>
                    <View style={styles.aboutcontentmainStyle}>
                        <Image
                            style={{width: '100%', height: 150}}
                            source={{ uri:this.props.about.foto}}
                        />
                        <Text style={styles.aboutTitleStyle}>Nosotros</Text>
                        <Text style={styles.aboutcontentStyle}>{this.props.about.descripcion}</Text>
                        <Text style={styles.aboutTitleStyle}>Historial</Text>
                        <Text style={styles.aboutcontentStyle}>{this.props.about.historial}</Text>
                        <Text style={styles.aboutTitleStyle}>{languageJSON.contact_details}</Text>
                        <View style={styles.contact}>
                            <View style={{justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                                <Text style={styles.contacttype1}>{languageJSON.email_placeholder}: </Text>
                                <Text style={styles.contacttype1}>{this.props.about.email}</Text>
                            </View>
                            <View style={{justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                                <Text style={styles.contacttype2}>{languageJSON.phone}: </Text>
                                <Text style={styles.contacttype1}>{this.props.about.telefono}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )
        } else {
            return(
                <View style={{marginVertical: 30}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
    }
    render() {
        return (
            <View style={styles.mainView}>
                <Header
                    backgroundColor={'transparent'}
                    linearGradientProps={{
                        colors: ['#245b84', '#3ea1c0'],
                        start: [0, 1],
                        end: [1, 1],
                    }}
                    leftComponent={{icon:'md-menu', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                    centerComponent={<Text style={styles.headerTitleStyle}>{languageJSON.about_us_menu}</Text>}
                    containerStyle={styles.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                    rightComponent={{icon:'md-share', type:'ionicon', color:colors.WHITE}}
                />
                {this.loadOrNot()}
           </View>
        );
      }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);

const styles = StyleSheet.create({
    mainView:{ 
        flex:1, 
        backgroundColor: colors.WHITE, 
        //marginTop: StatusBar.currentHeight,
    } ,
    headerStyle: { 
        backgroundColor: colors.GREY.default, 
        borderBottomWidth: 0 
    },
    headerTitleStyle: { 
        color: colors.WHITE,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    aboutTitleStyle:{
        color: colors.BLACK,
        fontFamily:'Roboto-Bold',
        fontSize: 20,
        marginLeft:8,
        marginTop:8
    },
    aboutcontentmainStyle:{
        marginTop:12,
        marginBottom:60
    },
    aboutcontentStyle:{
        color: colors.GREY.secondary,
        fontFamily:'Roboto-Regular',
        fontSize: 15,
        textAlign: "justify",
        alignSelf:'center',
        width:width-20,
        letterSpacing:1,
        marginTop:6,
    },
    contact:{
        marginTop:6,
        marginLeft:8,
        //flexDirection:'row',
        width:"100%",
        marginBottom:30
    },
    contacttype1:{
        textAlign:'left',
        color: colors.GREY.secondary,
        fontFamily:'Roboto-Bold',
        fontSize: 15,
    },
    contacttype2:{
        textAlign:'left',
        marginTop:4,
        color: colors.GREY.secondary,
        fontFamily:'Roboto-Bold',
        fontSize: 15,
    }
})
