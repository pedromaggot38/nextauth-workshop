import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import email from 'next-auth/providers/email';
/*  
const {handlers, auth} = NextAuth({
    providers: [Credentials],
})      SAME AS:
*/
export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [Credentials({
        credentials: {
            email: {},
            password: {},
        },
        authorize(credentials){
            console.log(credentials)
            return null;
        }
    })],
});

