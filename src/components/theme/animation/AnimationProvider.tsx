import { useEffect } from "react";
import "./Animations.css";
import "./Greetings.css";
import { CoverSlide } from "./CoverSlide";
import { wait } from "~/global/utils/wait";
import { UnCoverSlide } from "./UnCoverSlide";
import { useSearchParams } from "react-router";
import { Greetings } from "./Greetings";
import { useAnimation } from "~/global/hooks/useAnimation";
import { Portal, Theme } from "@radix-ui/themes";

function AnimationProvider() {
   const [searchParams, setSearchParams] = useSearchParams();

   const { stopAnimation, animationType } = useAnimation();

   const isUncoverParam = searchParams.get("uncover");

   useEffect(() => {
      (async () => {
         if (isUncoverParam) {
            await wait(1);
            setSearchParams((sP) => {
               const newParams = new URLSearchParams(sP);
               newParams.delete("uncover");
               return newParams;
            });
         }
      })();
   }, [isUncoverParam]);

   useEffect(() => {
      (async () => {
         if (animationType === "uncover") {
            await wait(1);
            stopAnimation();
         }
      })();
   }, [animationType]);

   return (
      <Portal>
         <Theme appearance="dark" accentColor="purple">
            {isUncoverParam && <UnCoverSlide />}
            {animationType === "cover" && <CoverSlide />}
            {animationType === "greeting" && <Greetings />}
         </Theme>
      </Portal>
   );
}

export { AnimationProvider };
