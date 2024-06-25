'use server'

import { signIn } from "@/services/auth/auth"
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export default async function login(formData: FormData) {
    const { email, password } = Object.fromEntries(formData.entries());

    console.log({ email, password })
    try {
        await signIn('credentials', { email, password })
        
    } catch (e) {
        if (e instanceof AuthError){
            if(e.type === "CredentialsSignin"){
                e.message = "Credenciais inválidas"
                throw e
            }if (e.type === "CallbackRouteError") {
                e.message = "Credenciais inválidas"
                throw e
            }
        }
    }

    redirect('/dashboard')
}
