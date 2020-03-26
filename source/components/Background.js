import React from 'react';
import { 
    StyleSheet
  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class Background extends React.Component {
  render() {
    return (
        <LinearGradient style={ styles.imgBackground }
            colors={ ['#245b84', '#3ea1c0']}
        >
            {this.props.children}
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
});
