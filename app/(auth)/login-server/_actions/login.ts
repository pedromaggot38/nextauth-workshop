'use server'

import { signIn } from "@/services/auth/auth"

export default async function login(formData: FormData) {
    const { email, password } = Object.fromEntries(formData.entries());

    console.log({ email, password })
    await signIn('credentials', { email, password })

}
