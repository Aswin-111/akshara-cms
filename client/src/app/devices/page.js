"use client"
import Image from "next/image";
import { usePathname,useRouter } from "next/navigation";
import useStore from "../store";
import AddDevices from "../pages/AddDevices";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import axios from "axios";
import closebtn from "../../../public/close-button.png";
import DeleteDe from "../pages/DeleteDe";
export default function Home() {
  const [devicetoggle, setDeviceToggle] = useState({ toggle: false, id: 0 });

  const [devicedelete, setDeviceDelete] = useState({ toggle: false, id: 0 });

  const {adddevicetoggle,setAddDevice,devicesData,setDevicesData}  = useStore();

const path = usePathname()
const router = useRouter()





useEffect(() => {
  (async function () {
    const results = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/showdevices`);

    console.log(results.data.data);
    const data = results.data.data;

    setDevicesData(data);
  })();
}, [adddevicetoggle,devicedelete]);
  return (
    <div className="w-[100%]  max-h-[100vh] overflow-scroll">
      {/* Navbar */}
      

      <div className="flex justify-between mt-10 px-10">
        
       

       <div></div>
       
       
       
       
       
       <div className = { `${adddevicetoggle === false ? "px-7 py-3 bg-green-500 rounded-xl font-medium text-white" : "px-7 py-3 bg-slate-400 rounded-xl font-medium text-white"}`} onClick = {()=>{if(!adddevicetoggle){setAddDevice(true)}}}>Add</div>
      </div>

      {/* navbar */}




    



    



    
      {adddevicetoggle &&
<div className="relative z-50 h-[100vh] flex justify-center items-center">
     <AddDevices/>
   
    <Toaster/>
   </div>
}





















{devicedelete.toggle && (
        <div className="relative z-50 max-w-[100vw] h-[100vh] flex justify-center items-center overflow-scroll">
          {devicedelete.toggle && (
            <DeleteDe
              devicedelete={devicedelete}
              setDeviceDelete={setDeviceDelete}
            />
          )}
        </div>
      )}
  

   <div className="w-[100vw] max-h-[100vh] flex flex-wrap  px-10 mt-10 gap-10 overflow-scroll">
        {devicesData.map((i,key)=>{
          return (
            <div
              key={key}
              className="w-[10rem] shadow-xl text-xl font-semibold h-[10rem] rounded-xl bg-[#bebdbd] flex items-center justify-center relative"
              onMouseOver={() => setDeviceToggle({ toggle: true, id: key })}
              onMouseLeave={() => setDeviceToggle({ toggle: false, id: 0 })}
            >
              {devicetoggle.toggle && devicetoggle.id === key && (
                <div
                  className="absolute top-1 right-1"
                  onClick={() => {
                    setDeviceDelete({ toggle: true, id: i.id });
                  }}
                >
                  <Image
                    src={closebtn}
                    alt="close btn"
                    className="w-10 h-10 cursor-pointer"
                  />
                </div>
              )}

              <div
                onClick={() => {
                  router.push(`/device/?id=${i.id}`);
                }}
              >
                <div className="cursor-pointer">{i.device}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
