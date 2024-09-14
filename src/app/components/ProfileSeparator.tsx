"use client";
import Link from "next/link";
import React from "react";

interface ProfileSeparatorProps {
  selectedTab: number;
}

const ProfileSeparator: React.FC<ProfileSeparatorProps> = ({ selectedTab }) => {
  return (
    <div className="flex justify-center">
      <div
        role="tablist"
        className="tabs tabs-boxed w-full lg:w-1/2 mx-auto md:w-2/3"
      >
        <Link
          href="/profile"
          role="tab"
          className={`tab ${selectedTab === 0 ? "tab-active" : ""}`}
        >
          Profile
        </Link>
        <Link
          href="/gym"
          role="tab"
          className={`tab ${selectedTab === 1 ? "tab-active" : ""}`}
        >
          Gym
        </Link>
        <Link
          href="/events"
          role="tab"
          className={`tab ${selectedTab === 2 ? "tab-active" : ""}`}
        >
          Events
        </Link>
      </div>
    </div>
  );
};

export default ProfileSeparator;
