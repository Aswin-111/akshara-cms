"use client"
import Image from "next/image";

import useStore from "../store";
import AddDevices from "../pages/AddDevices";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import axios from "axios";
import closebtn from "../../../public/close-button.png";
import DeleteDe from "../pages/DeleteDe";
import SelectTopics from "../pages/SelectTopics";
import Del from "../pages/Del";
export default function Home() {
  const [devicetoggle, setDeviceToggle] = useState({ toggle: false, id: 0 });

  const [devicedelete, setDeviceDelete] = useState({ toggle: false, id: 0 });

  const { adddevicetoggle, setAddDevice, devicesData, setDevicesData } = useStore();
 const [contentdata,setContentData] = useState([])
 const [selecttopics,setSelectTopics] = useState(false)



 const [successtoasttoggle,setSuccess] = useState(false)

  
 

 


  useEffect(() => {
    (async function () {
      
      
      const deviceid = window.location.href.split("?")[1].split("=")[1]
      console.log(deviceid,"deviceid")
      const topicids = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/get-topics`,{id : deviceid});
      const topics = await axios.get("https://aksharammuseum.com/api/DataEntry1/getMainComplete?dtId=1");

    
    

    console.log(topicids,'topicid')
    console.log(topics,'topics');

    if(topicids.data.topics.length > 0){


    
      const filtopics = topics.data.filter(i=>topicids.data.topics.includes(i.commonId))

      console.log(filtopics,'fil')
    setContentData([...filtopics])

    }
    })();
  }, [ devicedelete]);
  return (
    <div className="w-[100%] max-h-[100vh] ">
  
    <div className="w-[100%]">
      {/* Navbar */}

      <div className="flex justify-between mt-10 px-10">
        <button
          onClick={(e) => {
            router.push("/");
          }}
          className="px-7 py-3 bg-black text-white flex justify-center items-center rounded-xl"
        >
          Back
        </button>

        <button
          className={`${
            selecttopics === false
              ? "px-7 py-3 bg-green-500 cursor-pointer rounded-xl font-medium text-white"
              : "px-7 py-3 bg-red-500 rounded-xl font-medium text-white cursor-pointer"
          }`}
          onClick={() => {
            setSelectTopics(!selecttopics);
          }}
        >
          {selecttopics ? "Close" : "Add"}
        </button>
      </div>

      {/* navbar */}

      {/* Main page */}

      {devicedelete.toggle && (
        <div className="relative z-50 max-w-[100vw] h-[100vh] flex justify-center items-center">
          {devicedelete.toggle && (
            <Del

              devicedelete={devicedelete}
              setDeviceDelete={setDeviceDelete}
            />
          )}
        </div>
      )}

      {selecttopics && (
        <div className="fixed z-50 max-w-[100vw] max-h-[100vh] px-10 overflow-scroll">
          {selecttopics && <SelectTopics />}
        </div>
      )}

      {successtoasttoggle && <Toaster />}

      <div className="w-[100vw] max-h-[100%] flex flex-wrap  px-10 mt-10 gap-10 overflow-scroll">
        { contentdata && contentdata.map((i, key) => {
          return (
            <div
              key={key}
              className="w-[10rem] shadow-xl text-xl font-semibold h-[10rem] rounded-xl bg-[#bebdbd] flex items-center justify-center relative cursor-pointer"
              onMouseOver={() => setDeviceToggle({ toggle: true, id: key })}
              onMouseLeave={() => setDeviceToggle({ toggle: false, id: 0 })}
            >
              {devicetoggle.toggle && devicetoggle.id === key && (
                <div
                  className="absolute top-1 right-1"
                  onClick={() => {
                    setDeviceDelete({ toggle: true, id : i.commonId });
                  }}
                >
                  <Image
                    src={closebtn}
                    alt="close btn"
                    className="w-10 h-10 cursor-pointer"
                  />
                </div>
              )}

              <div className="text-[0.4rem]"
                onClick={() => {
                  router.push(`/device/?id=${i.id}`);
                }}
              >
                {i.title}
              </div>
            </div>
          );
        })}
      </div>
   

    </div>
    

    </div>
  );
}
