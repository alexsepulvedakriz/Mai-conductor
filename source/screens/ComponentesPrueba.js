import React from 'react';
import { Header, Button, Card, Icon, ListItem, Rating, SearchBar, CheckBox} from 'react-native-elements';
import { ImageBackground} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../common/theme';
import {StyleSheet, View, Text, Switch, ScrollView, TouchableWithoutFeedback, Dimensions, Image, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        data: state.data,
    }
}
const mapDispatchToProps = dispatch => ({
});

class  ComponentesPrueba extends React.Component {
    constructor(props){
        super(props);
        this.state= {switchValue:false}
    }

    prueba(){
    }
    toggleSwitch = (value) => {
        //onValueChange of the switch this function will be called
        console.log(value);
        this.setState({switchValue: value})
        //state changes according to switch
        //which will result in re-render the text
    }
    render() {
        const { data } = this.props;
        console.log('data');
        if (data) {
            console.log(data);
        }
        return (

            <View style={styles.mainView}>
                <Image style= { styles.backgroundImage } source={{uri: 'https://cdn5.f-cdn.com/contestentries/1465388/27319887/5c437042565d6_thumb900.jpg'}}>
                </Image>
                <ScrollView>
                    <Header
                        backgroundColor={'transparent'}
/*                        linearGradientProps={{
                            colors: ['#245b84', '#3ea1c0'],
                            start: [0, 1],
                            end: [1, 1],
                        }}*/
                        leftComponent={{icon:'md-menu', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                        centerComponent={<Text style={styles.headerTitleStyle}>{'Componentes'}</Text>}
                        containerStyle={styles.headerStyle}
                        innerContainerStyles={{marginLeft:10, marginRight: 10}}
                        rightComponent={{icon:'md-menu', type:'ionicon', color:colors.WHITE}}
                    />
{/*                <LinearGradient
                    colors={ ['#245b84', '#3ea1c0']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                >*/}
                    <View>
                        <Card containerStyle={styles.cardCnt}
                              title='HELLO WORLD'>
                            <Text style={{marginBottom: 10}}>
                                The idea with React Native Elements is more about component structure than actual design.
                            </Text>
                            <SearchBar
                                placeholder="Monto a ofrecer"
                                platform="ios"
                                containerStyle={{backgroundColor: 'white'}}
                            />

                            <View style={styles.buttonsContainer}>
                                <CheckBox
                                    center
                                    checkedColor={'red'}
                                    title='Efectivo'
                                    checkedColor={'#f7ab00'}
                                    uncheckedColor={'#f7ab00'}
                                    checkedIcon='circle'
                                    uncheckedIcon='circle-o'
                                    checked={false}
                                    iconRight
                                    containerStyle={{backgroundColor: 'white', borderWidth: 0 , paddingHorizontal: 0}}
                                />
                                <CheckBox
                                    center
                                    title='Webpay'
                                    checkedColor={'#f7ab00'}
                                    uncheckedColor={'#f7ab00'}
                                    checkedIcon='circle'
                                    uncheckedIcon='circle-o'
                                    checked={true}
                                    iconRight
                                    containerStyle={{backgroundColor: 'white', borderWidth: 0, paddingHorizontal: 0}}
                                />
                                <CheckBox
                                    center
                                    title='Transferencia'
                                    checkedColor={'#f7ab00'}
                                    uncheckedColor={'#f7ab00'}
                                    checkedIcon='circle'
                                    uncheckedIcon='circle-o'
                                    checked={true}
                                    iconRight
                                    containerStyle={{backgroundColor: 'white', borderWidth: 0, paddingHorizontal: 0}}
                                />
                            </View>
                            <Switch
                                style={{marginTop:30}}
                                onValueChange = {this.toggleSwitch}
                                value = {this.state.switchValue}/>
                            <View style={styles.buttonsContainer}>
                                <Button
                                    icon={{
                                        name: 'calendar',
                                        type: 'font-awesome',
                                        size: 15,
                                        color: 'white',
                                    }}
                                    linearGradientProps={{
                                        colors: ['#245b84', '#3ea1c0'],
                                        start: [1, 0],
                                        end: [0.2, 0],
                                    }}
                                    title='Agendar222'
                                    buttonStyle={{
                                        borderWidth: 0,
                                        borderRadius: 10,
                                    }}
                                    onPress={() => {this.prueba()}}
                                />
                                <Button
                                    title="Request an agent"
                                    titleStyle={{ fontWeight: '500' }}
                                    buttonStyle={{
                                        backgroundColor: '#f7ab00',
                                        borderColor: 'transparent',
                                        borderWidth: 0,
                                        borderRadius: 10,
                                    }}
                                />
                            </View>
                        </Card>
                    </View>
{/*                </LinearGradient>*/}
                <View>
                    <Card containerStyle={styles.cardCnt2}
                          title='HELLO WORLD'>
                        <Text style={{marginBottom: 10}}>
                            The idea with React Native Elements is more about component structure than actual design.
                        </Text>
                        <View style={styles.buttonsContainer}>
                            <Icon
                                reverse
                                name='clock-o'
                                size={25}
                                type='font-awesome'
                                color='#317da1' />
                            <Text style={{ fontSize: 50, color: '#317da1'}}>
                                00:25:30
                            </Text>
                        </View>
                        <View style={styles.buttonsContainer}>
                            <Button
                                title="- $200"
                                titleStyle={{ fontWeight: '500' }}
                                buttonStyle={{
                                    backgroundColor: '#d8d8d8',
                                    borderColor: 'transparent',
                                    borderWidth: 0,
                                    borderRadius: 10,
                                    paddingHorizontal:20
                                }}
                            />
                            <Button
                                linearGradientProps={{
                                    colors: ['#245b84', '#3ea1c0'],
                                    start: [1, 0],
                                    end: [0.2, 0],
                                }}
                                title='$2.300'
                                buttonStyle={{
                                    borderWidth: 0,
                                    borderRadius: 10,
                                    paddingHorizontal:20
                                }}
                            />
                            <Button
                                title="+ $200"
                                titleStyle={{ fontWeight: '500' }}
                                buttonStyle={{
                                    backgroundColor: '#d8d8d8',
                                    borderColor: 'transparent',
                                    borderWidth: 0,
                                    borderRadius: 10,
                                    paddingHorizontal:20
                                }}
                            />
                        </View>
                    </Card>
                </View>
                <View>
                    <Card containerStyle={styles.cardCnt2}>
                        <ListItem
                            title={
                                <View style={styles.listContainer}>
                                    <View style={{marginLeft: 0}}>
                                        <Text style={{fontSize:14, fontWeight: 'bold'}}>Monica Geller</Text>
                                        <Text style={{fontSize:6}}>Oct 8 4:52 AM</Text>
                                        <Text style={{fontSize:8}}>5 months ago</Text>
                                    </View>
                                    <Rating
                                        imageSize={15}
                                        readonly
                                        startingValue={4}
                                    />
                                </View>
                            }
                            leftAvatar={{ source: {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg'} }}
                            bottomDivider
                        />
                        <ListItem
                            title={
                                <View style={styles.listContainer}>
                                    <View style={{marginLeft: 0}}>
                                        <Text style={{fontSize:14, fontWeight: 'bold'}}>Monica Geller</Text>
                                        <Text style={{fontSize:6}}>Oct 8 4:52 AM</Text>
                                        <Text style={{fontSize:8}}>5 months ago</Text>
                                    </View>
                                    <Rating
                                        imageSize={15}
                                        readonly
                                        startingValue={4}
                                    />
                                </View>
                            }
                            leftAvatar={{ source: {uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/nuraika/128.jpg'} }}
                        />
                    </Card>
                </View>
                    <View style={styles.iconsContainer}>
                        <Icon
                            reverse
                            name='camera'
                            size={40}
                            type='font-awesome'
                            color='#e7e7e7' />
                        <Icon
                            reverse
                            size={40}
                            name='camera'
                            type='font-awesome'
                            color='#e7e7e7' />
                        <Icon
                            reverse
                            name='camera'
                            size={40}
                            type='font-awesome'
                            color='#e7e7e7'/>
                    </View>
                    <Card containerStyle={styles.cardCnt2}>
                        <View style={styles.myViewStyle}>
                            <View style={styles.coverViewStyle}>
                                <View style={styles.viewStyle1}/>
                                <View style={styles.viewStyle2}/>
                                <View style={styles.viewStyle3}/>
                            </View>
                            <View style={styles.iconsViewStyle}>
                                <View style={[styles.textIconStyle, styles.contentStyle]}>
                                    <Text numberOfLines={1} style={styles.textStyle}>{'Desde donde?'}</Text>
                                </View>
                                <View style={styles.textIconStyle}>
                                    <Text numberOfLines={1} style={styles.textStyle}>{'Hasta donde?'}</Text>
                                </View>
                            </View>
                            <View style={styles.coverViewStyle}>
                                <Button
                                    buttonStyle={{
                                        backgroundColor: '#e7e7e7',
                                        borderColor: 'transparent',
                                        borderWidth: 0,
                                        borderRadius: 12,
                                        marginLeft: 15,
                                        minHeight: 45,
                                        minWidth: 45,
                                        transform: [{ rotate: '90deg'}]
                                    }}
                                    icon={{
                                        name: 'md-swap',
                                        type: 'ionicon',
                                        size: 20,
                                        color: 'black'
                                    }}/>
                            </View>
                        </View>
                    </Card>
                    <View style={styles.iconsContainer}>
                        <Button
                            icon={{
                                name: 'calendar',
                                type: 'font-awesome',
                                size: 30,
                                color: 'white',
                            }}
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            title={`
AUDI
A3
`}
                            buttonStyle={{
                                borderWidth: 0,
                                borderRadius: 10,
                                width: 100,
                                height: 60,
                                paddingVertical: 10,
                                paddingHorizontal: 20
                            }}
                        />
                    </View>
                </ScrollView>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    backgroundImage:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.3
    },
    cardCnt: {
        borderWidth: 0, // Remove Border
        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow IOS
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width:"100%",
        marginLeft:0,
        marginRight:null,
        elevation: 0 // This is for Android
    },
    cardCnt2: {
        borderWidth: 1, // Remove Border
        shadowColor: 'black', // Remove Shadow IOS
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        borderRadius: 20,
        elevation: 0 // This is for Android
    },
    atras: {
        backgroundColor: 'black'
    },
    mainView:{
        flex:1,
        backgroundColor: colors.WHITE,
        //marginTop: StatusBar.currentHeight,
    } ,
    headerStyle: {
        borderBottomWidth: 0
    },
    headerTitleStyle: {
        color: colors.WHITE,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20
    },
    list: {
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: colors.greyOutline,
        backgroundColor: '#fff',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#FD6B78',
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
    },
    ratingText:{
        fontSize: 16,
        color: colors.GREY.iconSecondary,
        marginRight: 8,
        fontFamily: 'Roboto-Regular'
    },
    fonts: {
        marginBottom: 8,
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
    },
    social: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5,
    },

    inrContStyle:{
        marginLeft:10,
        marginRight: 10
    },
    mainViewStyle:{
        flex:1,
        backgroundColor: colors.WHITE,
        //marginTop: StatusBar.currentHeight
    },
    myViewStyle:{
        flex: 1.5,
        flexDirection: 'row',
        borderTopWidth:0,
        alignItems: 'center',
        paddingEnd: 20
    },
    coverViewStyle:{
        flex: 1.5,
        alignItems:'center'
    },
    viewStyle1:{
        height: 12,
        width: 12,
        borderRadius: 15/2,
        borderColor:  colors.GREEN.light,
        borderWidth: 3,
        backgroundColor: colors.GREY.iconPrimary
    },
    viewStyle2:{
        height: height/25,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 1,
        borderColor: colors.GREY.iconPrimary
    },
    viewStyle3:{
        height: 12,
        width: 12,
        borderRadius: 15/2,
        borderColor: colors.RED,
        borderWidth: 3,
        backgroundColor: colors.GREY.iconPrimary
    },
    iconsViewStyle:{
        flex: 7.5,
        justifyContent: 'space-between',
        marginRight: 5
    },
    contentStyle:{
        flex: 1,
        justifyContent: 'center',
        borderBottomColor: colors.BLACK,
        borderBottomWidth: 1
    },
    textIconStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'row'
    },
    textStyle:{
        flex:9,
        color: colors.BLACK,
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: 'bold'
    },
    searchClickStyle:{
        flex: 1,
        justifyContent: 'center'
    },
    compViewStyle:{
        flex: 3.5,
        alignItems: 'center'
    },
    pickCabStyle:{
        flex: 0.3,
        fontFamily: 'Roboto-Bold',
        fontSize: 15,
        fontWeight: '500',
        color: colors.BLACK
    },
    sampleTextStyle:{
        flex: 0.2,
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        fontWeight: '300',
        color: colors.GREY.secondary
    },
    adjustViewStyle:{
        flex: 9,
        flexDirection: 'row',
        //justifyContent: 'space-around',
        marginTop:8
    },
    imageViewStyle:{
        flex: 2.7,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    imageStyle:{
        height: height/14,
        width: height/14,
        borderRadius: height/14/2,
        borderWidth:3,
        borderColor:colors.YELLOW.secondary,
        //backgroundColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textViewStyle:{
        flex: 1,
        alignItems: 'center'
    },
    text1:{

        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        fontWeight: '900',
        color: colors.BLACK
    },
    text2:{
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        fontWeight: '900',
        color: colors.GREY.secondary
    },
    imagePosition:{
        height: height/14,
        width: height/14,
        borderRadius: height/14/2,
        borderWidth:3,
        borderColor:colors.YELLOW.secondary,
        //backgroundColor: colors.YELLOW.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyleView:{
        height: height/14,
        width: height/14,
        borderRadius: height/14/2,
        borderWidth:3,
        borderColor:colors.YELLOW.secondary,
        //backgroundColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle1:{
        height: height/20.5,
        width: height/20.5
    },
    imageStyle2:{
        height: height/20.5,
        width: height/20.5
    },
    buttonContainer: {
        flex:1
    },

    buttonTitleText: {
        color:colors.GREY.default,
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        alignSelf:'flex-end'
    },

    cancelButtonStyle: {
        backgroundColor: "#edede8",
        elevation: 0,
        width:"60%",
        borderRadius:5,
        alignSelf:"center"
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(ComponentesPrueba);


