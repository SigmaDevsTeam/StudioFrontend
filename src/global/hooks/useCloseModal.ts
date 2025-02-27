import { useRef } from "react";
// Returns ref and close function that clicks ref

export const useCloseModal = () => {
   const closeButtonRef = useRef<HTMLButtonElement | null>(null);
   const closeModal = () => {
      closeButtonRef.current && closeButtonRef.current.click();
   };
   return { closeButtonRef, closeModal };
};
