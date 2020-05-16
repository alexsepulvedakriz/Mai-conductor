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
        setTimeout(function(){ resolve(); }, 30000);
    });
    return promise;
};
export const simpleTimer10 = () => {
    var promise = new Promise(function(resolve, reject) {
        setTimeout(function(){ resolve(); }, 10000);
    });
    return promise;
};
export const transformTimeStampToDateToString = (time) => {
    if(time){
        const date = new Date(time.seconds*1000);
        const dateStr =
            ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
            ("00" + date.getDate()).slice(-2) + "/" +
            date.getFullYear();
        return dateStr;
    }
};
export const  _contactWhatsapp = () =>{
    const url= 'whatsapp://send?text=' + 'a' + '&phone=979456578';
    Linking.openURL(url)
}
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
