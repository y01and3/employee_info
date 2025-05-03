import type { Profile } from "../profile.type";
import type { EditProfileAction } from "./editProfileReducer";

import React from "react";

const defaultProfile: Profile = {
  name: { top: 81, left: 315, context: "John Doe" },
  avatar: { top: 35, left: 122, context: "https://i.pravatar.cc/480" },
  tag: {
    top: 211,
    left: 310,
    context: [
      { id: 1, emoji: "👨‍💻", text: "Developer" },
      { id: 2, emoji: "🌍", text: "Traveler" },
    ],
  },
  introduction: {
    top: 283,
    left: 310,
    context: "Hello, I am John Doe, a software developer.",
  },
  social: {
    top: 352,
    left: 701,
    context: [{ id: 1, emoji: "🤖", link: "https://example.com/" }],
  },
  resume: {
    top: 490,
    left: 327,
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
