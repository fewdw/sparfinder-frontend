import React, { useEffect, useState } from "react";
import CoachAccountInfo from "./CoachAccountInfo";
import BoxerAccountInfo from "./BoxerAccountInfo";
import { redirect } from "next/navigation";

const ShowAccount = () => {
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    const storedAccountType = localStorage.getItem("accountType") || "";
    const isAuth = localStorage.getItem("isAuth");

    if (isAuth === "false") {
      redirect("/");
    }

    setAccountType(storedAccountType);
  }, []);

  if (accountType === "COACH") {
    return <CoachAccountInfo />;
  } else if (accountType === "BOXER") {
    return <BoxerAccountInfo />;
  }

  return <div></div>;
};

export default ShowAccount;
