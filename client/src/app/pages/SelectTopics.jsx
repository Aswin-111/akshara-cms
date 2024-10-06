"use client";

import React, { useEffect, useState } from "react";
import useStore from "../store";
import axios from "axios";
import { useSearchParams } from "next/navigation";

function SelectTopics() {
    const [deviceId,setDeviceId] = useState(0)
    const [contentData,setContentData] = useState([])
    const [tog,setTog] = useState(false)
    const { selectdevicesofgallery, setSelectDevicesOfGallery , selectdevicegallerytoggle, setSelectDeviceGalleryToggle } = useStore();
    const data = useSearchParams()











    useEffect(()=>{
      
      
      const deviceid = data.get("id");

      setDeviceId(Number(deviceid));

      
      
    

      
  
    (async ()=>{
      (async function () {
        const results = await axios.get("https://aksharammuseum.com/api/DataEntry1/getMainComplete?dtId=1");
  
      // console.log(results.data[0].backgroundImgList[0].bgUrl);
      const data = results.data
      console.log(data,'data');

      console.log(data[0].commonId)
      setContentData([...data])
      })();
        
        
        // console.log(response.data.data);
        
        // setSelectDevicesOfGallery(response.data.data);
      
    })()
  },[tog])
  return (
    <div className="w-[100vw] max-h-[90%] bg-white flex flex-wrap mt-3    gap-10 ">
     
     
     






     
     {contentData && contentData.map((i,key)=>{
      
      return (
      



        
        
      
        
        
        <div key = {key} className="w-[10rem] bg-[#bebdbd]  h-[10rem] font-semibold flex justify-center items-center text-[0.5rem] rounded-xl cursor-pointer" onMouseOver={(e)=>{
          setSelectDeviceGalleryToggle(true,key)
        }}
          
        
        onMouseLeave={(e)=>{
          setSelectDeviceGalleryToggle(false)
        }}
        >
         {selectdevicegallerytoggle.toggle && selectdevicegallerytoggle.id === key  ? <button className="px-5 py-2 rounded-xl font-medium text-white text-sm bg-[#72ae64]" onClick = {(e)=>{
          (async function (){

            try{
              console.log('topic id :',i.commonId,deviceId ,process.env.NEXT_PUBLIC_BASE_URL)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/add-content`, {id : deviceId, newTopics : [i.commonId]})
            console.log(response.data,"response adding the device")
            if(response.data.status === "success"){
              setTog(!tog)
            }
            }
            catch(e){
              console.log(e,'select topic')
            }
          } 
        )()
         }}>Add</button> :`${i.title}`  }
          </div>

      )
     })}

   
    </div>
  );
}

export default SelectTopics;
