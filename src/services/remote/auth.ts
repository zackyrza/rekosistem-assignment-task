import { useState } from "react";
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

interface IUser {
    email?: string;
    id?: string;
    givenName?: string;
    familyName?: string;
    photo?: string; // url
    name?: string; // full name
};

interface IUserInfo {
    idToken: string;
    serverAuthCode: string;
    scopes: Array<string>;
    user: IUser;
};

export default function useAuthenticationService() {
    const [user, setUser] = useState<IUser>({});
    const [error, setError] = useState('');

    function login(email: string, password: string) {
        return auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                setUser({
                    email: res.user?.email ?? '',
                    id: res.user?.uid,
                    givenName: res.user?.displayName ?? '',
                    familyName: '',
                    photo: res.user?.photoURL ?? '',
                    name: res.user?.displayName ?? '',
                });
                return setTimeout(() => {
                    return res;
                }, 2000);
            }).catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setError('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    setError('That email address is invalid!');
                }

                if (error.code === 'auth/invalid-login') {
                    setError('The credentials you provided are invalid!');
                }

                throw error;
            });
    }

    async function loginByGoogle() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken, user: userData } = await GoogleSignin.signIn();

        console.log(idToken, '==============================')

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        setUser({
            email: userData.email,
            id: userData.id,
            givenName: userData.givenName || '',
            familyName: userData.familyName || '',
            photo: userData.photo || '',
            name: userData.name || '',
        });

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    async function logout() {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUser({});
        } catch (error) {
            console.error(error);
        }
    }

    function init() {
        GoogleSignin.configure({
            webClientId: 'AIzaSyCjr1Bg4dOZToZscu-3ggLmUUmMAiHd6bE'
        });
    }
    
    return {
        error,
        user,
        login,
        loginByGoogle,
        logout,
        init,
    };
}