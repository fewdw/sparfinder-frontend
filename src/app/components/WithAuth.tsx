import React, { useEffect } from "react";
import { getIsAuth } from "@/utils/Auth";
import { redirect } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: React.JSX.IntrinsicAttributes) => {
    useEffect(() => {
      if (!getIsAuth()) {
        redirect("/");
      }
    }, []);

    if (!getIsAuth()) {
      return redirect("/");
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
