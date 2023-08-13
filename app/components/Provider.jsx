'use client'
import React from "react";
import { SessionProvider } from "next-auth/react"; //this is a hook that allows us to access the session object

export default function Provider({ children, session }) {
  return <SessionProvider session={session}>
    {children}
    </SessionProvider>;
}
