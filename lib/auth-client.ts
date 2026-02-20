/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    createAuthClient
} from "better-auth/react";


export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,

})

export const signIn = {
    social: async () => {
        console.log("New Sign In Initiatedd:::::::>")
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: '/'
        })
        console.log("Google Sign In Data recieved::::",data);
        return data;
    },
    email: async (options: {
        email: string;
        password: string;
        rememberMe?: boolean;
        callbackURL?: string;
    }) => {
        console.log("Email Sign In Initiated")
        const data = await authClient.signIn.email({
            email: options.email,
            password: options.password,
            rememberMe: options.rememberMe,
            callbackURL: options.callbackURL || '/'
        })
        console.log("Email Sign In Data received:", data);
        return data;
    }
}

export const  {
    signOut,
    signUp,useSession
} = authClient;