import React from "react";
import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import languageJSON from "../common/language";
import {connect} from "react-redux";
import stylesCommon from "../common/styles";
import {Button, Header} from "react-native-elements";
import {userSignOut} from "../actions/auth";
import {transformTimeStampToDateToString} from "../functions/others";
import {penaltiesLoad} from "../actions/penalties";

var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        penalties: state.penalties,
        auth: state.auth,
    }
};
const mapDispatchToProps = dispatch => ({
    userSignOutProps: () => dispatch(userSignOut()),
    penaltiesLoadProps: (id_rider) => dispatch(penaltiesLoad(id_rider)),
});

class PenaltiesScreen extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.penaltiesLoadProps(this.props.auth.id_rider);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!this.props.penalties.penalty){
            this.props.navigation.navigate('Map');
        }
    }
    showOrNot(){
        if(this.props.penalties.penalty){
            return(
                <View>
                    <View style={{marginHorizontal: 20, marginTop: 20}}>
                        <Text>
                            {'Te encuentras sancionado desde el '+ transformTimeStampToDateToString(this.props.penalties.penalty.init_date) + ' hasta el ' + transformTimeStampToDateToString(this.props.penalties.penalty.end_date) + ' ' + this.props.penalties.penalty.description }
                        </Text>
                    </View>
                    <View style={{marginHorizontal: 20, marginTop: 20}}>
                        <Text>
                            {'Advertiencia: ' + this.props.penalties.penalty.warnings }
                        </Text>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Button
                            onPress={() => {this.props.userSignOutProps()}}
                            icon={{
                                name: 'sign-out',
                                type: 'font-awesome',
                                size: 15,
                                color: 'white',
                            }}

                            title={languageJSON.logout}
                            buttonStyle={{
                                backgroundColor: '#245b84',
                                borderColor: 'transparent',
                                borderWidth: 0,
                                borderRadius: 10,
                                paddingHorizontal: 30,
                                width: width - 40,
                                marginTop: 20
                            }}
                            underlayColor="transparent"
                        />
                    </View>
                </View>
            )
        }
    }

    render() {
        return (
            <View>
                <Header
                    backgroundColor={'transparent'}
                    linearGradientProps={{
                        colors: ['#245b84', '#3ea1c0'],
                        start: [0, 1],
                        end: [1, 1],
                    }}
                    centerComponent={<Text style={stylesCommon.headerTitleStyle}>Sancionado</Text>}
                    containerStyle={stylesCommon.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                />
                {this.showOrNot()}
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PenaltiesScreen);
