"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import logo from "../public/assets/images/logo.svg";
import profIcon from "../public/assets/images/profile.png";
import { set } from "mongoose";

function Navbar() {
  const isUserLoggedIn = true;
  const [providers, setProviders]=useState(null); // providers refers to the providers we have in our next auth config file i.e. google, facebook, twitter etc

//   dropdown menu for mobile
const [toggleDropDown, setToggleDropDown] = useState(false)

const handleToggleDropDown = () => {
    setToggleDropDown((prev)=>!prev)
}

  // this allows us to sign in using next auth
  useEffect(() => {
    const getAndSetProviders = async () => {
        const response = await getProviders();
        setProviders(response);
      };
      getAndSetProviders();
  }, []);


  return (
   
    <nav className="flex-between w-full mb-16 pt-0">
      <Link href="/" className="flex gap-2 flex-center">
        {/* app logo */}
        <Image
          src={logo}
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Prompt Search</p>
      </Link>

      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5 ">
            <Link 
            href="/create-prompt" 
            className="black_btn">
               Create Post
            </Link>

            <button 
            type='button' 
            onClick={signOut} className="outline_btn">
              Sign Out{" "}
            </button>

            <Link href="/profile">
            <Image
              src={profIcon}
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
                  onClick={() => signIn(provider.id)}
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
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src={profIcon}
              className="rounded-full"
              height={37}
              width={37}
              alt="profile"
              onClick={handleToggleDropDown} //recommended way to toggle state to prevent unpredictability
            />
            {toggleDropDown && (
                <div className="dropdown">
                    <Link href='/profile'
                    className="dropdown_link"
                    onClick={()=>setToggleDropDown(false)}>
                        My Profile
                    </Link>
                    <Link href='/create-prompt'
                    className="dropdown_link"
                    onClick={()=>setToggleDropDown(false)}>
                        Create Prompt
                    </Link>
                    <button 
                    type="button"
                    className="mt-5 w-full black_btn" 
                    onClick={()=>{
                        setToggleDropDown(false)
                        signOut();
                    }
                        }> 
              Sign Out{" "}
            </button>

                </div>
            )
            }
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
                  Sign In with
                  {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
