import { memo, useState } from "react";
import Image from "next/image";
import type { ImageHandlerProps } from "@types";
import { WaveSpinner } from "react-spinners-kit";

function ImageHandler({
  imageURI,
  handleImage,
  alt,
}: ImageHandlerProps): JSX.Element {
  const [imageLoaded, seImageLoaded] = useState<boolean>(false);

  return (
    <div
      onClick={() => handleImage(imageURI)}
      key="product-image-1"
      className="gallery-image"
    >
      <Image
        src={imageURI}
        alt={alt}
        fill
        className="object-cover rounded-md"
        onLoadingComplete={() => seImageLoaded(true)}
        unoptimized
      />

      {imageLoaded === false && (
        <div className="w-full absolute bg-white flex h-full items-center justify-center">
          <WaveSpinner color="#d1d5db" />
        </div>
      )}
    </div>
  );
}

export default memo(ImageHandler);
