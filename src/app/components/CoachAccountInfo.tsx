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

  // Fetch profile data on component mount
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

  // Handle loading and error states
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  // Display the profile data once loaded
  return (
    <div>
      <h2>Coach Profile</h2>
      <img
        src={profile.profile_pic}
        alt={`${profile.name}'s profile`}
        style={{ borderRadius: "50%", width: "96px", height: "96px" }}
      />
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(profile.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CoachAccountInfo;
