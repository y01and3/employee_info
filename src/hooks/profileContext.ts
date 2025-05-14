import type { Profile } from "../profile.type";
import type { EditProfileAction } from "./editProfileReducer";

import React from "react";

const defaultProfile: Profile = {
  name: { gridX: 8, gridY: 5, context: "John Doe" },
  avatar: { gridX: 3, gridY: 2, context: "https://i.pravatar.cc/480" },
  tag: {
    gridX: 13,
    gridY: 4,
    context: [
      { id: 1, emoji: "👨‍💻", text: "Developer" },
      { id: 2, emoji: "🌍", text: "Traveler" },
    ],
  },
  introduction: {
    gridX: 3,
    gridY: 9,
    context: "Hello, I am John Doe, a software developer.",
  },
  social: {
    gridX: 13,
    gridY: 8,
    context: [{ id: 1, emoji: "🤖", link: "https://example.com/" }],
  },
  resume: {
    gridX: 7,
    gridY: 14,
    context: [
      {
        id: 1,
        start: 1746177984868,
        end: 1746177984868,
        title: "Software Engineer at XYZ",
      },
      {
        id: 1747208946658,
        start: 1747440000000,
        end: 1748044800000,
        title: "111",
      },
      {
        id: 1747215037773,
        start: 1747094400000,
        end: 1747872000000,
        title: "222",
      },
      {
        id: 1747215043199,
        start: 1746489600000,
        end: 1747180800000,
        title: "333",
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
