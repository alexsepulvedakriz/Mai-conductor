import React, { Component } from 'react';
import { ActivityIndicator, Modal, View, StyleSheet} from 'react-native';



export default class LoadModal extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { modalvisable } = this.props;
        return (
            <Modal
                animationType="slide"
                visible={modalvisable}
                animationType={'slide'}
                transparent={false}
                presentationStyle="fullScreen"
            >
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </Modal>
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
