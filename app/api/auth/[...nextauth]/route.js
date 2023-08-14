  // every Nextjs route is a serverless lambda function    
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// you must also create new project on google cloud platform and enable the google+ api
import { connectToDatabase } from "../../../utils/database";
import User from "../../../models/user";


const handler = NextAuth({
  // the code below is the configuration object for next auth that tells next auth how to authenticate users and what providers to use
  providers: [
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // below is a hook that allows us to access the session object
  async session({ session }) {
    const sessionUser = await User.findOne({ email: session.user.email });
    session.user.id = sessionUser._id.toString(); //assigning the id of the user to the session object
    return session;
  }, //using the email from the session object, find the user in the database and return the user object so we always know who is logged in
  // below is a hook that allows us to access the user object
  async signIn({profile}) {
    // the session is created after the user signs in automatically by next-auth in the background. we can access the session object in the session hook
    try {
      await connectToDatabase();
      // check if user exists in the database
      const userExists = await User.findOne({ email: profile.email });
      // if not, create a new user
      if (!userExists) {
        await User.create({
          email: profile.email,
          userName: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  },
});

export { handler as GET, handler as POST };
