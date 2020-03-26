import React from 'react';
import {LoadModal, Registration} from '../components';
import {Alert, StyleSheet, View} from 'react-native';
import {userSignUp} from "../actions/auth";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return{
        data: state.auth,
    }
}
const mapDispatchToProps = dispatch => ({
    signUp: (credentials) => dispatch(userSignUp(credentials))
});


class RegistrationPage extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.data.loaded === true) {
            this.redirect();
        }
        if(this.props.data.error === true) {
            Alert.alert('Error', 'Error al registrarte, intentalo nuevamente' + this.props.data.errormessage, null, {cancelable: true});
        }
    }

    redirect = () => {
        this.props.navigation.navigate('Root');
    }

    async clickRegister(nombre, apellido, email, movil, password, photo) {
                //  Registration part
        const credentials = {nombre, apellido, email, movil, password, photo};
        const fechaInicio = new Date();
        const evaluacion = 5;
        this.props.signUp({...credentials, fechaInicio, evaluacion});
    }

  
    
  render() {
    const registrationData= this.props.navigation.getParam("requireData");
    return (
        <View style={styles.containerView}>
            <LoadModal
                modalvisable={this.props.data.loading}
            />
            <Registration reqData={registrationData?registrationData:""} complexity={'any'} onPressRegister={(nombre, apellido, email, movil, password, photo)=>this.clickRegister(nombre, apellido, email, movil, password, photo)} onPressBack={()=>{this.props.navigation.goBack()}} loading={this.props.loading}></Registration>
        </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);

const styles = StyleSheet.create({
    containerView:{ flex:1 },
});
