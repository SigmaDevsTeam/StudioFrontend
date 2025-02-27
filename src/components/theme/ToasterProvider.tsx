import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
   return (
      <Toaster
         containerStyle={{ zIndex: "999" }}
         toastOptions={{
            style: {
               background: "var(--color-background)",
               border: "1px solid var(--gray-6)",
               color: "var(--gray-11)"
            },
            success: {
               iconTheme: {
                  primary: "var(--accent-10)",
                  secondary: "white"
               }
            },
            error: {
               iconTheme: {
                  primary: "var(--red-10)",
                  secondary: "white"
               }
            }
         }}
         position="bottom-left"
      />
   );
}
