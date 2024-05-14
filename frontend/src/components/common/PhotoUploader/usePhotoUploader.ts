import { useEffect, useCallback, useMemo, useContext, useState, useRef } from "react";
import { PhotoUploaderProps } from "./PhotoUploader";
import isObjectEmpty from "@utils/isObjectEmpty";


const usePhotoUploader = (props: PhotoUploaderProps) => {
    
    const {
        onChange,
        value,
        directory,
        name
    } = props

    const [currentFile, setCurrentFile] = useState<any>(null);
    const [successfulUpload, setSuccessfulUpload] = useState<boolean>(false);
    const [ mouseOver, setMouseOver ] = useState(false)

    
  const secondBoxRef = useRef<any>();
  const imageBoxRef = useRef<any>();
  const fileChooserRef = useRef<any>();

  const handleDragOver = (event:any) => {
    ////////////////////////////////////////////////////////////console.log("ON DRAG OVER")
    event.preventDefault();
    secondBoxRef.current.style.border = "2px dashed #c4c4c4";
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("DRAGGED OVER")
  };
  const handleDragEnd = (event: any) => {
    ////////////////////////////////////////////////////////////console.log("ON DRAG END")
    event.preventDefault();
    secondBoxRef.current.style.border = "none";
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("DRAGGED OVER")
  };

  const handleFileChoose = (event: any) => {
    ////////////////////////console.log("CHOOSE", event)
    event.preventDefault();
    const file = event.target.files[0];
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  (event.dataTransfer.files)

   
    if(file!=null) {
      setCurrentFile(file)
      onChange(file, name);
    }

  }

  const handleDrop = (event: any) => {
    ////////////////////////////////////////////////////////////console.log("ON DRAG DROP")
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setCurrentFile(file)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  (event.dataTransfer.files)

    


    onChange(file, name);
  };

  const handleRemovePhotoButtonClick = () => {
    ////////////////////////console.log("FILE CHOOSER REF", fileChooserRef)
    fileChooserRef.current.value = null
    setSuccessfulUpload(false)
    setCurrentFile(null)
    onChange({}, name);
    ////////////////////////////////////////////////////console.log("handleRemovePhotoButtonClick")
    secondBoxRef.current.style.display = "flex";
    imageBoxRef.current.style.display = "none";
  

  }

  const handleMouseOver = () => {
    setMouseOver(true)
  }
  const handleMouseLeave = () => {
    setMouseOver(false)
  }

  useEffect(() => {
    ////////////////////////console.log("USE EFFECT", value)
    if(value instanceof File == true) {
        //////////////////////console.log("1")
        //console.log("CURRENTFILE", currentFile)
        if(currentFile != null) {
          //////////////////////console.log("USE EPEKS PO")
          secondBoxRef.current.style.border = "none";
          secondBoxRef.current.style.display = "none";
      
          imageBoxRef.current.style.display = "block";
          imageBoxRef.current.style.backgroundImage =
            "url(" + URL.createObjectURL(currentFile) + ")";
            
          setSuccessfulUpload(true)

        }

    } else {
        //////////////////////console.log("ELSA")

        setCurrentFile(null)
        secondBoxRef.current.style.display = "flex";
        imageBoxRef.current.style.display = "none";

        setSuccessfulUpload(false)
    
    }

  }, [value])

  useEffect(() => {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("VALUE", value)
    if (isObjectEmpty(value) == false && value!="") {
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("YES VALUE", value)

      const newValue = encodeURI(value);
      const backgroundImageUrl =
        process.env.NODE_ENV == "production"
          ? "url(" +
            process.env.REACT_APP_PUBLIC_USER_IMAGE_URL +
            "/" +
            newValue +
            ")"
          : "url(" +
            process.env.REACT_APP_SERVER_URL +
            directory +
            "/" +
            newValue +
            ")";

      //////////////////////console.log  ("BCKGRND",backgroundImageUrl)
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log  ("newValue", newValue)
      secondBoxRef.current.style.display = "none";
      imageBoxRef.current.style.backgroundImage = backgroundImageUrl;
      imageBoxRef.current.style.backgroundColor = "#fff";
      imageBoxRef.current.style.display = "block";
    }
  }, []);

    
    return {
        //Refs
        secondBoxRef,
        imageBoxRef,
        fileChooserRef,
        //States
        currentFile, setCurrentFile,
        successfulUpload, setSuccessfulUpload,
        mouseOver, setMouseOver,


        //Functions
        handleDragOver,
        handleDragEnd,
        handleFileChoose,
        handleDrop,
        handleRemovePhotoButtonClick,
        handleMouseOver,
        handleMouseLeave,
    }
    
}

export default usePhotoUploader