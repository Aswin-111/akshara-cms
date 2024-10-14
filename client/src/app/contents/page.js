"use client"
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import useStore from "../store";
import AddDevices from "../pages/AddDevices"
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import axios from "axios";
import closebtn from "../../../public/close-button.png";
import DeleteDe from "../pages/DeleteDe";
export default function Home() {
  const [devicetoggle, setDeviceToggle] = useState({ toggle: false, id: 0 });

  const [devicedelete, setDeviceDelete] = useState({ toggle: false, id: 0 });

  const { adddevicetoggle, setAddDevice, devicesData, setDevicesData } = useStore();

  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    (async function () {
      try {
        const results = await axios.get("https://aksharammuseum.com/api/DataEntry1/getMainComplete?dtId=1");

        console.log(results.data[0].backgroundImgList[0].bgUrl);
        const data = results.data

      }
      catch (err) {
        console.log(err)
      }


















      //     const data = results.data.filter(i=>{




      //        try{

      //        return  i.backgroundImgList.length > 0
      //        }
      //        catch(e){






      //         // console.log(e)
      //        }
      //     }
      // )


      console.log(data)
      setDevicesData(data)
    })();
  }, [adddevicetoggle, devicedelete]);
  return (
    <div className="w-[100%] max-h-[100vh] overflow-scroll">
      {/* Navbar */}


      <div className="flex justify-between mt-10 px-10">



        <div></div>





        <div className={`${adddevicetoggle === false ? "px-7 py-3 bg-green-500 rounded-xl font-medium text-white" : "px-7 py-3 bg-slate-400 rounded-xl font-medium text-white"}`} onClick={() => { if (!adddevicetoggle) { setAddDevice(true) } }}>Add</div>
      </div>

      {/* navbar */}













      {adddevicetoggle &&
        <div className="relative z-50 h-[100vh] flex justify-center items-center">
          <AddDevices />

          <Toaster />
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


      <div className="max-w-[100vw]  max-h-[100%] flex flex-wrap  px-10 mt-10 gap-10 overflow-y-scroll">
        {devicesData.map((i, key) => {
          return (
            <div
              key={key}
              className="w-[16rem] shadow-xl text-xl font-semibold h-[10rem] rounded-xl bg-[#bebdbd] flex items-center justify-center relative"
              onMouseOver={() => setDeviceToggle({ toggle: true, id: key })}
              onMouseLeave={() => setDeviceToggle({ toggle: false, id: 0 })}
            >
              {/* <h1>{JSON.stringify(i.backgroundImgList)} this</h1> */}

              {/* {i.backgroundImgList[0] &&  
                <Image src = {String(i.backgroundImgList[0].bgUrl)} alt = "Contents" width={100} />
              
            } */}

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
                {/* bg-[url(${String(i.backgroundImgList[0].bgUrl)})] */}
                <div className={`cursor-pointer  flex justify-center items-center 
                text-[0.7rem]`}>

                  {i.title}


                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
