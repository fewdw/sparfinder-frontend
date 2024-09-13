"use client";
import React, { useEffect } from "react";
import CreateAccount from "../components/CreateAccount";
import withAuth from "../components/WithAuth";
import { redirect } from "next/navigation";

const page = () => {
  let accountType = null;

  useEffect(() => {
    const accountType = localStorage.getItem("accountType");
  }, []);

  if (accountType !== "USER") {
    redirect("/profile");
  }
  return (
    <div>
      <CreateAccount />
    </div>
  );
};

export default withAuth(page);
