"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import AddGallery from "./pages/AddGallery";
import useStore from "./store";
import axios from "axios";
import closebtn from "../../public/close-button.png";
import DeleteGallery from "./pages/DeleteGallery";
export default function Home() {
  const [devicetoggle,setDeviceToggle] = useState({toggle:false,id : 0})
  const [deletegallery,setGalleryDelete] = useState({toggle:false,id : 0})

  const { addgallerytoggle, setAddGallery, successtoasttoggle,cardData,setCard } = useStore();
  const router = useRouter()
  useEffect(() => {
    (async function () {
    




      console.log(process.env.NEXT_PUBLIC_BASE_URL,'NEXT BASE')
      const results = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/showgallery`);

      console.log(results.data.data);
      const data = results.data.data;

      setCard(data);
    })();
  }, [addgallerytoggle,deletegallery])
  return (
    <div className="w-[100%]">
      {/* Navbar */}

      <div className="flex justify-between mt-10 px-10">
        <div></div>

        <div
          className={`${
            addgallerytoggle === false
              ? "px-7 py-3 bg-green-500 rounded-xl font-medium text-white cursor-pointer"
              : "px-7 py-3 bg-slate-400 rounded-xl font-medium text-white cursor-pointer"
          }`}
          onClick={() => {
            if (!addgallerytoggle) {
              setAddGallery(true);
            }
          }}
        >
          Add
        </div>
      </div>

      {/* navbar */}

      {/* Main page */}
      
      { deletegallery.toggle &&
<div className="relative z-50 max-w-[100vw] h-[100vh] flex justify-center items-center">
   {deletegallery.toggle && <DeleteGallery deletegallery = {deletegallery} setGalleryDelete={setGalleryDelete} />}
   </div>
}
{addgallerytoggle && 
      <div className="relative z-30 h-[100vw]">
        {addgallerytoggle && <AddGallery />}
      </div>
}

{successtoasttoggle && <Toaster />}

      <div className="w-[100vw] max-h-[100%] flex flex-wrap  px-10 mt-10 gap-10 overflow-scroll">
        {cardData.map((i,key)=>{
          return (
          <div key={key} className="w-[10rem] text-xl font-semibold h-[10rem] rounded-xl bg-[#bebdbd] flex items-center justify-center relative" 
          
          onMouseOver= {()=>{
            setDeviceToggle({toggle : true, id : key})
          }

          
  
        }

      onMouseLeave={()=>{
        setDeviceToggle({toggle : false, id : 0 })
      }}
          >
            {devicetoggle.toggle && devicetoggle.id === key && <div className="absolute top-1 right-1">
  <Image src = {closebtn} alt = "close btn" className="w-10 h-10 cursor-pointer" onClick = {()=>{
    
  
    setGalleryDelete({toggle : true, id : key, gallery : i.id})
  }}/>


</div>
            }
              {/* {selectdevicegallerytoggle} */}
              <div className = "cursor-pointer" onClick={()=>{
            router.push(`/gallery/?id=${i.id}`);
          }}>{i.gallery}</div>

            </div>
          )
        })}
      </div>
    </div>
  );
}
