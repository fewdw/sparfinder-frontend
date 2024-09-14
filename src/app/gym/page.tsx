"use client";
import React, { useEffect, useState } from "react";
import ProfileSeparator from "../components/ProfileSeparator";
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

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <ProfileSeparator selectedTab={1} />

      <div className="flex flex-col justify-start items-center h-screen mt-10">
        <h1 className="text-4xl mb-4 text-center mx-6">
          Create or associate to a gym.
        </h1>
        <div className="w-full max-w-xs">
          <select
            className="select select-bordered w-full max-w-xs"
            defaultValue=""
            onChange={handleSelectChange}
          >
            <option disabled value="">
              Gym
            </option>
            <option value="associate">Associate to a gym</option>
            <option value="add">Add my gym</option>
          </select>

          {selectedOption === "associate" && <div>1</div>}

          {selectedOption === "add" && <div>2</div>}
        </div>
      </div>
    </div>
  );
};

export default page;
