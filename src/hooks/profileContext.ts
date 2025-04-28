import type { Profile } from "../profile.type";

import React from "react";

const ProfileContext = React.createContext<{
  profile: Profile;
  setProfile: (profile: Profile) => void;
}>({
  profile: {
    name: {
      top: 0,
      left: 0,
      context: "John Doe",
    },
    tag: {
      top: 0,
      left: 0,
      context: [
        { icon: "👨‍💻", text: "Developer" },
        { icon: "🌍", text: "Traveler" },
      ],
    },
    introduction: {
      top: 0,
      left: 0,
      context: "Hello, I am John Doe, a software developer.",
    },
    social: {
      top: 0,
      left: 0,
      context: [{ icon: "🐦", link: "https://twitter.com/johndoe" }],
    },
    post: {
      top: 0,
      left: 0,
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
      top: 0,
      left: 0,
      context: [
        {
          start: new Date(),
          end: new Date(),
          title: "Software Engineer at XYZ",
        },
      ],
    },
  },
  setProfile: (_: Profile) => {},
});

const ProfileProvider = ProfileContext.Provider;

const useProfile = () => {
  return React.useContext(ProfileContext);
};

export { ProfileContext, ProfileProvider, useProfile };
