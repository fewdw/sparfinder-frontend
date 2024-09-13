"use client";
import React, { useEffect, useState } from "react";
import ProfileSeparator from "../components/ProfileSeparator";
import CreateAccount from "../components/CreateAccount";
import withAuth from "../components/WithAuth";
import ShowAccount from "../components/ShowAccount";
import { redirect } from "next/navigation";

const page = () => {
  const [storedValue, setStoredValue] = useState<string | null>(null);

  useEffect(() => {
    const value = localStorage.getItem("accountType");
    setStoredValue(value);
  }, []);

  if (storedValue === "USER") {
    redirect("/create-profile");
  }

  return (
    <div>
      <ProfileSeparator selectedTab={0} />
      <ShowAccount />
    </div>
  );
};

export default withAuth(page);
