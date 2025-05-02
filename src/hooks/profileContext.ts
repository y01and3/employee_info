import type { Profile } from "../profile.type";
import type { EditProfileAction } from "./editProfileReducer";

import React from "react";

const defaultProfile: Profile = {
  name: {
    top: 100,
    left: 40,
    context: "John Doe",
  },
  tag: {
    top: 200,
    left: 40,
    context: [
      { id: 1, emoji: "👨‍💻", text: "Developer" },
      { id: 2, emoji: "🌍", text: "Traveler" },
    ],
  },
  introduction: {
    top: 300,
    left: 40,
    context: "Hello, I am John Doe, a software developer.",
  },
  social: {
    top: 500,
    left: 40,
    context: [{ id: 1, emoji: "🐦", link: "https://twitter.com/johndoe" }],
  },
  resume: {
    top: 700,
    left: 40,
    context: [
      {
        id: 1,
        start: Date.now(),
        end: Date.now(),
        title: "Software Engineer at XYZ",
      },
    ],
  },
};

const ProfileContext = React.createContext<{
  profile: Profile;
  dispatchProfile: (action: EditProfileAction) => void;
}>({
  profile: defaultProfile,
  dispatchProfile: () => {
    throw new Error("dispatchProfile function not implemented");
  },
});

const ProfileProvider = ProfileContext.Provider;

const useProfile = () => {
  return React.useContext(ProfileContext);
};

export { ProfileContext, ProfileProvider, useProfile, defaultProfile };
