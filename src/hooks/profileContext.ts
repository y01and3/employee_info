import type { Profile } from "../profile.type";
import type { EditProfileAction } from "./editProfileReducer";

import React from "react";

const defaultProfile: Profile = {
  name: { gridX: 1, gridY: 1, context: "John Doe" },
  avatar: { gridX: 1, gridY: 1, context: "https://i.pravatar.cc/480" },
  tag: {
    gridX: 1,
    gridY: 1,
    context: [
      { id: 1, emoji: "👨‍💻", text: "Developer" },
      { id: 2, emoji: "🌍", text: "Traveler" },
    ],
  },
  introduction: {
    gridX: 1,
    gridY: 1,
    context: "Hello, I am John Doe, a software developer.",
  },
  social: {
    gridX: 1,
    gridY: 1,
    context: [{ id: 1, emoji: "🤖", link: "https://example.com/" }],
  },
  resume: {
    gridX: 1,
    gridY: 1,
    context: [
      {
        id: 1,
        start: 1746177984868,
        end: 1746177984868,
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
