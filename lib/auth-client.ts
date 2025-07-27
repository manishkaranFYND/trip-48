/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    createAuthClient
} from "better-auth/react";


export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,

})

export const signIn = async () => {
    console.log("New Sign In Initiatedd:::::::>")
    const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: '/'
    })
    console.log("Google Sign In Data recieved::::",data);
    return data;
}

export const  {
    signOut,
    signUp,useSession
} = authClient;