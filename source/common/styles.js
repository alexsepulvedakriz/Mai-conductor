import {Dimensions, StyleSheet} from 'react-native';
import {colors, theme} from './theme';
var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    // buttom
    bottomDistance:{
        height: height - 200
    },
    // mapa
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    backgroundMap:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    // botones
    buttonBlue:{
        height:50,
        width:160,
        backgroundColor:theme.BUTTON_BLUE,
    },
    buttonYellow:{
        height:50,
        width:160,
        backgroundColor:theme.BUTTON_YELLOW,
    },
    buttonPrimary:{
        height:50,
        width:160,
        backgroundColor:theme.BUTTON_PRIMARY
    },
    buttonText:{
        fontFamily: theme.FONT_ONE,
        fontSize:theme.FONT_SIZE_BUTTONS,
        color:theme.BUTTON_TEXT
    },
    // disposicion
    rowSpaceAround: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 5,
        marginTop: 5,
        alignItems: 'center'
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
        marginTop: 5,
    },
    columnSpaceBetween:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        //marginTop: StatusBar.currentHeight,
    },
    // vista principal
    // botones tipos
    buttonNegative: {
        backgroundColor: '#f7ab00',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 10,
    },
    buttonPositive: {
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 10,
        marginVertical: 10
    },
    // errores
    errorMessageStyle: {
        fontSize: 12,
        fontWeight:'bold',
        marginLeft:0,
        color: colors.RED
    },
    errorTextContainer: {

    },
    // titulos
    // textos
    messageWaitOfferDriversStyle: {
        marginHorizontal: 20,
        marginLeft: 10,
        marginRight: 25,
        color: colors.GREY.iconSecondary,
        fontSize: 20
    },
    // Inputs
    InputContainer: {
        borderRadius:10,
        borderColor: colors.GREY.Deep_Nobel,
        borderWidth: 1,
        backgroundColor: colors.WHITE,
        width: '100%',
        marginBottom: 10,
    },
    inputTextStyle: {
        color:colors.GREY.Deep_Nobel,
        fontSize:15
    },
    // text input
    textInputSimple: {
        height: 40,
        marginBottom: 10,
        borderColor: colors.GREY.Deep_Nobel,
        borderWidth: 1,
        borderRadius: 10,
        color: colors.GREY.Deep_Nobel,
        padding:10
    },
    textInputMultiRow: {
        height: 80,
        marginBottom: 10,
        borderColor: colors.GREY.Deep_Nobel,
        borderWidth: 1,
        borderRadius: 10,
        color: colors.GREY.Deep_Nobel,
        padding:10
    },
    // header
    headerStyle: {
        borderBottomWidth: 0
    },
    headerTitleStyle: {
        color: colors.WHITE,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    headerTitleBlackStyle: {
        color: colors.BLACK,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    // imagenes de fondo
    backgroundImage:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    // list
    listItem: {
        fontSize:13,
        color: colors.GREY.iconSecondary ,
        marginVertical: 5
    },
    // Cards
    cardTransparent: {
        borderWidth: 0, // Remove Border
        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow IOS
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width:"100%",
        marginLeft:0,
        marginRight:null,
        elevation: 0, // This is for Android
        bottom: 0
    },
});
