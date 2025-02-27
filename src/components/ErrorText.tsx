import { PropsWithChildren } from "react";

function ErrorText({ children }: PropsWithChildren) {
   return <small className="!text-(--red-11)">{children}</small>;
}

export { ErrorText };
