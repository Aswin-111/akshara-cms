"use client";

import React, { useRef } from "react";
import useStore from "../store";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import closebtn from "../../../public/close-button.png";
import Image from "next/image";

function DeleteDevice({ devicedelete, setDeviceDelete }) {

  const { toast } = useToast();

  return (
    <div className="w-full h-[65vh] flex justify-center   ">
      <div className="flex flex-col border-2 w-[40%] h-[50%] rounded-xl">
        <div className="flex justify-between px-2 mt-2 text-xl">
          <div></div>
          <Image
            src={closebtn}
            alt="close btn"
            className="w-10 h-10"
            onClick={() => {
              setDeviceDelete({ toggle: false, id: 0 });
            }}
          />
        </div>

        <div className="flex flex-col px-10">
        

          <div className="text-xl flex justify-center mt-6">
            Are you sure you want to delete this device
          </div>
          <div className="w-full flex justify-between">
            <input
              type="button"
              value="Delete"
              className="py-3 px-7 mt-10 text-white font-medium rounded-xl bg-green-500"
              onClick={() => {
                (async () => {
                  const response = await axios.post(
                   `${process.env.NEXT_PUBLIC_BASE_URL}/deletedevicefromgallery`,
                    {
                      device: devicedelete.id,
                    }
                  );
                  console.log(response,"response from server");
                  if (response.data.status === "success") {
                    toast({
                      description: response.data.data,
                    });
                    setDeviceDelete({ toggle: false, id: 0 });
                  }
                })();
              }}
            />
            <input
              type="button"
              value="Cancel"
              className="py-3 px-7 mt-10 text-white font-medium rounded-xl bg-red-500"
              onClick={() => {
                setDeviceDelete({ toggle: false, id: 0 });

              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteDevice;
