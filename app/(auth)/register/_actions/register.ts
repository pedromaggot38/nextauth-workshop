'use server'

import db from '@/lib/db'
import { hashSync } from 'bcrypt-ts';
import { redirect } from 'next/navigation';

export default async function register(FormData: FormData) {

    // Get data from form
    const name = FormData.get('name') as string
    const email = FormData.get('email') as string
    const password = FormData.get('password') as string

    // Check if any of the fields are empty
    if (!name || !email || !password) {
        throw new Error ('Please fill in all the fields')
    }

    // Check if password is less than 6 characters
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
    }

    // Check if user already exists, and throw error if it does
    const user = await db.user.findUnique({
        where: {
            email: email
        }
    })

    if (user) {
        throw new Error('User already exists')
    }
    // ----------------------------------------------------------------------
    
    await db.user.create({
        data: {
            name: name,
            email: email,
            password: hashSync(password)
            // Password is crypted in the hashSync function
        }
    })

    redirect('/')
}