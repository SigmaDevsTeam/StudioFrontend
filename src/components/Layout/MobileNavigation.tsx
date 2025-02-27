import { Button } from "@radix-ui/themes";
import { NavLink } from "react-router";
import { routes } from "~/global/config/routes.config";
import { NavigationProps } from "./Layout";
import { Popup } from "../theme/Popup";

function MobileNavigation({
   navigateToDocs,
   navigateToSpace,
}: NavigationProps) {
   return (
      <footer className="sm:hidden p-3 bg-(--color-panel-solid) border-t border-(--gray-6)">
         <nav>
            <ul className="flex gap-4 justify-between items-center px-4">
               <NavLiIcon icon="pi-home" to={routes.home} />
               <NavLiIcon icon="pi-search" to={routes.home} />
               <NavLiIcon icon="pi-plus" to={routes.home} />

               <li>
                  <Popup
                     trigger={
                        <div>
                           <Button
                              variant="ghost"
                              color="gray"
                              className="!text-2xl "
                           >
                              <i className="pi pi-bars" />
                           </Button>
                        </div>
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
                                 <span className="text-(--gray-12)">
                                    Sabaody
                                 </span>{" "}
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
                                 <span className="text-(--gray-12)">
                                    Sabaody
                                 </span>{" "}
                                 <span className="text-(--indigo-10)">
                                    Docs
                                 </span>
                              </b>
                           </Button>
                        </div>
                     }
                  />
               </li>

               <NavLiIcon icon="pi-user" to={routes.login} />
            </ul>
         </nav>
      </footer>
   );
}

type NavLiIconProps = {
   icon: string;
   to: string;
};

function NavLiIcon({ icon, to }: NavLiIconProps) {
   return (
      <li>
         <NavLink to={to}>
            <Button
               variant={icon === "pi-plus" ? "soft" : "ghost"}
               color="gray"
               className="!w-full !text-2xl "
            >
               <i className={`pi ${icon}`} />
            </Button>
         </NavLink>
      </li>
   );
}

export { MobileNavigation };
