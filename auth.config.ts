import { NextAuthConfig } from 'next-auth'
import google from 'next-auth/providers/google'

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [google],
} satisfies NextAuthConfig
