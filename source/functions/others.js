import {Linking} from "react-native";

export const simpleTimer = () => {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function(){ resolve(); }, 2000);
    });
    return promise;
}
// phone
export const  _pressCall = (tel) =>{
    const url= 'tel:' + tel;
    Linking.openURL(url)
}
