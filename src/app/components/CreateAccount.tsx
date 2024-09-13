import React, { useState } from "react";
import CreateAccountCoach from "./CreateAccountCoach";
import CreateAccountBoxer from "./CreateAccountBoxer";

const CreateAccount = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen mt-6">
      <h1 className="text-2xl mb-4">Choose Your Account Type</h1>
      <div className="w-full max-w-xs">
        <select
          className="select select-bordered w-full max-w-xs"
          defaultValue=""
          onChange={handleSelectChange}
        >
          <option disabled value="">
            Account Type
          </option>
          <option value="Coach">Coach</option>
          <option value="Boxer">Boxer</option>
        </select>

        {selectedOption === "Coach" && (
          <CreateAccountCoach></CreateAccountCoach>
        )}

        {selectedOption === "Boxer" && (
          <CreateAccountBoxer></CreateAccountBoxer>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
