import type { Profile } from "./profile.type";

import { addToast, Button } from "@heroui/react";
import React from "react";
import { Link } from "react-router";

import baseUrl from "./api/baseUrl";
import getProfile from "./api/getProfile";
import ProfileRender from "./components/ProfileRender";
import applyProfile from "./hooks/applyProfile";
import { defaultProfile } from "./hooks/profileContext";

function App() {
  const [profile, setProfile] = React.useState<Profile>(defaultProfile);

  React.useEffect(() => {
    if (!baseUrl) {
      const lsProfile = localStorage.getItem("profile");

      if (lsProfile) {
        const parsedProfile = JSON.parse(lsProfile) as Profile;

        applyProfile(parsedProfile, setProfile);
        applyProfile(parsedProfile, (profile) =>
          localStorage.setItem("profile", JSON.stringify(profile)),
        );
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
          className="m-5 float-right hover:scale-115 hover:transition-transform hover:duration-200"
          color="default"
          to="/edit"
        >
          Edit
        </Button>
      </div>
      <ProfileRender profile={profile} />
    </div>
  );
}

export default App;
