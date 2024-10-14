"use client";

import React, { useRef } from "react";
import useStore from "../store";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";



import closebtn from '../../../public/close-button.png'
import { useRouter } from "next/navigation";
function AddDevices() {
  
  const { addgallerytoggle, setAddDevice } = useStore();
  const {toast} = useToast()

  const router = useRouter()
  
  const deviceref = useRef("")
  const ipref = useRef("");

  return (
    <div className="w-full h-[65vh] flex justify-center   ">
      <div className="flex flex-col border-2 w-[30%]   h-[80%] rounded-xl">
        <div className="flex justify-between px-2 mt-3 text-xl">
          <div></div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setAddDevice(false);
            }}
          >
             <Image src = {closebtn} alt = "close btn" className="w-10 h-10 opacity-65"/>

          </div>
        </div>

        <div className="flex flex-col px-10">
          {" "}
          <input
            placeholder="Device"
            type="text"
           


            ref = {deviceref}
            className="py-3 px-3 mt-11 rounded-xl border-2 border-[#818181] outline-green-500"
          />
          <input
            type="text"
            placeholder="IP Address"
            ref={ipref}
            className="py-3 px-3 border-2 border-[#818181] outline-green-500 rounded-xl mt-7"
          />
          <input
            type="button"
            value="Add"
            className="py-3 px-3 mt-10 text-white font-medium rounded-xl bg-green-500"
            onClick={()=>{
              
              
              (async ()=>{

                try{
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/adddevices`,{
                  
                  ip:ipref.current.value,
                  
                  device:deviceref.current.value
                })
                console.log(response)
                if(response.data.status === "success"){
                  toast({
                    description: response.data.data
                  })
                  ipref.current.value = ""
                  deviceref.current.value = ""
                }
              }




























































              
              
            
              catch(err){
                console.log(err)
              }
              })()
              
              
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AddDevices;
