"use client";
import React, { useEffect, useState } from "react";
import ProfileSeparator from "../components/ProfileSeparator";
import ShowAccount from "../components/ShowAccount";
import { redirect } from "next/navigation";

const page = () => {
  useEffect(() => {
    const value = localStorage.getItem("accountType");
    const isAuth = localStorage.getItem("isAuth");
    if (isAuth === "false") {
      redirect("/");
    }
    if (value === "USER") {
      redirect("/create-profile");
    }
  }, []);

  return (
    <div>
      <ProfileSeparator selectedTab={0} />
      <ShowAccount />
    </div>
  );
};

export default page;
