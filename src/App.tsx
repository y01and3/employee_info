import type { Profile } from "./profile.type";

import { addToast } from "@heroui/react";
import React from "react";

import baseUrl from "./api/baseUrl";
import getProfile from "./api/getProfile";
import ProfileRender from "./components/ProfileRender";
import { defaultProfile } from "./hooks/profileContext";

function App() {
  const [profile, setProfile] = React.useState<Profile>(defaultProfile);

  React.useEffect(() => {
    if (!baseUrl) {
      const lsProfile = localStorage.getItem("profile");

      if (lsProfile) {
        const parsedProfile = JSON.parse(lsProfile) as Profile;

        setProfile(parsedProfile);
      }

      return;
    }

    getProfile()
      .then((data: Profile) => {
        setProfile(data);
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
    <>
      <ProfileRender profile={profile} />
    </>
  );
}

export default App;
