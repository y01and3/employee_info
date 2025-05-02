import type { Profile } from "./profile.type";

import { addToast, Button } from "@heroui/react";
import React from "react";

import baseUrl from "./api/baseUrl";
import editProfile from "./api/editProfile";
import getProfile from "./api/getProfile";
import ProfileEditor from "./components/ProfileEditor";
import editProfileReducer from "./hooks/editProfileReducer";
import { defaultProfile, ProfileProvider } from "./hooks/profileContext";

const EditApp = () => {
  const [profile, dispatchProfile] = React.useReducer(
    editProfileReducer,
    defaultProfile,
  );

  const changeProfile = (profile: Profile) =>
    !baseUrl
      ? localStorage.setItem("profile", JSON.stringify(profile))
      : editProfile(profile);

  React.useEffect(() => {
    if (!baseUrl) {
      const lsProfile = localStorage.getItem("profile");

      if (lsProfile) {
        const parsedProfile = JSON.parse(lsProfile) as Profile;

        dispatchProfile({ type: "FLASH", payload: parsedProfile });
      }

      return;
    }

    getProfile()
      .then((data: Profile) => {
        dispatchProfile({ type: "FLASH", payload: data });
      })
      .catch((error) => {
        addToast({
          title: "Error loading profile",
          description: String(error),
          color: "danger",
        });
      });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 w-full z-50">
        <Button
          className="m-5 float-right"
          color="warning"
          onPress={() => {
            changeProfile(profile);
          }}
        >
          Confirm Edit
        </Button>
      </div>
      <ProfileProvider value={{ profile, dispatchProfile }}>
        <ProfileEditor />
      </ProfileProvider>
    </div>
  );
};

export default EditApp;
