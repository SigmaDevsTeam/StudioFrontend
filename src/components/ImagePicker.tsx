import { useMemo, useState } from "react";
import { ErrorText } from "./ErrorText";

type ImageInputProps = {
   setImageState: (image: File) => void;
};

function ImagePicker({ setImageState }: ImageInputProps) {
   const [image, setImage] = useState<File | null>(null);

   const imageSrcCopy = useMemo(
      () => (image ? URL.createObjectURL(image) : null),
      [image]
   );

   const imageError = image ? image?.size > 2_000_000 : null;

   const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (target.files?.length && target.files[0]) {
         setImage(target.files[0]);
         if (!imageError) {
            setImageState(target.files[0]);
         }
      }
   };

   return (
      <label>
         <div
            className="border border-dashed border-(--accent-10) cursor-pointer h-60
     rounded-(--radius-4) flex flex-col gap-3
     justify-center items-center text-(--accent-10)
     hover:border-(--accent-11) hover:text-(--accent-11)"
         >
            {imageSrcCopy ? (
               <div className="h-full p-2">
                  <img
                     src={imageSrcCopy}
                     className="object-contain block h-full"
                  />
               </div>
            ) : (
               <>
                  <p className="pi pi-image text-5xl"></p>
                  <p className="font-bold">Upload Photo</p>
               </>
            )}
         </div>
         <input
            type="file"
            className="hidden"
            onChange={onChange}
            accept="image/*"
         />
         <p className="text-(--accent-10)">{image?.name}</p>
         {imageError && (
            <ErrorText>Image must be smaller than 2 megabytes</ErrorText>
         )}
      </label>
   );
}

export { ImagePicker };
