import { Outlet } from "react-router";
import { AnimationProvider } from "../theme/animation/AnimationProvider";
import { wait } from "~/global/utils/wait";
import { redirectToWebsite } from "~/global/utils/redirectToWebsite";
import { useAnimation } from "~/global/hooks/useAnimation";
import { MobileNavigation } from "./MobileNavigation";
import { DesktopNavigation } from "./DesktopNavigation";
export function Layout() {
   const { setAnimation } = useAnimation();

   const navigateTo = async (url: string) => {
      setAnimation("cover");
      await wait(0.7);
      redirectToWebsite(url);
   };

   const navigateToDocs = async () => {
      navigateTo(`${import.meta.env.SABAODY_DOCS_URL}?uncover=true`);
   };

   const navigateToSpace = async () => {
      navigateTo(`${import.meta.env.SABAODY_MAIN_URL}?uncover=true`);
   };

   const navigateToLogin = async () => {
      navigateTo(`${import.meta.env.SABAODY_MAIN_URL}/login?uncover=true`);
   };

   const navigateToSettings = async () => {
      navigateTo(`${import.meta.env.SABAODY_MAIN_URL}/settings?uncover=true`);
   };

   return (
      <>
         <DesktopNavigation
            {...{
               navigateToDocs,
               navigateToSpace,
               navigateToLogin,
               navigateToSettings
            }}
         />
         <div className="h-full flex flex-col grow-1">
            <main>
               <Outlet />
            </main>
            <MobileNavigation
               {...{
                  navigateToDocs,
                  navigateToSpace,
                  navigateToLogin,
                  navigateToSettings
               }}
            />
         </div>
         <AnimationProvider />
      </>
   );
}

export type NavigationProps = {
   navigateToDocs: () => Promise<void>;
   navigateToSpace: () => Promise<void>;
   navigateToLogin: () => Promise<void>;
   navigateToSettings: () => Promise<void>;
};
