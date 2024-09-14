"use client";
import React, { useEffect, useState } from "react";
import CreateAccount from "../components/CreateAccount";
import { redirect } from "next/navigation";

const page = () => {
  const [storedValue, setStoredValue] = useState<string | null>(null);

  useEffect(() => {
    const value = localStorage.getItem("accountType");
    if (value !== "USER") {
      redirect("/profile");
    }
  }, []);
  return (
    <div>
      <CreateAccount />
    </div>
  );
};

export default page;
