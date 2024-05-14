import React, { useState, useEffect, useRef, useContext } from "react";
import { WHITE_SMOKE } from "../../../constants/palette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUpload,
  faTrash,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  SDiv,
  SImageBoxDiv,
  SLabel,
  SMainDiv,
  SPlaceholderDiv,
  SPlaceholderIcon,
  SPlaceholderText,
  SSecondBoxDiv,
} from "./photoUploader.style";
import { DeviceContext } from "../../../App";
import Button from "../Button/Button";
import usePhotoUploader from "./usePhotoUploader";
import { Div } from "@common/Div/Div";

export type PhotoUploaderProps = {
  onChange: any;
  name: string;
  value: any;
  directory: string;
  error: string;
  message?: string;
  style?: any;
  label?: string;
};

const PhotoUploader = React.forwardRef(
  (props: PhotoUploaderProps, ref: any) => {
    const { onChange, name, value, directory, error, message, style, label } =
      props;

    const {
      //Refs
      secondBoxRef,
      imageBoxRef,
      fileChooserRef,
      //States

      successfulUpload,
      mouseOver,

      //Functions
      handleDragOver,
      handleDragEnd,
      handleFileChoose,
      handleDrop,
      handleRemovePhotoButtonClick,
      handleMouseOver,
      handleMouseLeave,
    } = usePhotoUploader(props);

    // Example usage:
    // useState(currentFile, set)

    const device: string = useContext(DeviceContext);
    //////////////////////////////////////////////////////////console.log  ("PHOTO UPLOADER RENDERED", error)

    // Example usage:
    // useState(onDragOver, set)

    return (
      <Div style={{
        
      }}>
        <SLabel $error={error}>{label}</SLabel>
        <input
          type={"file"}
          style={{ display: "none" }}
          ref={fileChooserRef}
          onChange={handleFileChoose}
        />
        <SMainDiv ref={ref}>
          <SDiv
            $error={error}
            $customStyle={style}
            $device={device}
            $mouseOver={mouseOver}
            onClick={() => fileChooserRef.current.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragEnd}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <SSecondBoxDiv ref={secondBoxRef}>
              <SPlaceholderDiv>
                <SPlaceholderIcon>
                  <FontAwesomeIcon icon={faCloudUpload} />
                </SPlaceholderIcon>
                <SPlaceholderText>
                  {message ? (
                    <span>{message}</span>
                  ) : (
                    <>
                      <span style={{ fontWeight: "bold" }}>Choose a file</span>

                      {device == "B" && <span>{" or drag it here"}</span>}
                    </>
                  )}
                </SPlaceholderText>
                {/* <CloudUploadIcon
                style={{ fontSize: "60px", color: "#a4a4a4", width: "100%" }}
              />
              
              <Typography
                variant={"h4"}
                style={{ fontWeight: "bold", color: "#a4a4a4", width: "100%" }}
              >
                Drag your file/s here
              </Typography> */}
                {/*<Typography variant={"h4"} style={{fontWeight: "bold", color: "#a4a4a4", width: "100%"}}>OR</Typography>*/}
              </SPlaceholderDiv>
            </SSecondBoxDiv>

            <SImageBoxDiv ref={imageBoxRef}></SImageBoxDiv>
          </SDiv>

          {successfulUpload && (
            <Div
              style={{
                margin: "0 auto",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2.5px",
              }}
            >
              <Button
                onClick={handleRemovePhotoButtonClick}
                size={"small"}
                theme={"primary"}
                variant={"text"}
                startAdornment={<FontAwesomeIcon icon={faTrash} />}
              >
                Remove
              </Button>
            </Div>
          )}
        </SMainDiv>
      </Div>
    );
  }
);

PhotoUploader.defaultProps = {
  message: "",
  style: {},
};
export default React.memo(PhotoUploader);
