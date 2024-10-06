"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import useStore from "../store";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SelectDevices from "../pages/SelectDevices";
import DeleteDevice from "../pages/DeleteDevice";
import closebtn from "../../../public/close-button.png";
export default function GalleryDetails() {
  const [devicetoggle, setDeviceToggle] = useState({ toggle: false, id: 0 });

  const [devicedelete, setDeviceDelete] = useState({ toggle: false, id: 0 });

  const router = useRouter();

  const data = useSearchParams();

  const {
    successtoasttoggle,
    galleryData,
    setGalleryData,
    selectdevices,
    setSelectDevice,
  } = useStore();

  useEffect(() => {
    const galleryid = data.get("id");
    (async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/showdevicesofgallery`,
        { galleryid }
      );

      setGalleryData(response.data.data);
      console.log(response.data);
    })();
  }, [devicedelete, selectdevices]);
  return (
    <div className="w-[100%]">
      {/* Navbar */}

      <div className="flex justify-between mt-10 px-10">
        <button
          onClick={(e) => {
            router.push("/");
          }}
          className="px-7 py-3 bg-black text-white flex justify-center items-center rounded-xl "
        >
          Back
        </button>

        <button
          className={`${
            selectdevices === false
              ? "px-7 py-3 bg-green-500 cursor-pointer rounded-xl font-medium text-white"
              : "px-7 py-3 bg-red-500 rounded-xl font-medium text-white cursor-pointer"
          }`}
          onClick={() => {
            setSelectDevice(!selectdevices);
          }}
        >
          {selectdevices ? "Close" : "Add"}
        </button>
      </div>

      {/* navbar */}

      {/* Main page */}

      {devicedelete.toggle && (
        <div className="relative z-50 max-w-[100vw] h-[100vh] flex justify-center items-center">
          {devicedelete.toggle && (
            <DeleteDevice
              devicedelete={devicedelete}
              setDeviceDelete={setDeviceDelete}
            />
          )}
        </div>
      )}

      {selectdevices && (
        <div className="relative z-50 max-w-[100vw] h-[100vh]">
          {selectdevices && <SelectDevices />}
        </div>
      )}

      {successtoasttoggle && <Toaster />}

      <div className="w-[100vw] max-h-[100%] flex flex-wrap  px-10 mt-10 gap-10 overflow-scroll">
        {galleryData.map((i, key) => {
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
                {i.device}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
