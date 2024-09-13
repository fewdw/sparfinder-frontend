import React, { useEffect, useState } from "react";
import withAuth from "./WithAuth";
import CoachAccountInfo from "./CoachAccountInfo";
import BoxerAccountInfo from "./BoxerAccountInfo";

const ShowAccount = () => {
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    const storedAccountType = localStorage.getItem("accountType") || "";
    setAccountType(storedAccountType);
  }, []);

  if (accountType === "COACH") {
    return <CoachAccountInfo />;
  } else if (accountType === "BOXER") {
    return <BoxerAccountInfo />;
  }

  return <div></div>;
};

export default withAuth(ShowAccount);
