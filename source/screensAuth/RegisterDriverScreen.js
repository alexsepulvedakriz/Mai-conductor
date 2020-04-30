import React from 'react';
import {View} from 'react-native';
import {userSignUp} from "../actions/auth";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return{
        auth: state.auth,
    }
}
const mapDispatchToProps = dispatch => ({
    signUp: (credentials) => dispatch(userSignUp(credentials))
});


class RegistrationPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showTutorial: true
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
    }
    render() {
        return (
            <View style={styles.containerView}>

            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
