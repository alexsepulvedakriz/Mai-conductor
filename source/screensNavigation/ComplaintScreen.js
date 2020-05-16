import React from 'react';
import {ActivityIndicator, Dimensions, Image, Text, View} from "react-native";
import { connect } from 'react-redux';
import stylesCommon from "../common/styles";
import {HeaderComponent, } from "../components";
import {AddComplaintModal} from '../modals';
import {LoadOverlay} from '../overlays'
import {Button} from "react-native-elements";
import languageJSON from "../common/language";
import {complaintAdd, complaintLoad} from "../actions/complaint";
import {colors} from "../common/theme";


var { height, width } = Dimensions.get('window');

const mapStateToProps = state => {
    return{
        complaints: state.complaints,
        profile: state.profile,
    }
};
const mapDispatchToProps = dispatch => ({
    AddComplaint: (Complaint) => dispatch(complaintAdd(Complaint)),
    loadComplaints: (id_rider) => dispatch(complaintLoad(id_rider))
});

class ComplaintsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addComplaintModal: false,
        }
    }
    componentDidMount() {
        this.props.loadComplaints(this.props.profile.profile.id_rider);
    }
    ComplaintAdd(description){
        this.props.AddComplaint({
            description: description,
            id_user: this.props.profile.profile.id_rider,
            name: this.props.profile.profile.name,
            last_name: this.props.profile.profile.last_name,
            mobile: this.props.profile.profile.movil,
            resolved: false,
            date: new Date(),
            type_user: 'rider',
            resolution: ''
        });
        this.setState({addComplaintModal: false})
    }
    resolved(resolved, resolution){
        if(resolved){
            return ('Resulta: ' + resolution);
        }
        else{
            return 'No resuelta';
        }
    }
    loadOrWait(){
        if(this.props.complaints.loading){
            return(
                <View style={{marginVertical: 90}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        if(this.props.complaints.complaints.length === 0 ){
            return (
                <View>
                    <Text style={{fontSize: 20, marginHorizontal: 20, marginTop: 10, textAlign: 'center'}}>{languageJSON.no_complaints_title}</Text>
                    <View style={{marginHorizontal: 20}}>
                        <Button
                            title={languageJSON.add_complaint}
                            titleStyle={{ fontWeight: '500' }}
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            buttonStyle={stylesCommon.buttonPositive}
                            onPress={() => {this.setState({addComplaintModal: true})}}
                        />
                    </View>
                </View>
            )
        }
        if(this.props.complaints.complaints.length > 0 ){
            return (
                <View>
                    <View style={stylesCommon.bottomDistance}>
                        {this.props.complaints.complaints.map((item, i) => (
                            <View key={i}>
                                <View style={ {marginHorizontal: 20, marginVertical: 10, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: colors.GREY.Deep_Nobel}}>
                                    <View style={[stylesCommon.rowSpaceBetween ]}>
                                        <View>
                                            <Text style={{fontSize:15 , color: colors.BLACK}}>{languageJSON.description}: {item.description}</Text>
                                            <Text style={{fontSize:13, color: colors.BLACK}}>{'Estado'}: {this.resolved(item.resolved, item.resolution)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Button
                            title={languageJSON.add_complaint}
                            titleStyle={{ fontWeight: '500' }}
                            linearGradientProps={{
                                colors: ['#245b84', '#3ea1c0'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            buttonStyle={stylesCommon.buttonPositive}
                            onPress={() => {this.setState({addComplaintModal: true})}}
                        />
                    </View>
                </View>

            )
        }
    }

    render() {
        return (
            <View>
                <HeaderComponent navigation = {() => {this.props.navigation.toggleDrawer();}} title={'Mis reclamos'} type={'color'}/>
                {this.loadOrWait()}
                <AddComplaintModal
                    Visible={this.state.addComplaintModal}
                    addComplaint={(description)=> {this.ComplaintAdd(description)}}
                    close={() => {this.setState({addComplaintModal: false})}}
                />
                <LoadOverlay Visible={this.props.complaints.adding} message={'Enviando el reclamo'}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsScreen);
