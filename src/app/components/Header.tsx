"use client";
import React, { useEffect, useState } from "react";
import { GOOGLE_LOGIN, GET_USER_INFO, LOGOUT } from "@/utils/API_REQUESTS";
import Link from "next/link";
import { setIsAuth } from "@/utils/Auth";

interface UserInfo {
  id: string;
  email: string;
  name: string;
  profilePic: string;
  accountType: string;
}

const Header = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GET_USER_INFO, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch user info");
        return response.json();
      })
      .then((data) => {
        setUserInfo(data);
        setIsLogged(true);
        setLoading(false);
        setIsAuth(true);
        localStorage.setItem("accountType", data.accountType);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        setIsLogged(false);
        setLoading(false);
        setIsAuth(false);
      });
  }, []);

  if (loading) {
    return <div></div>;
  }

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.setItem("accountType", "");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          SparFinder. 🥊
        </Link>
      </div>
      {isLogged && userInfo ? (
        <div className="flex-none gap-2">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User profile picture" src={userInfo.profilePic} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link href={`${LOGOUT}`} onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex-none">
          <button
            className="btn btn-primary"
            onClick={() => (window.location.href = GOOGLE_LOGIN)}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
