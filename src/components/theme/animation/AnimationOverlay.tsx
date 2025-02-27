import { PropsWithChildren, useEffect } from "react";

function AnimationOverlay({ children }: PropsWithChildren) {
   useEffect(() => {
      document.body.style.overflow = "hidden";

      return () => {
         document.body.style.overflow = "";
      };
   });
   return (
      <aside className="overflow-hidden h-screen w-screen fixed inset-0 z-20">
         {children}
      </aside>
   );
}

export { AnimationOverlay };
