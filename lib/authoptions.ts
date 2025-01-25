
import prisma from "@/lib/db";
import { NextAuthOptions, type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  callbacks: {
    async signIn(params) {
      if (!params.user.email) {
        return false;
      }

      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: params.user.email,
          },
        });
        if (existingUser) {
          return true;
        }
        await prisma.user.create({
          data: {
            email: params.user.email,
            image: params.user.image ?? "",
            name: params.user.name ?? "",
            provider: "Google",
          },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user && user.email) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });
        if (!dbUser) {
          return token;
        }

        return {
          ...token,
          id: dbUser.id,
        };
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
} satisfies NextAuthOptions;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}