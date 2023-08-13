import NextAuth from "next-auth";
import GoodProvider from "next-auth/providers/google";
// you must also create new project on google cloud platform and enable the google+ api
import { connectToDatabase } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  provider: [
    GoodProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  async session({ session }) {
    //this is a hook that allows us to access the session object like sessionStorage}
    const sessionUser = await User.findOne({ email: session.user.email });
    session.user.id = sessionUser._id.toString();

    return session;
  }, //using the email from the session object, find the user in the database and return the user object so we always know who is logged in

  async signIn({ profile }) {
    // every Nextjs route is a serverless lambda function
    try {
      await connectToDatabase();
      // check if user exists in the database
      const userExists = await User.findOne({ email: profile.email });
      // if not, create a new user
      if (!userExists) {
        await User.create({
          email: profile.email,
          userName: profile.name.replace(" ", ""),
          image: profile.picture,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  },
});

export {handler as GET, handler as POST};