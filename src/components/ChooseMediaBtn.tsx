import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import {
  defaultBackgroundColor,
  primaryColor,
} from "../configs/palette";

export const ChooseMediaBtn: React.FC = (): React.ReactElement => {
  const [pic, setPic] = useState<string[][]>([]);
  const onDrop = (files: File[], picture: string[]) => {
    console.log(files);
    setPic([...pic, picture]);
    console.log(picture);
  };
  return (
    <div>
      <ImageUploader
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
          height: 40,
          padding: 0,
          width: "100%",
          fontSize: 12,
          boxShadow: "0px 4px 10px rgba(5, 0, 255, 0.06)",
        }}
        errorStyle={{ position: "absolute", left: 0, top: 44 }}
        fileContainerStyle={{ boxShadow: "none", margin: 0, padding: 0 }}
        imgExtension={[".jpg", ".gif", ".png"]}
        maxFileSize={5242880}
      />
    </div>
  );
};
