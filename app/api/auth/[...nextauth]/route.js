  // every Nextjs route is a serverless lambda function    
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// you must also create new project on google cloud platform and enable the google+ api
import { connectToDatabase } from "../../../utils/database";
import User from "../../../models/user";


const handler = NextAuth({
 //what is a provider? a provider is a service that allows you to sign in with an account from a third party service.
  providers: [ // you can add as many providers as you want
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  
  callbacks:{// what is are callbacks? they are functions that are called at a specific time during the execution of a program. they are also called hooks

  // ----------------session -------------
    //what is a session? a session is an object that contains information about the current user. it is created after the user signs in. it is stored in a cookie in the browser. it is also stored in the sessionstore 
  async session({ session }) { // hook allows us to access the session object
    const sessionUser = await User.findOne({ email: session.user.email });
    session.user.id = sessionUser._id.toString(); //assigning the id of the user to the session object
    return session;
  }, //using the email from the session object, find the user in the database and return the user object so we always know who is logged in
  // below is a hook that allows us to access the user object

  // ----------------sign in -------------
  async signIn({profile}) {
    // the session is created after the user signs in automatically by next-auth in the background. we can access the session object in the session hook
    try { 
      await connectToDatabase();
      // check if user exists in the database using the email from the profile object
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
      else{
        return true;
      }
    } catch (error) {
      console.log(error);
      // you must set up the Autherised redirect URI in googlecloud. https://youtu.be/wm5gMKuwSYk?t=6269 for more info on this    
    }
  },

  }
});

export { handler as GET, handler as POST };
