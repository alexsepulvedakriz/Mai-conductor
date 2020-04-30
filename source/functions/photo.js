import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {Alert} from "react-native";

// image picker
const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }
};

const _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
    });
    return result;
}

const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
}

export const takePhoto = async () => {
    await getPermissionAsync();
    const result = await _pickImage();
    if(!result.cancelled) {
        uploadImage(result.uri)
        .then((photo)=> {Alert.alert("Mensaje", 'La foto se ha subido con exito', null, {cancelable: true})})
        .catch((error)=> {Alert.alert("Alerta", 'Ha ocurrido un error, intentalo nuevamente', null, {cancelable: true})});
    }
}
