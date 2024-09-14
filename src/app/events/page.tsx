"use client";
import React, { useEffect } from "react";
import Header from "../components/Header";
import ProfileSeparator from "../components/ProfileSeparator";
import { redirect } from "next/navigation";

const page = () => {
  useEffect(() => {
    const accountType = localStorage.getItem("accountType");
    const isAuth = localStorage.getItem("isAuth");

    if (isAuth === "false") {
      redirect("/");
    }
    if (accountType === "USER") {
      redirect("/create-profile");
    }
  }, []);

  return (
    <div>
      <ProfileSeparator selectedTab={2}></ProfileSeparator>
    </div>
  );
};

export default page;
