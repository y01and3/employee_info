import type { Profile } from "../profile.type";

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
      { icon: { mod: "emoji", src: "👨‍💻" }, text: "Developer" },
      { icon: { mod: "emoji", src: "🌍" }, text: "Traveler" },
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
    context: [
      {
        icon: { mod: "emoji", src: "🐦" },
        link: "https://twitter.com/johndoe",
      },
    ],
  },
  post: {
    top: 700,
    left: 40,
    context: [
      {
        title: "My first post",
        description: "This is my first post.",
        date: new Date(),
        link: "https://example.com/first-post",
      },
    ],
  },
  resume: {
    top: 1500,
    left: 50,
    context: [
      {
        start: new Date(),
        end: new Date(),
        title: "Software Engineer at XYZ",
      },
    ],
  },
};

const ProfileContext = React.createContext<{
  profile: Profile;
  setProfile: (profile: Profile) => void;
}>({
  profile: defaultProfile,
  setProfile: (_: Profile) => {},
});

const ProfileProvider = ProfileContext.Provider;

const useProfile = () => {
  return React.useContext(ProfileContext);
};

export { ProfileContext, ProfileProvider, useProfile, defaultProfile };
