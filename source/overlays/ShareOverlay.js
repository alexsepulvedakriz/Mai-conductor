import React, { Component } from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {BoxedShare} from "../components";
import {Overlay} from "react-native-elements";

var { height, width } = Dimensions.get('window');

export default class ShareOverlay extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { modalVisible } = this.props;
        let visible = false;
        if(modalVisible){
            visible = true;
        }
        return (
            <Overlay
                isVisible={visible}
                windowBackgroundColor="rgba(0, 0, 0, .5)"
                overlayBackgroundColor="white"
                width={width -20}
                height={80}
                onBackdropPress={() => this.props.hide()}
            >
                <View style={[styles.container, styles.horizontal]}>
                    <BoxedShare
                        WhatsappMessage="https://github.com/ugurrdemirel/ReactNativeSocialShareButtons"
                        FacebookShareURL="https://github.com/ugurrdemirel/ReactNativeSocialShareButtons"
                        FacebookShareMessage="Hey, I find great react-native component on github"
                        TwitterShareURL="https://github.com/ugurrdemirel/ReactNativeSocialShareButtons"
                        TwitterShareMessage="Hey, I find great react-native component on github"
                        TwitterViaAccount="ugurr_demirel"
                        NativeShareTitle="React Native Social Share Buttons"
                        NativeShareMessage="Hey, I find great react-native component on github"
                        NativeShareURL="https://github.com/ugurrdemirel/ReactNativeSocialShareButtons"
                        cancel = {() => {this.props.hide()}}
                    />
                </View>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});
