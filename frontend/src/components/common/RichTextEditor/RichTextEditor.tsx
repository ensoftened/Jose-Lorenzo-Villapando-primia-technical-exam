import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageCompress from "quill-image-compress";
import "react-quill/dist/quill.snow.css"; // import the styles
import { Div } from "@common/Div/Div";
import { addWidthToImages } from "@utils/addWidthToImages";
import { useRichTextEditor } from "./useRichTextEditor";
import { SDiv, SLabel, STextArea } from "./richTextEditor.style";
Quill.register("modules/imageCompress", ImageCompress);

const RichTextEditor = (props: any) => {
  const {
    disabled,
    error,
    loading,
    onChange,
    startAdornment,
    style,
    value,
    name,
    placeholder,
    defaultValue,
    label,
    rows,
    size,
    clearable,
  } = props;

  const {
    stateValue,
    setStateValue,

    isEyeButtonOnMouseOVer,
    setIsEyeButtonOnMouseOver,
    isEyeButtonOnMouseDown,
    setIsEyeButtonOnMouseDown,
    isClearButtonOnMouseOver,
    setIsClearButtonOnMouseOver,

    focused,
    setIsFocused,
    isMouseOver,
    setIsMouseOver,

    textEditorRef,
    labelRef,

    handleChange,
    handleFocus,
    handleBlur,
    handleMouseOver,
    handleMouseLeave,
    handleEyeButtonMouseOver,
    handleEyeButtonMouseLeave,
    handleEyeButtonMouseDown,
    handleEyeButtonMouseUp,
    handleClearButtonClick,
    handleClearButtonMouseOver,
    handleClearButtonMouseLeave,
  } = useRichTextEditor(props);

  const controlled: boolean = value !== undefined ? true : false;

  const Font = Quill.import("formats/font");

  Font.whitelist = ["sans-serif", "serif", "monospace", "cursive"];

  // Customize the Quill editor options
  const quillModules = {
    imageCompress: {
      quality: 0.6, // default
      imageType: "image/jpeg", // default
      debug: true, // default
    },
    toolbar: [
      [{ header: [2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      // [{ font: Font.whitelist }],
      ["link", "image"],
      ["clean"],
      [{ color: [] }],
    ],
  };

  // Customize Quill editor formats
  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "color",
  ];

  // Handle changes in the editor content

  return (
    <div style={{ width: "100%" }}>
      {" "}
      <SDiv>
        {/* LABEL / PLACEHOLDER */}

        <STextArea
          $disabled={disabled}
          $error={error}
          $focused={focused}
          $loading={loading}
          $mouseOver={isMouseOver}
          $startAdornment={startAdornment}
          $value={controlled == true ? value : stateValue}
          $size={size}

          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <ReactQuill
            ref={textEditorRef}
            theme="snow" // or 'bubble' for a bubble theme
            value={controlled == true ? value : stateValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Write something amazing..."
          />
        </STextArea>

        <SLabel
          $disabled={disabled}
          $loading={loading}
          $focused={focused}
          $value={controlled == true ? value : stateValue}
          $error={error}
          $startAdornment={startAdornment}
          $size={size}
          ref={labelRef}
          onClick={handleFocus}
          onBlur={handleBlur}
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          {label}
        </SLabel>
      </SDiv>
      {/* <div style={{ width: "50%", backgroundColor: "pink" }}>
        <div
          dangerouslySetInnerHTML={{
            __html: addWidthToImages(value, "300"),
          }}
        />
      </div> */}
      {/* <div style={{ width: "100%",}}>
        <div
          dangerouslySetInnerHTML={{
            __html: addWidthToImages(value, "300"),
          }}
        />
      </div> */}
    </div>
  );
};

RichTextEditor.defaultProps = {
  loading: false,
  placeholder: "",
  label: "Hey",
  rows: 4,
  size: "small",
};

export default RichTextEditor;
