import React from "react";
import Gallery from "react-photo-gallery";
import { isMobile } from "../configs/device";

export const MediaPreview = ({ mediaUrls }: { mediaUrls: string[] }) => {
  return (
    <div
      style={{
        width:
          !isMobile && mediaUrls.length < 3
            ? `${mediaUrls.length * 30}%`
            : "100%",
        marginTop: 25,
      }}
    >
      <Gallery
        targetRowHeight={200}
        columns={3}
        photos={mediaUrls.map((file) => ({
          src: file,
          sizes: "(min-width: 36em) calc(.333 * (100vw - 12em)), 100vw",
          width: 1,
          height: 1,
        }))}
      />
    </div>
  );
};
