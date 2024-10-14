"use client";

import React, { useEffect, useState } from "react";
import useStore from "../store";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation'

function SelectDevices() {
    const [galleryId,setGalleryId] = useState(0)
    const [tog,setTog] = useState(false)
    const { selectdevicesofgallery, setSelectDevicesOfGallery , selectdevicegallerytoggle, setSelectDeviceGalleryToggle } = useStore();
    const {toast} = useToast()
    const router = useRouter()
    const data = useSearchParams()











    useEffect(()=>{
      
      
      const galleryid = data.get("id");

      setGalleryId(Number(galleryid));

      
      
      
  
    (async ()=>{
      try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/checkavailability`)
        
        
        
        console.log(response.data.data);
        
        setSelectDevicesOfGallery(response.data.data);
      }
      catch(err){
        console.log(err)
      }
      
    })()
  },[tog])
  return (
    <div className="w-[100vw] max-h-[100%] flex flex-wrap  px-10 mt-10 gap-10 overflow-scroll">
     
     
     






     
     {selectdevicesofgallery && selectdevicesofgallery.map((i,key)=>{
      
      return (
      



        
        
      
        
        
        <div key = {key} className="w-[10rem] bg-[#bebdbd]  h-[10rem] font-semibold flex justify-center items-center text-xl rounded-xl cursor-pointer" onMouseOver={(e)=>{
          setSelectDeviceGalleryToggle(true,key)
        }}
        
        
        onMouseLeave={(e)=>{
          setSelectDeviceGalleryToggle(false)
        }}
        >
         {selectdevicegallerytoggle.toggle && selectdevicegallerytoggle.id === key  ? <button className="px-5 py-2 rounded-xl font-medium text-white text-sm bg-[#72ae64]" onClick = {(e)=>{
          (async function (){
            try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/adddevicetogallery`, {gallery : galleryId, device : i.id})
            console.log(response.data.status,"response adding the device")
            if(response.data.status === "success"){
              setTog(!tog)
            }
            }
            catch(e){
              console.log(e)
            }
          } 
        )()
         }}>Add</button> :`${i.device}`  }
          </div>

      )
     })}

   
    </div>
  );
}

export default SelectDevices;
