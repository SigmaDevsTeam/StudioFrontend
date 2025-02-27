import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Animation = "cover" | "uncover" | "greeting" | "guide" | null;

export type AnimationSlice = {
   animationType: Animation;
   step: number;
};

const initialState: AnimationSlice = {
   animationType: null,
   step: 0
};

export const animationSlice = createSlice({
   name: "animations",
   initialState,
   reducers: {
      setAnimation(state, action: PayloadAction<Animation>) {
         state.animationType = action.payload;
      },
      stopAnimation(state) {
         state.animationType = null;
         state.step = 0;
      },
      nextStep(state) {
         state.step += 1;
      },
      prevStep(state) {
         state.step -= 1;
      }
   }
});

export const { setAnimation, stopAnimation, nextStep, prevStep } =
   animationSlice.actions;
export default animationSlice.reducer;
