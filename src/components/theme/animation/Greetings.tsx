import { Button } from "@radix-ui/themes";
import { AnimationOverlay } from "./AnimationOverlay";
import { useAnimation } from "~/global/hooks/useAnimation";
import clsx from "clsx";
import { wait } from "~/global/utils/wait";
function Greetings() {
   const { step, nextStep, stopAnimation, setAnimation } = useAnimation();

   const handleQuickQuide = async () => {
      nextStep();
      await wait(0.75);
      setAnimation("guide");
   };

   const handleSkip = async () => {
      nextStep();
      await wait(0.75);
      stopAnimation();
   };

   return (
      <AnimationOverlay>
         <div
            className={clsx("greetings", {
               "end-greetings": step === 1
            })}
         >
            <div className="greetings-overlay"></div>
            <div className="greetings-content">
               <h1 className="!text-4xl sm:!text-5xl">
                  Welcome to <em className="text-(--accent-10)">Sabaody</em>
               </h1>
               <p className="text-2xl sm:text-3xl">
                  The <b>solution</b> you were looking for
               </p>
               <div className="greetings-gui flex gap-2 justify-center">
                  <Button onClick={handleQuickQuide}>Quick guide</Button>
                  <Button variant="soft" color="gray" onClick={handleSkip}>
                     Skip
                  </Button>
               </div>
            </div>
         </div>
      </AnimationOverlay>
   );
}

export { Greetings };
