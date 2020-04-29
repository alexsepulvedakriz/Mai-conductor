import React from 'react';
import {Registration} from '../components';
import {TutorialModal} from '../modals'
import {LoadModal} from '../modals'
import {Alert, StyleSheet, View} from 'react-native';
import {userSignUp} from "../actions/auth";
import {connect} from "react-redux";
import Background from "../components/Background";

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
        this.state = {
            showTutorial: true
        }
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
            {/*<Registration reqData={registrationData?registrationData:""} complexity={'any'} onPressRegister={(nombre, apellido, email, movil, password, photo)=>this.clickRegister(nombre, apellido, email, movil, password, photo)} onPressBack={()=>{this.props.navigation.goBack()}} loading={this.props.loading}></Registration>*/}
            <Background>
                <Registration reqData={registrationData?registrationData:""} complexity={'any'} onPressRegister={(nombre, apellido, email, movil, password, photo)=>this.clickRegister(nombre, apellido, email, movil, password, photo)} onPressBack={()=>{this.props.navigation.goBack()}} loading={this.props.loading}></Registration>
            </Background>
            <LoadModal modalvisable={this.props.data.loading}/>
            <TutorialModal modalVisible={this.state.showTutorial} close={() => this.setState({showTutorial: false})}/>
        </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);

const styles = StyleSheet.create({
    containerView:{ flex:1 },
});
