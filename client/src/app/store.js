import { create } from 'zustand'

const useStore = create((set) => ({
  addgallerytoggle : false,
  setAddGallery: (gallerytog) => set((state) => ({ addgallerytoggle: gallerytog
   })),
    

   adddevicetoggle : false,
  
   setAddDevice : (devicetog) => set((state) => ({ adddevicetoggle: devicetog})),
   
   selectdevice : false,
  
   
   setSelectDevice : (selectdevicetog) => set((state) => ({ adddevicetoggle: devicetog})),
   
   selectdevices: false,
  
   
   setSelectDevice: (selectdevicetog) => set((state) => ({ selectdevices: selectdevicetog})),
   

   successtoasttoggle : false,
  
   setSuccessToast : (successtog) => set((state) => ({ successtoasttoggle : successtog
   })),



   cardData : [],
  
   
   
   setCard: (carddata) => set((state) => ({ cardData : [...carddata],
   })),
  
   
    galleryData:[],
    setGalleryData : (gallerydata) => set((state) => ({ galleryData : [...gallerydata]})),
   
    devicesOfGallery:[],
    setDevicesOfGallery : (devicesofgallery) => set((state) => ({ devicesofgallery : [...devicesofgallery]})),
   
    devicesData:[],
    setDevicesData : (devicedata) => set((state) => ({ devicesData : [...devicedata]})),
   
    selectdevicesofgallery:[],
    setSelectDevicesOfGallery : (deviceofgallery) => set((state) => ({ selectdevicesofgallery : [...deviceofgallery]})),
   
    selectdevicegallerytoggle : {toggle : false,id : 0},
  
    
    setSelectDeviceGalleryToggle : (tog,id) => set((state) => ({ selectdevicegallerytoggle : {toggle:tog,id}
   })),
}))

export default useStore;