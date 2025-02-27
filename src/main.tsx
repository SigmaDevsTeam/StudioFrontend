import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "~/index.css";
import { AppRouter } from "./router/AppRouter";
import { ToasterProvider } from "./components/theme/ToasterProvider";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { HelmetProvider } from "react-helmet-async";
function App() {
   return (
      <Provider store={store}>
         <Theme
            appearance="dark"
            accentColor="purple"
         >
            <HelmetProvider>
               <AppRouter />
            </HelmetProvider>
            <ToasterProvider />
         </Theme>
      </Provider>
   );
}

createRoot(document.getElementById("root")!).render(<App />);
