import { CREATE_COACH_PROFILE } from "@/utils/API_REQUESTS";
import Link from "next/link";
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
        setSuccess("Coach profile created.");
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
      <div className="p-6 rounded-lg">
        <button
          className="btn btn-primary w-full mb-4"
          onClick={createCoachProfile}
        >
          Create Coach Profile
        </button>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && (
          <div className="text-center">
            <p className="text-success mt-2 text-lg font-semibold">{success}</p>
            <Link href="/profile">
              <button className="btn btn-success w-full mt-4">
                View Profile
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAccountCoach;
