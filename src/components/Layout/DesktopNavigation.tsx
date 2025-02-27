import { Button, Separator } from "@radix-ui/themes";
import { NavLink } from "react-router";
import { routes } from "~/global/config/routes.config";
import { Popup } from "../theme/Popup";
import { NavigationProps } from "./Layout";

function DesktopNavigation({
   navigateToDocs,
   navigateToSpace,
   navigateToLogin,
   navigateToSettings
}: NavigationProps) {
   return (
      <aside className="hidden sm:block h-full p-3 bg-(--color-panel-solid) border-r border-(--gray-6)">
         <nav className="flex flex-col justify-between h-full">
            <ul className="flex flex-col gap-2">
               <li className="mb-2">
                  <NavLink to={routes.home}>
                     <h3>
                        Sabaody <b className="text-(--accent-10)">Studio</b>
                     </h3>
                  </NavLink>
               </li>
               <NavLiButton icon="pi-home" text="Home" to={routes.home} />
               <NavLiButton icon="pi-users" text="Users" to={routes.home} />
               <NavLiButton icon="pi-table" text="Entities" to={routes.home} />
               <NavLiButton icon="pi-table" text="Tables" to={routes.home} />
               <li>
                  <Separator className="!w-full" />
               </li>
               <OtherAppsPopup
                  {...{
                     navigateToDocs,
                     navigateToSpace,
                     navigateToLogin,
                     navigateToSettings
                  }}
               />
            </ul>

            {/* Bottom menu */}
            <Popup
               trigger={
                  <Button
                     variant="ghost"
                     color="gray"
                     className="!w-full !text-base"
                  >
                     <i className="pi pi-user" />
                     Account
                  </Button>
               }
               content={
                  <div className="-m-2 flex flex-col gap-2">
                     <small className="text-center">
                        You are not logged in
                     </small>
                     <Button onClick={navigateToLogin}>Login / Sign up</Button>
                  </div>
               }
            />
         </nav>
      </aside>
   );
}

function OtherAppsPopup({ navigateToDocs, navigateToSpace }: NavigationProps) {
   return (
      <li>
         <Popup
            trigger={
               <Button
                  variant="ghost"
                  color="gray"
                  className="!w-full !text-base"
               >
                  Other apps
               </Button>
            }
            content={
               <div className="-m-2 flex flex-col gap-2">
                  <small className="-mb-2">Main application:</small>
                  <Button
                     variant="ghost"
                     color="gray"
                     className="!text-base !justify-start"
                     onClick={navigateToSpace}
                  >
                     <b className="font-Montserrat">
                        <span className="text-(--gray-12)">Sabaody</span>{" "}
                        <span className="text-(--blue-10)">Space</span>
                     </b>
                  </Button>
                  <small className="-mb-2">Docs application:</small>
                  <Button
                     variant="ghost"
                     color="gray"
                     className="!text-base !justify-start"
                     onClick={navigateToDocs}
                  >
                     <b className="font-Montserrat">
                        <span className="text-(--gray-12)">Sabaody</span>{" "}
                        <span className="text-(--indigo-10)">Docs</span>
                     </b>
                  </Button>
               </div>
            }
         />
      </li>
   );
}

type NavLiButtonProps = {
   icon: string;
   text: string;
   to: string;
};

function NavLiButton({ icon, text, to }: NavLiButtonProps) {
   return (
      <li>
         <NavLink to={to}>
            <Button
               variant="ghost"
               color="gray"
               className="!w-full !text-base !gap-4"
            >
               <i className={`pi ${icon}`} /> <span>{text}</span>
            </Button>
         </NavLink>
      </li>
   );
}

export { DesktopNavigation };
