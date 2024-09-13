"use client";
import React from "react";
import Header from "../components/Header";
import ProfileSeparator from "../components/ProfileSeparator";
import withAuth from "../components/WithAuth";

const page = () => {
  return (
    <div>
      <ProfileSeparator selectedTab={2}></ProfileSeparator>
    </div>
  );
};

export default withAuth(page);
