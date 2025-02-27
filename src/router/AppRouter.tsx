import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "~/components/Layout/Layout";
import { routes } from "~/global/config/routes.config";
import { HomePage } from "~/pages/HomePage/HomePage";
import { NotFoundPage } from "~/pages/NotFoundPage";

function AppRouter() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path={routes.home} element={<Layout />}>
               {/* home */}
               <Route path={routes.home} element={<HomePage />} />

               {/* Fallback */}
               <Route path="*" element={<NotFoundPage />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export { AppRouter };
