"use client";

import React, { useRef } from "react";
import axios from "axios";
import useStore from "../store";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import closebtn from '../../../public/close-button.png'
import Image from "next/image";
function AddGallery() {
  const {toast} = useToast()
  const {addgallerytoggle,setAddGallery,setSuccessToast}  = useStore();

  const galleryref = useRef("");


  return (
    <div className="w-full h-[65vh] flex justify-center items-center  ">
      
      <div className="flex flex-col border-2 w-[30%]   h-[60%] rounded-xl">


















<div className="flex justify-between px-3 mt-3 text-xl">
  <div></div><div className="cursor-pointer" onClick={()=>{
    setAddGallery(false);
  }}><Image src = {closebtn} alt = "close btn" className="w-10 h-10"/></div>
</div>
  
  
  
  <div className="flex flex-col px-10">  <input
          placeholder="Gallery"
          type="text"
          ref={galleryref}
          className="py-3 px-3 mt-11 rounded-xl border-2 border-[#818181] outline-green-500"
        />


        <input
          type="button"
          value="Add"
        
        onClick = {()=>{



          
          (async ()=>{
          
            try{
              const gallery = galleryref.current.value
              
              console.log(gallery)
              const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/addgallery`,{
                gallery
              })
          

              console.log(response)

              
              

              

              if(response.data.status === "success"){

              




                
              
                
                
                const data = response.data.data
                
              
              toast({
                description: data
              })

              
            
            

            


              
              
              
              
              
              
              
              
              
              
              galleryref.current.value = ""

              
            }

            
            
          





          



            else{
              toast({
                description: response.data.data,
              })
            }
            }
            catch(err){
              console.log("Error ",err);
            }
          })()
        }}
          className="py-3 px-3 mt-10 cursor-pointer text-white font-medium rounded-xl bg-green-500"
       />


       </div>

      
      
      </div>
      

      <Toaster />
    </div>
  );
}

export default AddGallery;
