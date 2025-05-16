import type { Profile } from "./profile.type";

import { addToast, Button } from "@heroui/react";
import React from "react";
import { Link } from "react-router";

import baseUrl from "./api/baseUrl";
import editProfile from "./api/editProfile";
import getProfile from "./api/getProfile";
import ProfileEditor from "./components/ProfileEditor";
import BackgroundColorEditor from "./components/editor/BackgroundColorEditor";
import applyProfile from "./hooks/applyProfile";
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

  const setProfile = (profile: Profile) => {
    dispatchProfile({ type: "FLASH", payload: profile });
  };

  React.useEffect(() => {
    if (!baseUrl) {
      const lsProfile = localStorage.getItem("profile");

      if (lsProfile) {
        const parsedProfile = JSON.parse(lsProfile) as Profile;

        applyProfile(parsedProfile, setProfile);
      }

      return;
    }

    getProfile()
      .then((data: Profile) => {
        applyProfile(data, setProfile);
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
    <div
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{ backgroundColor: profile.backgroundColor }}
    >
      <div className="fixed top-0 right-0 w-fit z-50">
        <Button
          as={Link}
          className="m-5 float-right"
          color="warning"
          to="/"
          onPress={() => {
            changeProfile(profile);
          }}
        >
          Confirm Edit
        </Button>
        <Button
          className="m-5 float-right"
          color="danger"
          onPress={() => {
            changeProfile(defaultProfile);
            setProfile(defaultProfile);
            addToast({
              title: "Profile reset",
              description: "Profile has been reset to default.",
              color: "success",
            });
          }}
        >
          Back to Default
        </Button>
        <BackgroundColorEditor
          className="m-5 float-right"
          color={profile.backgroundColor}
          onChange={(color) => {
            dispatchProfile({
              type: "DATA",
              payload: { key: "backgroundColor", data: color },
            });
          }}
        />
      </div>
      <ProfileProvider value={{ profile, dispatchProfile }}>
        <ProfileEditor />
      </ProfileProvider>
    </div>
  );
};

export default EditApp;
