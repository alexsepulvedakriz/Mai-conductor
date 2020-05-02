import * as DocumentPicker from 'expo-document-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {Alert} from "react-native";


const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    return result;
}


export const documentPicker = async () => {
    const result = await _pickDocument();
    if(!result.cancelled && result.type !== 'cancel') {
        const response = await fetch(result.uri);
        const blob = await response.blob();
        return blob;
    }
}
