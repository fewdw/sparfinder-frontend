"use client";
import React from "react";
import withAuth from "../components/WithAuth";
import ProfileSeparator from "../components/ProfileSeparator";

const page = () => {
  return (
    <div>
      <ProfileSeparator selectedTab={1} />
    </div>
  );
};

export default withAuth(page);
