import { useState, useEffect } from "react";

export default function useVideo(type, hovered) {
  const [typeMedia, setTypeMedia] = useState(type);

  useEffect(() => {
    const mediaTimeOut = setTimeout(() => {
      if (typeMedia === "image" && hovered) {
        setTypeMedia("video");
      }
    }, 1000);

    if (typeMedia === "video" && !hovered) {
      setTypeMedia("image");
    }
    return () => {
      clearTimeout(mediaTimeOut);
    };
  }, [typeMedia, hovered]);

  return typeMedia;
}
