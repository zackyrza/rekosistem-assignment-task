import { NativeModules } from 'react-native';

interface ModalNativeModule {
    show: (title: string, content: string) => void;
}

export default NativeModules.ModalNativeModule as ModalNativeModule;