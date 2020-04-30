import React, { Component } from 'react';
import {StyleSheet, View, Image, Alert} from 'react-native';
import { LoginComponent, Background } from '../components';
import { ForgotPassModal, LoadModal} from '../modals'
import { userSignIn, resettingPassword} from "../actions/auth";
import { hideModalResetPassword, showModalResetPassword} from "../actions/modals";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return{
        auth: state.auth,
        modal: state.modal
    }
}
const mapDispatchToProps = dispatch => ({
    signIn: (credentials) => dispatch(userSignIn(credentials)),
    resettingPassword: (email) => dispatch(resettingPassword(email)),
    hideResetPassword: () => dispatch(hideModalResetPassword()),
    showResetPassword: () => dispatch(showModalResetPassword())
});


class LoginScreen extends Component {
    constructor(props){
      super(props);

    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.auth.sing_in_loaded === true) {
            this.redirect();
        }
        if(this.props.auth.error === true) {
            Alert.alert('Error', 'Error al ingresar, intentalo nuevamente', null, {cancelable: true});
        }
        if(this.props.auth.reset_loaded === true) {
            Alert.alert('Mensaje', 'Se ha enviado correctamente', null, {cancelable: true});
        }
        if(this.props.auth.reset_error === true) {
            Alert.alert('Error', 'Error al enviar el correo, intentalo nuevamente', null, {cancelable: true});
        }
    }
    redirect = () => {
        this.props.navigation.navigate('Root');
    }
    //forgot password press
    forgotPassPress() {
        this.props.showResetPassword();
    }
    // close modal forgot password
    closeModal(){
        this.props.hideResetPassword();
    }

    //go to register page
    onPressRegister() {
        this.props.navigation.navigate('RegisterUser');
        // console.log("register clicked");
    }
    // recober password
    onPressForgotPass(email) {
        this.props.hideResetPassword();
        this.props.resettingPassword(email);
    }

    //on press login after all validation
    async onPressLogin(email, password){
        this.props.signIn({email, password});
    }

  render() {
    return (
        <Background>
            <View style={styles.logo}>
                <Image source={require('../../assets/images/logo.png')} />
            </View>
            <View style={styles.logInCompStyl}/>
            <View style={styles.containerView}>
              <LoginComponent
                complexity={'any'}
                onPressRegister={()=>{this.onPressRegister()}} 
                onPressLogin={(email, password)=>this.onPressLogin(email, password)} 
                onPressForgotPassword={()=>{this.forgotPassPress()}}
              />
            </View>
              <ForgotPassModal
                  modalvisable={this.props.modal.showModalResetPassword}
                  requestmodalclose={()=>{this.closeModal()}}
                  onPressForgotPass={(email)=>this.onPressForgotPass(email)} 
              />
              <LoadModal
                  modalVisible={this.props.auth.sing_in_loading}
              />
        </Background>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
//Screen Styling
const styles = StyleSheet.create({
    containerView: {flex: 1, justifyContent:'center', alignItems:'center'},
    logo:{
        flex:1,
        position:'absolute',
        top:80,
        width:'100%',
        justifyContent:"flex-end",
        alignItems:'center'
    },
    logInCompStyl:{
        height: 100,
        marginBottom: 20
    }
});
