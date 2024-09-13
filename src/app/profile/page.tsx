"use client";
import React, { useEffect, useState } from "react";
import ProfileSeparator from "../components/ProfileSeparator";
import CreateAccount from "../components/CreateAccount";
import withAuth from "../components/WithAuth";
import ShowAccount from "../components/ShowAccount";

const page = () => {
  const [storedValue, setStoredValue] = useState<string | null>(null);

  useEffect(() => {
    const value = localStorage.getItem("accountType");
    setStoredValue(value);
  }, []);

  return (
    <div>
      <ProfileSeparator selectedTab={0} />
      {storedValue === "USER" ? <CreateAccount /> : <ShowAccount />}
    </div>
  );
};

export default withAuth(page);
