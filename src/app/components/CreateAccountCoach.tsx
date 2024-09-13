import { CREATE_COACH_PROFILE } from "@/utils/API_REQUESTS";
import { useState } from "react";

const CreateAccountCoach = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createCoachProfile = async () => {
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(CREATE_COACH_PROFILE, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.setItem("accountType", "COACH");
        setSuccess("Coach profile created. Refresh page to see changes.");
      } else {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        setError("Error, please try again later.");
      }
    } catch (err) {
      console.error("Network or other error:", err);
      setError("Error, please try again later.");
    }
  };

  return (
    <div className="flex justify-center m-4">
      <div>
        <button className="btn btn-primary" onClick={createCoachProfile}>
          Create Coach Profile
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default CreateAccountCoach;
