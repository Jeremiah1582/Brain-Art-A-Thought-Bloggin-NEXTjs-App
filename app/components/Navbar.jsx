"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import {signIn, signOut, useSession} from 'next-auth'
import logo from "app/public/assets/images/grid.svg"
function Navbar() {
  return (
    <nav className="flex-between w-full mb-16 pt-3">Navbar
    
    <Link 
        href="/" 
        className="flex gap-2 flex-center"/>
        <Image 
        src="https://th.bing.com/th/id/R.572e4f51d0a4d67669784df53026b5a7?rik=lv9i04y8yl33Dg&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f3%2f33%2fVanamo_Logo.png&ehk=Ix3NOUWRAegY6L3gmUWwTNm0Gee%2faq3jB0ZwGhiKFRk%3d&risl=&pid=ImgRaw&r=0"
        alt="logo"
        width={30}
        height={30}
        className="object-contain"
        />
    </nav>
  )
}

export default Navbar