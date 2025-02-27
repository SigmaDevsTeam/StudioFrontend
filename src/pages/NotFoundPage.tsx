import { Button } from "@radix-ui/themes";
import { Link } from "react-router";
import { routes } from "~/global/config/routes.config";

type NotFoundPageProps = {
   message?: string;
};

function NotFoundPage({ message = "Page not found" }: NotFoundPageProps) {
   return (
      <>
         <h1 className="containerX text-center mt-6">404</h1>
         <section className="containerX">
            <p className="flex items-center gap-2 justify-center mt-2">
               <span>{message}</span>
               <Link to={routes.home}>
                  <Button variant="soft" color="gray">
                     Go to Home
                  </Button>
               </Link>
            </p>
         </section>
      </>
   );
}

export { NotFoundPage };
