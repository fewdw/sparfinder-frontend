import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: React.JSX.IntrinsicAttributes) => {
    useEffect(() => {
      if (!localStorage.getItem("isAuth")) {
        redirect("/");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
