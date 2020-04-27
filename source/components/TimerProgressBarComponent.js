import React from 'react';
import {
    Dimensions,
    StyleSheet
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';


var { height, width } = Dimensions.get('window');

export default class TimerProgressBarComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            progress: 100,
        }
        this.counter();
    }
    counter(){
        this.simpleTimer().then( _ => {
            this.setState({progress: this.state.progress - 3});
            if(this.state.progress > 0){
                this.counter();
            } else {
                this.props.finish();
            }
        })
    }
    simpleTimer() {
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function(){ resolve(); }, 1000);
        });
        return promise;
    }

    render() {
        const barWidth = width - 80;
        return (
            <ProgressBarAnimated
                width={barWidth}
                height={7}
                value={this.state.progress}
                backgroundColorOnComplete='#3ea1c0'
                backgroundColor={'#3ea1c0'}
            />
        );
    }
}
