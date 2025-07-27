/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    betterAuth
} from 'better-auth';
import { admin, anonymous } from "better-auth/plugins";
import {Pool} from "pg"

export const auth = betterAuth({
    database:new Pool({
        connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false // Required for Supabase
            }
    }),
    emailVerification: {
		sendVerificationEmail: async(user)=>{
			// send email verification email
			// implement your own logic here
		}
	},
    emailAndPassword: { 
        enabled: true, 
    } ,
    socialProviders: {
        google: {
            prompt: "select_account", 
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }
    },
    plugins: [admin(), anonymous()], 


    /** if no database is provided, the user data will be stored in memory 
     * Make sure to provide a database to persist user data **/
});

// export const { POST, GET } = auth.handler;

