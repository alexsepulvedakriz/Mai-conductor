import React from 'react';
import {StyleSheet, View} from 'react-native';
import  languageJSON  from '../common/language';
import {HeaderComponent, LoadOverlay, ProfileComponent, SuccessOrErrorOverlay} from '../components';
import { connect } from 'react-redux';
import {profileUpdate} from "../actions/profile";
import {hideModalCheck} from "../actions/modals";

const mapStateToProps = state => {
    return{
        profile: state.profile,
        modal: state.modal
    }
};
const mapDispatchToProps = dispatch => ({
    editProfile: (user) => dispatch(profileUpdate(user)),
    hideModalCheck: () => dispatch(hideModalCheck()),
});

class ProfileScreen extends React.Component {

  constructor(props) {
      super(props);
  }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.modal.showModalCheck) {
            this.simpleTimer().then( _ => {
                this.props.hideModalCheck();
                this.props.navigation.navigate('Map');
            })
        }
    }
    simpleTimer() {
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function(){ resolve(); }, 2000);
        });
        return promise;
    }
  profileEdit(name, last_name, rut, photo){
      this.props.editProfile({name: name, last_name: last_name, rut: rut, id_driver: this.props.profile.id_driver, photo: photo})
  }

    render() {
        return (        
        <View style={styles.mainView}>
            <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={languageJSON.profile_page_title} type={'color'}/>
            <ProfileComponent dataUser={this.props.profile.profile} onPressRegister={(name, last_name, rut, photo) => {this.profileEdit(name, last_name, rut, photo)}}/>
            <LoadOverlay Visible={this.props.profile.loading} message={languageJSON.profile_edit}></LoadOverlay>
            <SuccessOrErrorOverlay Visible={this.props.modal.showModalCheck} correct={true}/>
            <SuccessOrErrorOverlay Visible={this.props.profile.error} correct={false}/>
        </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
});
