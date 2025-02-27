import { Animation } from "~/store/animations/animation.slice";
import { useAppDispatch, useAppSelector } from "~/store/store";
import { setAnimation as setAnimationAction } from "~/store/animations/animation.slice";
import { stopAnimation as stopAnimationAction } from "~/store/animations/animation.slice";
import { nextStep as nextStepAction } from "~/store/animations/animation.slice";
import { prevStep as prevStepAction } from "~/store/animations/animation.slice";

// Wrapper for animation slice

export const useAnimation = () => {
   const dispatch = useAppDispatch();
   const animations = useAppSelector((store) => store.animation);
   const setAnimation = (animationType: Animation) => {
      dispatch(setAnimationAction(animationType));
   };
   const stopAnimation = () => {
      dispatch(stopAnimationAction());
   };
   const nextStep = () => {
      dispatch(nextStepAction());
   };
   const prevStep = () => {
      dispatch(prevStepAction());
   };
   return {
      setAnimation,
      stopAnimation,
      nextStep,
      prevStep,
      animationType: animations.animationType,
      step: animations.step
   };
};
