import React from 'react';
import {View, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import  languageJSON  from '../common/language';
import { colors } from '../common/theme';
import stylesCommon from '../common/styles';
import {HeaderComponent} from "../components";

var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
    }
}
const mapDispatchToProps = dispatch => ({
});

class VehiclesScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentWillMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot){
    }
    render() {
        return (
            <View>
                <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={languageJSON.my_vehicles_header} type={'color'}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesScreen);
