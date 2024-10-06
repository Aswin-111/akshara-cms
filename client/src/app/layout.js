"use client"; // Add this line to mark the component as a Client Component

import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation"; // Import useRouter
import { useSearchParams } from 'next/navigation'
import img from "../../public/img.png";
import { useEffect } from "react";

// export const metadata = {
//   title: "Akshara cms",
//   description: "Akshara's official cms server",
// };

export default function RootLayout({ children }) {
  const router = useRouter(); 



const path = usePathname()

  return (
    <html lang="en">
      <body className="overflow-hidden">
        <div className="w-full h-screen flex ">
          <div className="w-[20%] h-full shadow-2xl shadow-black flex flex-col items-center ">
            <Image src={img} alt = "Akshara logo"/>

            <div className="flex flex-col items-center px-5 w-full mt-11 ">
              <div
                className={`${ 
                  path === "/" 
                
                
                
                  
                
                  
                  
                  


                  
                  
                  
                
                  || path.includes("/gallery") || path ==="/device"
                    ? "bg-[#72AE64] w-full py-4 flex justify-center text-white rounded-[0.5rem] text-[1rem] font-semibold cursor-pointer"
                    : " w-full py-4 flex justify-center text-black rounded-[0.5rem] text-[1rem] font-semibold cursor-pointer"
                }`}
                onClick={() => router.push("/")} // Use router.push for navigation
              >
                Gallery
              </div>
              <div
                className={`${
                  path === "/devices"
                    ? "bg-[#72AE64] w-full py-4 flex justify-center text-white rounded-[0.5rem] text-[1rem] font-semibold cursor-pointer"
                    : " w-full py-4 flex justify-center text-black  text-[1rem]    font-semibold       cursor-pointer"
                }`}
                onClick={() => router.push("/devices")} // Use router.push for navigation
              >
                Devices
              </div>
              <div
                className={`${
                  path === "/contents"
                    ? "bg-[#72AE64] w-full py-4 flex justify-center text-white rounded-[0.5rem] text-[1rem] font-semibold cursor-pointer"
                    : " w-full py-4 flex justify-center text-black  text-[1rem] font-semibold cursor-pointer"
                }`}
                onClick={() => router.push("/contents")} // Use router.push for navigation
              >
                Contents
              </div>
            </div>
          </div>

          <div className="w-[80%] h-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
