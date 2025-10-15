import { NextAuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { JSON_HEADER } from './lib/constants/shared.constant';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });
        const payload: ApiResponse<User> = await response.json();
        if ('error' in payload) {
          throw new Error(payload.error);
        }

        return {
          id: payload.user._id,
          user: payload.user,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.token;
        token.user = user.user;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
};
