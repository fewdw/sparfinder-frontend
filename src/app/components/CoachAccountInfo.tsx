import { GET_COACH_PROFILE_DETAILS } from "@/utils/API_REQUESTS";
import React, { useEffect, useState } from "react";

interface CoachProfile {
  email: string;
  name: string;
  profile_pic: string;
  created_at: string;
}

const CoachAccountInfo: React.FC = () => {
  const [profile, setProfile] = useState<CoachProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(GET_COACH_PROFILE_DETAILS, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: CoachProfile = await response.json();
        setProfile(data);
        setName(data.name); // Initialize name state with fetched name
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateName = async () => {
    try {
      setUpdateError(null); // Reset any previous errors
      const response = await fetch(
        "http://localhost:8080/api/coach/profile/name",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      // Update the profile state with the new name from the response
      setProfile((prevProfile) =>
        prevProfile ? { ...prevProfile, name: data.name } : null
      );
      setName(data.name); // Update the name state with the new name
    } catch (err) {
      // Display error message below 'Member Since'
      setUpdateError("Please make sure name is 5-50 characters.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <h1 className="text-2xl mb-4 mx-6 text-center">Coach Account</h1>
      <img
        src={profile.profile_pic}
        alt={`${profile.name}'s profile`}
        className="mask mask-circle mb-6"
      />

      {/* Form Wrapper */}
      <div className="w-full max-w-md">
        {/* Name Input with Button */}
        <div className="flex gap-2 mb-4">
          <label className="input input-bordered flex items-center gap-2 grow">
            Name
            <input
              type="text"
              className="font-extrabold w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <button className="btn btn-primary" onClick={handleUpdateName}>
            Update
          </button>
        </div>

        {/* Email Input */}
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Email
          <input
            type="text"
            className="grow cursor-not-allowed font-extrabold"
            defaultValue={profile.email}
            readOnly
          />
        </label>

        {/* Created At Input (Displaying Date) */}
        <label className="input input-bordered flex items-center gap-2">
          Member Since
          <input
            type="text"
            className="grow cursor-not-allowed font-extrabold"
            defaultValue={new Date(profile.created_at).toLocaleDateString()}
            readOnly
          />
        </label>

        {/* Display Update Error Below Member Since */}
        {updateError && <div className="text-red-500 mt-2">{updateError}</div>}
      </div>
    </div>
  );
};

export default CoachAccountInfo;
