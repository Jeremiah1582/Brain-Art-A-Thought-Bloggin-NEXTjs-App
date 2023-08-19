"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import logo from "../public/assets/images/logo.png";
import profIcon from "../public/assets/images/profile.png";

function Nav() {
  const [providers, setProviders] = useState(null); // providers refers to the providers we have in our next auth config file i.e. google, facebook, twitter etc
  const { data: session } = useSession();
  //   dropdown menu for mobile
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const handleToggleDropDown = () => {
    setToggleDropDown((prev) => !prev);
  };

  // console.log('this is providers', providers
  // );

  // this allows us to sign in using next auth
  useEffect(() => {
    // Declare the async function
    const fetchProvidersData = async () => {
      const response = await getProviders();
      setProviders(response); // Use response.providers instead of respons
    };

    // Call the async function
    fetchProvidersData();
  }, []);
   
  return (
    <nav className="z-10 flex-between w-full mb-16 pt-0">
      <Link href="/" className="flex gap-2 flex-center">
         
        {/* app logo */}
        <Image
          src={logo}
          alt="logo"
          width={50}
          height={50}
          className="object-contain"
        />
        <p className="logo_text">Blog Search</p>
      </Link>

      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 ">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out{" "}
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                className="rounded-full "
                height={37}
                width={37}
                alt="profile"
                onClick={handleToggleDropDown} //recommended way to toggle state to prevent unpredictability
              />
            </Link>
          </div>
        ) : (
          //  providers need to be configured in next auth config file
          <>
            {" "}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() =>signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              className="rounded-full"
              height={37}
              width={37}
              alt="profile"
              onClick={handleToggleDropDown} //recommended way to toggle state to prevent unpredictability
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out{" "}
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {" "}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
