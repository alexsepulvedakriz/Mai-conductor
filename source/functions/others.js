import {Linking} from "react-native";
import * as Random from "expo-random";

export const simpleTimer2 = () => {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function(){ resolve(); }, 2000);
    });
    return promise;
}

export const simpleTimer30 = () => {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function(){ resolve(); }, 35000);
    });
    return promise;
};
// phone
export const  _pressCall = (tel) =>{
    const url= 'tel:' + tel;
    Linking.openURL(url)
}
export const isNull = (arg) => {
    if(arg){
        return true;
    } else {
        return false;
    }
}
export const generateUIDD = async () => {
    const randomBytes = await Random.getRandomBytesAsync(8);
    /* Some crypto operation... */
    let id = '1';
    randomBytes.map( number => {
        id = id + '-' + number;
    });
    return id;
};
