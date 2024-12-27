import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { Download } from "lucide-react";

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [orginalPreview, setOriginalPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(70);
  const [compressedImage, setCompressedImage] = useState<string | undefined>(
    undefined
  );
  const [compressedImageSize, setCompressedImageSize] = useState<
    number | undefined
  >(undefined);

  //react-dropzone config
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setOriginalImage(file);
      //preview original image
      const objectUrl = URL.createObjectURL(file);
      setOriginalPreview(objectUrl);
    }
  }, []);
  //react-dropzone
  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: true,
    maxSize: 10 * 1024 * 1024,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/webp": [],
    },
  });

  ///compress image using browser image compression
  useEffect(() => {
    compressImage();
  }, [quality]);

  const compressImage = async () => {
    if (!originalImage) return;

    try {
      const compressedFile = await imageCompression(originalImage, {
        maxSizeMB: 5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality / 100,
      });

      const objectUrl = URL.createObjectURL(compressedFile);
      setCompressedImage(objectUrl);
      setCompressedImageSize(compressedFile.size);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  ///download compressed Image

  const downloadImage = () => {
    if (!compressedImage) return;

    const link = document.createElement("a");
    link.href = compressedImage; //file
    link.download = `${originalImage?.name}`; //file name
    link.click();
  };

  return (
    <div className=" h-full flex justify-center mt-10 w-full">
      <div className="flex flex-col gap-6 w-full ">
        <div>
          <h2 className="text-5xl text-purple-600 text-center">
            Image-Compressor{" "}
          </h2>
        </div>
        {/* image uploader dropzone  */}
        <section className="max-w-3xl mx-auto w-full mt-6">
          <div
            {...getRootProps()}
            className="w-full border-2 border-white/15 border-dashed flex items-center justify-center h-40 hover:bg-white/10  "
          >
            <input type="text" {...getInputProps()} placeholder="drop here" />
            <p className="inline-flex text-lg font-normal text-white/50 ">
              Drop files here or click to upload
            </p>
          </div>
          {originalImage && (
            <div className="flex justify-center bg-white/5 text-sky-100 text-base font-semibold py-2 px-6 rounded-md">
              <p>{originalImage.name}</p>
            </div>
          )}
        </section>

        {/* image compress config */}

        <section className="mt-10 flex flex-col justify-center max-w-6xl w-full mx-auto">
          <h3 className=" text-2xl font-semibold text-white/30 text-center">
            {originalImage && <p>Compress Image using Slider</p>}
          </h3>

          {/* display image quality options  */}

          {originalImage && (
            <div className="flex flex-col gap-6 justify-center mt-6">
              <div className="flex gap-6 items-center justify-center">
                <label className="bg-purple-600 text-white text-xl py-2 font-medium w-36 rounded-md flex items-center justify-center">
                  Quality : <span className="text-2xl">{quality}</span>
                </label>
                <label className="bg-purple-600 text-white text-xl font-medium px-4 py-2 rounded-md inline-flex items-center">
                  OriginalSize: {"  "}
                  <span className="text-2xl ml-2">
                    {formatFileSize(originalImage?.size!)}
                  </span>
                </label>
                <label className="bg-teal-600 text-white text-xl font-medium w-auto px-4 py-2 rounded-md inline-flex items-center">
                  Compressed Size :{formatFileSize(compressedImageSize!)}
                </label>
                <button
                  disabled={!compressedImage}
                  className="bg-sky-600 text-white text-xl font-medium w-auto px-4 py-2 rounded-md inline-flex items-center gap-2"
                  onClick={() => downloadImage()}
                >
                  Download{" "}
                  <span className="">
                    <Download className="size-5" />
                  </span>
                </button>
              </div>

              {/* range slider  */}

              <div className="mt-8 w-full">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={quality}
                  onChange={(e) => {
                    setQuality(Number(e.target.value));
                  }}
                  className="range range-primary bg-white/10"
                />
              </div>
            </div>
          )}

          {/* image previewing  */}

          {orginalPreview && (
            <div className="diff aspect-[16/9] rounded-xl overflow-hidden mt-8">
              <div className="diff-item-1">
                <img alt="daisy" src={orginalPreview} />
              </div>
              <div className="diff-item-2">
                <img alt="image-preview" src={compressedImage} />
              </div>
              <div className="diff-resizer"></div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ImageCompressor;

const formatFileSize = (bytes: number) => {
  if (bytes < 1024 * 1024) {
    return (bytes / 1002).toFixed(0) + " KB";
  } else {
    return (bytes / (1024 * 1024)).toFixed(0) + " MB";
  }
};
