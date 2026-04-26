import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("بيانات الدخول غير صحيحة");
        }
        
        await connectToDatabase();
        const user = await User.findOne({ username: credentials.username.trim().toLowerCase() });
        
        if (!user || !user.password) {
          throw new Error("بيانات الدخول غير صحيحة");
        }
        
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
        
        if (!isCorrectPassword) {
          throw new Error("بيانات الدخول غير صحيحة");
        }
        
        // Strict Login Logic
        if (user.status === "Pending") {
          throw new Error("حسابك قيد المراجعة");
        }
        if (user.status === "Rejected") {
          throw new Error("تم رفض هذا الحساب");
        }
        
        return {
          id: user._id.toString(),
          name: user.name || user.username,
          role: user.role,
        };
      }
    })
  ],
  pages: {
    signIn: "/portal",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "nexara_enterprise_secret_key_123",
};
