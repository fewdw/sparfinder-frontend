import React from "react";
import CreateOrAssociateGym from "../components/CreateOrAssociateGym";
import ViewCurrentGymForm from "../components/ViewCurrentGymForm";
import ProfileSeparator from "../components/ProfileSeparator";

const Page = () => {
  return (
    <div>
      <ProfileSeparator selectedTab={1} />
      <ViewCurrentGymForm />
      <CreateOrAssociateGym />
    </div>
  );
};

export default Page;
