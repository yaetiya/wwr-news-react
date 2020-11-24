import React from "react";
import ImageUploader from "react-images-upload";
import { isMobile } from "../../configs/device";
import {
  defaultBackgroundColor,
  defaultErrorColor,
  primaryColor,
} from "../../configs/palette";

export const ChooseMediaBtn = ({ mediaHandler }: { mediaHandler: any }) => {
  const onDrop = (files: File[], picture: string[]) => {
    if (picture.length !== 0) {
      mediaHandler(files, picture);
    }
  };
  return (
    <div>
      <ImageUploader
        // singleImage
        withIcon={false}
        withLabel={false}
        buttonText="Media"
        onChange={onDrop}
        buttonStyles={{
          backgroundColor: defaultBackgroundColor,
          color: primaryColor,
          fontWeight: "bold",
          border: "2px solid " + primaryColor,
          borderRadius: 2,
          margin: 0,
          marginBottom: isMobile ? 40 : 0,
          height: 40,
          padding: 0,
          width: "100%",
          fontSize: 12,
          boxShadow: "0px 4px 10px rgba(5, 0, 255, 0.06)",
        }}
        errorStyle={{
          position: "absolute",
          left: 0,
          top: 50,
          zIndex: 2,
          padding: 3,
          borderRadius: 2,
          backgroundColor: defaultErrorColor,
          color: defaultBackgroundColor,
        }}
        fileContainerStyle={{
          boxShadow: "none",
          margin: 0,
          padding: 0,
        }}
        imgExtension={[".jpg", ".gif", ".png"]}
        maxFileSize={5242880}
      />
    </div>
  );
};
