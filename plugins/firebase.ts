import { FirebaseOptions, initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth, signInWithCredential } from "firebase/auth";
import { useAuth } from "~/stores/auth";
import type { User } from "~/types/User";
// import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const firebaseConfig: FirebaseOptions = {
        apiKey: config.public.FB_API_KEY,
        authDomain: config.public.FB_AUTH_DOMAIN,
        projectId: config.public.FB_PROJECT_ID,
        storageBucket: config.public.FB_STORAGE_BUCKET,
        messagingSenderId: config.public.FB_MESSAGING_SENDER_ID,
        appId: config.public.FB_APP_ID,
        measurementId: config.public.FB_MEASUREMENT_ID
    };


    const app = initializeApp(firebaseConfig);

    // const analytics = getAnalytics(app);
    const auth = getAuth(app);
    // const firestore = getFirestore(app);
    nuxtApp.provide('firebase', app);
    nuxtApp.vueApp.provide('firebase', app);
    nuxtApp.provide('auth', auth);
    nuxtApp.vueApp.provide('auth', auth);
    const authState = useAuth();
    const useLoginWithGithubToken = async (token: string): Promise<void> => {

        return await signInWithCredential(auth, GithubAuthProvider.credential(token))
            .then((result) => {
                const user = result.user;
                const currentUser: User = {
                    email: user.email,
                    name: user.displayName,
                    photo: user.photoURL,
                    phone: user.phoneNumber,
                };
                authState.login(currentUser);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                console.log("Error code: ", errorCode);
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // ...
            });
    };

    nuxtApp.provide('loginWithGithubToken', useLoginWithGithubToken);
    nuxtApp.vueApp.provide('loginWithGithubToken', useLoginWithGithubToken);
    // nuxtApp.provide('firestore', firestore);
    // nuxtApp.vueApp.provide('firestore', firestore);
    // nuxtApp.provide('analytics', analytics);
    // nuxtApp.vueApp.provide('analytics', analytics);
})