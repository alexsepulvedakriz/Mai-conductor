import React, { Component } from 'react';
import {StyleSheet, View, Image, Alert} from 'react-native';
import { LoginComponent, Background, ForgotPassModal, LoadModal} from '../components';
import * as firebase from 'firebase'
import  languageJSON  from '../common/language';
import { userSignIn, resettingPassword} from "../actions/auth";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return{
        data: state.auth,
    }
}
const mapDispatchToProps = dispatch => ({
    signIn: (credentials) => dispatch(userSignIn(credentials)),
    resettingPassword: (email) => dispatch(resettingPassword(email))
});

class LoginScreen extends Component {
    constructor(props){
      super(props);
      this.state = {
          email:'',
          password:'',
          emailValid:true,
          passwordValid:true,
          showForgotModal:false,
          emailerror:null,
      }
      
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.data.loaded === true) {
            this.redirect();
        }
        if(this.props.data.error === true) {
            Alert.alert('Error', 'Error al ingresar, intentalo nuevamente', null, {cancelable: true});
        }
        if(this.props.data.messageSuccessResetting === true && prevState.showForgotModal === this.state.showForgotModal) {
            Alert.alert('Mensaje', 'Se ha enviado correctamente', null, {cancelable: true});

        }
        if(this.props.data.errorResetting === true && prevState.showForgotModal === this.state.showForgotModal) {
            Alert.alert('Error', 'Error al enviar el correo, intentalo nuevamente', null, {cancelable: true});
        }
    }

    redirect = () => {
        this.props.navigation.navigate('Root');
    }

    //forgot password press
    forgotPassPress() {
        this.setState({showForgotModal:true})
    }
    // close modal forgot password
    closeModal(){ 
        this.setState({ showForgotModal: false })
    }

    //go to register page
    onPressRegister() {
        this.props.navigation.navigate('Reg');
        // console.log("register clicked");
    }
    // recober password
    onPressForgotPass(email) {
        this.setState({showForgotModal:false});
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
                  modalvisable={this.state.showForgotModal}
                  requestmodalclose={()=>{this.closeModal()}}
                  onPressForgotPass={(email)=>this.onPressForgotPass(email)} 
              />
              <LoadModal
                  modalvisable={this.props.data.loading}
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
